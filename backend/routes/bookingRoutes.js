import { Router } from "express";
import { body } from "express-validator";
import {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBookingStatus,
  deleteBooking,
  getDashboardStats,
  getPublicBookingById,
  lookupBooking,
} from "../controllers/bookingController.js";
import { protect } from "../middleware/authMiddleware.js";
import validate from "../middleware/validateMiddleware.js";

const router = Router();
// PUBLIC lookup routes (no auth)
router.get("/public/:id", getPublicBookingById);
router.get("/lookup", lookupBooking);

const bookingValidation = [
  body("customerName")
    .trim()
    .notEmpty()
    .withMessage("Customer name is required"),
  body("phone").trim().notEmpty().withMessage("Phone is required"),
  body("vehicleNumber")
    .trim()
    .notEmpty()
    .withMessage("Vehicle number is required"),
  body("serviceType").trim().notEmpty().withMessage("Service type is required"),
  body("date").trim().notEmpty().withMessage("Date is required"),
  body("time").trim().notEmpty().withMessage("Time is required"),
];

router.get("/stats", protect, getDashboardStats);
router.post("/", bookingValidation, validate, createBooking);
router.get("/", protect, getAllBookings);
router.get("/:id", protect, getBookingById);
router.put(
  "/:id/status",
  protect,
  body("status").notEmpty().withMessage("Status is required"),
  validate,
  updateBookingStatus,
);
router.delete("/:id", protect, deleteBooking);

export default router;
