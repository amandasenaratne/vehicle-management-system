import { Router } from "express";
import { body } from "express-validator";
import { customerLogin, customerSignup, getMe, login } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import validate from "../middleware/validateMiddleware.js";

const router = Router();

router.post(
  "/login",
  [
    body("password").notEmpty().withMessage("Password is required"),
    body().custom((value) => {
      if (!value?.username && !value?.email) {
        throw new Error("Email or username is required");
      }
      return true;
    }),
  ],
  validate,
  login
);

router.post(
  "/customer/signup",
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").trim().isEmail().withMessage("Valid email is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  validate,
  customerSignup
);

router.post(
  "/customer/login",
  [
    body("email").trim().isEmail().withMessage("Valid email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  validate,
  customerLogin
);

router.get("/me", protect, getMe);

export default router;
