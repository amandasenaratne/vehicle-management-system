import { Router } from "express";
import { body } from "express-validator";
import {
  createBooking,
  getMyBookings,
  cancelMyBooking,
  getAllBookings,
  getBookingById,
  updateBookingStatus,
  deleteBooking,
  getDashboardStats,
  getPublicBookingById,
  lookupBooking,
} from "../controllers/bookingController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";
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

router.get("/stats", protect, authorize("admin"), getDashboardStats);
router.post("/", protect, authorize("customer"), bookingValidation, validate, createBooking);
router.get("/mine", protect, authorize("customer"), getMyBookings);
router.put("/:id/cancel", protect, authorize("customer"), cancelMyBooking);
router.get("/", protect, authorize("admin"), getAllBookings);
router.get("/:id", protect, authorize("admin"), getBookingById);
router.put(
  "/:id/status",
  protect,
  authorize("admin"),
  body("status").notEmpty().withMessage("Status is required"),
  validate,
  updateBookingStatus,
);
router.delete("/:id", protect, authorize("admin"), deleteBooking);

export default router;
