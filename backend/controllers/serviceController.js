import prisma from "../config/db.js";

// @desc    Get all services
// @route   GET /api/services
// @access  Public
const getAllServices = async (req, res, next) => {
  try {
    const { active } = req.query;
    const where = {};

    if (active === "true") where.isActive = true;
    if (active === "false") where.isActive = false;

    const services = await prisma.serviceCategory.findMany({
      where,
      orderBy: { createdAt: "asc" },
    });

    res.status(200).json({ success: true, data: services });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a service
// @route   POST /api/services
// @access  Private (Admin)
const createService = async (req, res, next) => {
  try {
    const { name, description, isActive } = req.body;

    const service = await prisma.serviceCategory.create({
      data: {
        name: name.trim(),
        description: description?.trim() || null,
        isActive: typeof isActive === "boolean" ? isActive : true,
      },
    });

    res.status(201).json({ success: true, message: "Service created successfully", data: service });
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(409).json({ success: false, message: "Service already exists" });
    }
    next(error);
  }
};

// @desc    Delete a service
// @route   DELETE /api/services/:id
// @access  Private (Admin)
const deleteService = async (req, res, next) => {
  try {
    await prisma.serviceCategory.delete({ where: { id: req.params.id } });
    res.status(200).json({ success: true, message: "Service deleted successfully" });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ success: false, message: "Service not found" });
    }
    next(error);
  }
};

export { getAllServices, createService, deleteService };
