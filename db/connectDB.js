import mongoose from "mongoose";

export default function connectDB() {
  // If there is already a mongoose connection, use it
  // or if it's connecting, wait for it
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  return mongoose.connect(process.env.MONGODB_CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}
