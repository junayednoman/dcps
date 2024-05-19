import jwt from "jsonwebtoken";

function checkJwtExpirity(token) {
  try {
    const decodedToken = jwt.decode(token, { complete: true });
    if (!decodedToken) {
      return null; // Invalid token
    }
    const { exp } = decodedToken.payload;
    const currentTime = Math.floor(Date.now() / 1000);
    if (exp && currentTime > exp) {
      return { isExpired: true }; // Token isExpired
    }
    return { isExpired: false }; // Token expired
  } catch (error) {
    console.error("Error decoding JWT token:", error);
    return null; // Error decoding token
  }
}

export default checkJwtExpirity;