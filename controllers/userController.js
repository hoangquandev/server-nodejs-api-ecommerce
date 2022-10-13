import User from "../models/user";
import bcrypt from "bcrypt";

const userController = {
  // GET ALL USERS
  getAllUsers: async (req, res) => {
    try {
      const user = await User.find();
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // update user profile
  editUser: async (req, res) => {
    if (req.body.userId == req.params.userId) {
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      }
      try {
        const updatedUser = await User.findByIdAndUpdate(
          req.params.userId,
          {
            $set: req.body,
          },
          { new: true }
        );
        console.log(updatedUser);
        return res.status(200).json(updatedUser);
      } catch (err) {
        return res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can only update your profile");
    }
  },

  //   DELETE USER
  deleteUser: async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.userId);
      res.status(200).json("Delete successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = userController;
