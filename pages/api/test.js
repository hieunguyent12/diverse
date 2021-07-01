import connectDB from "../../db/connectDB";

export default async function handler(req, res) {
  try {
    await connectDB();
  } catch (e) {
    console.log(e);
    return res.status(500).send("server error");
  }

  res.send("test!!");
}
