const User = require("../models/User");

const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      profileImage: user.profileImage,
      phoneNumber: user.phoneNumber || "",
    });
  } catch (err) {
    return next(err);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const { phoneNumber } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { phoneNumber },
      { new: true },
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      profileImage: user.profileImage,
      phoneNumber: user.phoneNumber || "",
    });
  } catch (err) {
    return next(err);
  }
};

module.exports = { getProfile, updateProfile };
