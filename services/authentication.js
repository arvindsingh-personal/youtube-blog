const JWT = require("jsonwebtoken");

const key = "$Arvind@123";

function generateToken(user) {
  const payload = {
    id: user._id,
    email: user.email,
    profileImageURL: user.profileImageURL,
    role: user.role,
  };

  const token = JWT.sign(payload, key);
  return token;
}

function validateToken(token) {
  try {
    const decoded = JWT.verify(token, key);
    return decoded;
  } catch (error) {
    throw new Error("Invalid token");
  }
}

module.exports = {
  generateToken,
  validateToken,
};
