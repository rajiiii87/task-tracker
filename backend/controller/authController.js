const authModel = require("../model/authModel");
const bcrypt = require("bcrypt");
const registerController = async (req, res) => {
  try {
    const { username, email, password, confirm_password } = req.body;
    if (!username) {
      return res.status(417).json({
        success: false,
        error: "username is Required",
        error_description: "username Field Must not be empty ",
      });
    }
    if (!email) {
      return res.status(417).json({
        success: false,
        error: "email is Required",
        error_description: "email Field Must not be empty ",
      });
    }
    if (!password) {
      return res.status(417).json({
        success: false,
        error: "password is Required",
        error_description: "password Field Must not be empty ",
      });
    }
    if (!confirm_password) {
      return res.status(417).json({
        success: false,
        error: "confirm_password is Required",
        error_description: "confirm_password Field Must not be empty ",
      });
    }
    if (password !== confirm_password) {
      return res.status(417).json({
        success: false,
        error: "password & confirm_password is not equal",
        error_description: "give same password & confirm_password ",
      });
    }
    const isUserAlreadyExist = await authModel.findOne({ email: email, username: username });
    if (isUserAlreadyExist) {
      return res.status(417).json({
        success: false,
        error: "User Already Exists",
        error_description: "Enter Different email / username",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const register = new authModel({
      username,
      email,
      password: hashedPassword,
    });
    await register.save().then((response) => {
      res.status(200).json({
        success: true,
        message: "Registered Successfully",
        data: response,
      });
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
};
const loginController = async (req, res) => {
  const { username, password } = req.body;
  if (!username) {
    return res.status(417).json({
      success: false,
      error: "username is Required",
      error_description: "username Field Must not be empty ",
    });
  }
  if (!password) {
    return res.status(417).json({
      success: false,
      error: "password is Required",
      error_description: "password Field Must not be empty ",
    });
  }
  const login = await authModel.findOne({ username: username });
  if (!login) {
    return res.status(417).json({
      success: false,
      error: "Email Not Found",
      error_description: "Check Your Email",
    });
  }
  try {
    bcrypt.compare(password, login.password, (err, result) => {
      if (result) {
        return res.status(200).json({
          success: true,
          message: "Login Successfully",
          data: login,
        });
      }
      return res.status(500).json({ success: false, error: "password Incorrect" });
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
};

module.exports = { registerController, loginController };
