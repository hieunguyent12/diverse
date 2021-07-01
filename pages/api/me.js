import User from "../../db/userModel";
import authMiddleware from "../../utils/authMiddleware";
import connectDB from "../../db/connectDB";

export default async function handler(req, res) {
  try {
    await connectDB();

    await authMiddleware(req);

    // if user isn't signed in, redirect them to login
    if (!req.user) {
      return res.status(400).json({ auth: false });
    }

    const { spotifyId, display_name, userId } = req.user;

    const user = await User.findById(userId);

    res.json({
      auth: true,
      spotifyId,
      display_name,
      friends: user.friends,
      avatar_url: user.avatar_url,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send("error");
  }
}
