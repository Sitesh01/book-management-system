const User = require("../models/userModel.json");
const jwt = require("jsonwebtoken");

// @desc login a user
// @route POST/api/users/login
// @acess public
const loginUser = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "All fields are mandatory!" });
  }

  const user = User.find((item) => {
    return item.email === email && item.password === password;
  });

  if (!user) res.status(404).json({ message: "User not found" });
  const token = jwt.sign(
    {
      userId: user.user_id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
  res.status(200).json({ token, message: "Logged in successfully" });
};

module.exports = loginUser;
