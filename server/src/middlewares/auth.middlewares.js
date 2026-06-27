import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  console.log("Request ---->>>", req);

  const tokenm = req.cookies;
  const authHeader = req.headers.authorization;
  console.log("Aurh header-------->", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Access Denied: No token provided" });
  }
  // if (!token) {
  //   return res.status(401).json({ error: "Access Denied" });
  // }

  const token = authHeader.split(" ")[1];
  try {
    const secretKey = process.env.JWT_SECRET;

    const decode = jwt.verify(token, secretKey);

    req.user = decode;

    next();
  } catch (err) {
    console.log("error", err.message);

    return res.status(401).json({
      error: err.message || "Invalid token",
    });
  }
};
