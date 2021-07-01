import { serialize } from "cookie";

export default function setCookie(res, token) {
  res.setHeader(
    "Set-Cookie",
    serialize("token", token, {
      secure: process.env.NODE_ENV !== `development`,
      sameSite: `lax`,
      path: `/`,
    })
  );
}
