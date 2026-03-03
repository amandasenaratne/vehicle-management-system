import { Router } from "express";
import { body } from "express-validator";
import { getAllServices, createService, deleteService } from "../controllers/serviceController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";
import validate from "../middleware/validateMiddleware.js";

const router = Router();

router.get("/", getAllServices);
router.post(
  "/",
  protect,
  authorize("admin"),
  [body("name").trim().notEmpty().withMessage("Service name is required")],
  validate,
  createService
);
router.delete("/:id", protect, authorize("admin"), deleteService);

export default router;
