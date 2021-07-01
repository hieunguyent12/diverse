import authMiddleware from "../../../utils/authMiddleware";

async function fetchPlaylist(url, access_token) {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  return await response.json();
}

async function removeItemFromPlaylist(playlistId, trackURI, access_token) {
  const response = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tracks: [{ uri: trackURI }],
      }),
    }
  );

  return await response.json();
}

export default async function handler(req, res) {
  await authMiddleware(req);

  if (!req.user) {
    return res.status(400).json({ auth: false, playlist: null });
  }

  const { id, url } = req.query;
  const { access_token } = req.user;

  if (req.method === "DELETE") {
    const response = await removeItemFromPlaylist(
      id,
      req.body.uri,
      access_token
    );
    return res.json({ auth: true, success: true });
  }

  const playlist = await fetchPlaylist(url, access_token);

  res.json({ auth: true, playlist });
}
