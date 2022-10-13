import express from "express";
import userController from "../controllers/userController";
import middlewareController from "../controllers/middlewareController";

const router = express.Router();

// GET ALL USER
router.get("/", middlewareController.verifyToken, userController.getAllUsers);

// Update user profile
router.put(
  "/:userId",
  middlewareController.verifyToken,
  userController.editUser
);

// DELETE USER
router.delete(
  "/:userId",
  middlewareController.verifyTokenAndAdminAuth,
  userController.deleteUser
);

module.exports = router;
