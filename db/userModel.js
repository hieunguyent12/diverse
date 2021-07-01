import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    spotifyId: { type: String, required: true },
    display_name: { type: String, required: true },
    access_token: { type: String, required: true },
    refresh_token: { type: String, required: true },
    avatar_url: { type: String, required: true },
    friends: { type: Array, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.users || mongoose.model("users", userSchema);
