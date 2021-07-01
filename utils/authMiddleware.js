import jwt from "jsonwebtoken";
import { parse } from "cookie";

export default async function authMiddleware(req) {
  const cookieHeader = req.headers.cookie;

  if (!cookieHeader) return;

  try {
    const { token } = parse(cookieHeader);

    if (!token) {
      console.log("jwt not present");
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_CODE);
    req.user = decoded;
    return;
  } catch (e) {
    console.log(e);
    return;
  }
}
