import jwt from "jsonwebtoken";
import authMiddleware from "../../utils/authMiddleware";
import getNewToken from "../../utils/getNewToken";
import connectDB from "../../db/connectDB";
import setCookie from "../../utils/setCookie";

async function getPlaylists(user, res) {
  const URL = `https://api.spotify.com/v1/me/playlists`;

  const response = await fetch(URL, {
    headers: {
      Authorization: `Bearer ${user.access_token}`,
    },
  });

  let data = await response.json();

  // if the request failed because the access_token expired, then we try to get another one using the refresh token
  if (data?.error?.status === 401) {
    console.log("token expired");
    const newToken = await getNewToken(user.userId);
    // when we get a new token, we must reset the cookie

    if (newToken) {
      data = await fetch(URL, {
        headers: {
          Authorization: `Bearer ${newToken.access_token}`,
        },
      });

      const token = jwt.sign(
        {
          userId: user.userId,
          spotifyId: user.spotifyId,
          display_name: user.display_name,
          access_token: newToken.access_token,
        },
        process.env.JWT_CODE,
        {
          expiresIn: "30d",
        }
      );

      setCookie(res, token);
    } else {
      data = null;
    }
  }
  return data;
}

async function createPlaylist(userId, access_token, playlistName) {
  const URL = `https://api.spotify.com/v1/users/{user_id}/playlists`;

  const response = await fetch(
    `https://api.spotify.com/v1/users/${userId}/playlists`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: playlistName,
      }),
    }
  );

  return await response.json();
}

export default async function handler(req, res) {
  try {
    await connectDB();

    await authMiddleware(req);

    if (!req.user) {
      return res.status(400).json({ auth: false, playlists: null });
    }

    const { access_token, spotifyId, userId } = req.user;

    if (req.method === "POST") {
      const response = await createPlaylist(
        spotifyId,
        access_token,
        req.body.playlistName
      );

      return res.json({ response });
    }

    const playlists = await getPlaylists(req.user, res);

    // console.log(playlists);

    res.json({ auth: true, playlists: playlists?.items });
  } catch (e) {
    console.log(e);
    // TODO: if this catch block executes and the user is siged in, it will cause an infinitely loop if {auth: true} is not sent
    // think of a solution to this without using {auth: true} everytime?
    return res.status(500).json({
      auth: true,
      error: true,
    });
  }
}
