import User from "../db/userModel";

export default async function getNewToken(userId) {
  const user = await User.findById(userId);

  if (!user) return null;

  const { refresh_token } = user;

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(
        process.env.SPOTIFY_CLIENT_ID + ":" + process.env.SPOTIFY_CLIENT_SECRET
      ).toString("base64")}`,
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token,
    }),
  });

  const data = await response.json();

  if (data.access_token) {
    user.access_token = data.access_token;
    await user.save();
    return data;
  }

  return null;
}
