import jwt from "jsonwebtoken";

import connectDB from "../../db/connectDB";
import User from "../../db/userModel";
import authMiddleware from "../../utils/authMiddleware";
import setCookie from "../../utils/setCookie";

const SCOPES =
  "user-read-private user-read-email playlist-modify-private playlist-modify-public";
const REDIRECT_URI = `${process.env.NEXT_PUBLIC_APP_URI}/api/oauth`;

const OAUTH_LINK = `https://accounts.spotify.com/authorize?response_type=code&client_id=${
  process.env.SPOTIFY_CLIENT_ID
}&scope=${encodeURIComponent(SCOPES)}&redirect_uri=${encodeURIComponent(
  REDIRECT_URI
)}`;

const TOKEN_URL = "https://accounts.spotify.com/api/token";

async function fetchTokens(code) {
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: REDIRECT_URI,
    client_id: process.env.SPOTIFY_CLIENT_ID,
    client_secret: process.env.SPOTIFY_CLIENT_SECRET,
  }).toString();

  const response = await fetch(TOKEN_URL, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "POST",
    body,
  });

  return await response.json();
}

async function fetchUser(access_token) {
  const response = await fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  return await response.json();
}

export default async function handler(req, res) {
  try {
    if (req.method !== "GET") {
      return res.status(400).send("error");
    }

    await authMiddleware(req);

    // if user is already signed in, just redirect them to /home
    if (req.user) {
      return res.redirect("/home");
    }

    const { code = null } = req.query;

    if (!code) {
      return res.redirect(OAUTH_LINK);
    }

    await connectDB();

    const { access_token, refresh_token } = await fetchTokens(code);

    // fetch user to get their profile
    const { id, display_name } = await fetchUser(access_token);

    let user = await User.findOne({ spotifyId: id });

    // If the user isn't registered, register them
    if (!user) {
      user = new User({
        spotifyId: id,
        display_name,
        access_token,
        refresh_token,
        friends: [
          { id: 1, name: "John Cena" },
          { id: 2, name: "Will Smith" },
        ],
        avatar_url: "none",
      });

      await user.save();
    }

    const token = jwt.sign(
      {
        userId: user._id,
        spotifyId: user.spotifyId,
        display_name: user.display_name,
        access_token: user.access_token,
      },
      process.env.JWT_CODE,
      {
        expiresIn: "30d",
      }
    );

    // What does sameSite: "lax" mean?
    setCookie(res, token);

    res.redirect("/home");
  } catch (e) {
    console.log(e);
    return res.status(500).redirect("/");
  }
}
