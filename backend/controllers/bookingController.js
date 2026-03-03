import prisma from "../config/db.js";

const VALID_STATUSES = ["Pending", "Approved", "Completed", "Rejected", "Cancelled"];
const CUSTOMER_CANCELABLE_STATUSES = ["Pending", "Approved"];

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Public
const createBooking = async (req, res, next) => {
  try {
    const {
      customerName,
      phone,
      vehicleNumber,
      serviceType,
      date,
      time,
      notes,
    } = req.body;

    const booking = await prisma.booking.create({
      data: {
        customerName: customerName?.trim() || req.user?.name || req.user?.username || "Customer",
        phone,
        vehicleNumber,
        serviceType,
        date,
        time,
        notes,
        userId: req.user.id,
      },
    });

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get bookings for logged in customer
// @route   GET /api/bookings/mine
// @access  Private (Customer)
const getMyBookings = async (req, res, next) => {
  try {
    const bookings = await prisma.booking.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({ success: true, data: bookings });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private (Admin)
const getAllBookings = async (req, res, next) => {
  try {
    const { status, date, page = 1, limit = 10 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const where = {};
    if (status && VALID_STATUSES.includes(status)) where.status = status;
    if (date) where.date = date;

    const [bookings, total] = await prisma.$transaction([
      prisma.booking.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: Number(limit),
      }),
      prisma.booking.count({ where }),
    ]);

    res.status(200).json({
      success: true,
      data: bookings,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Cancel booking for logged in customer
// @route   PUT /api/bookings/:id/cancel
// @access  Private (Customer)
const cancelMyBooking = async (req, res, next) => {
  try {
    const booking = await prisma.booking.findUnique({
      where: { id: req.params.id },
      select: { id: true, userId: true, status: true },
    });

    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    if (booking.userId !== req.user.id) {
      return res.status(403).json({ success: false, message: "You can only cancel your own bookings" });
    }

    if (!CUSTOMER_CANCELABLE_STATUSES.includes(booking.status)) {
      return res.status(400).json({
        success: false,
        message: "Only pending or approved bookings can be cancelled",
      });
    }

    const updated = await prisma.booking.update({
      where: { id: req.params.id },
      data: { status: "Cancelled" },
    });

    res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single booking by ID
// @route   GET /api/bookings/:id
// @access  Private (Admin)
const getBookingById = async (req, res, next) => {
  try {
    const booking = await prisma.booking.findUnique({
      where: { id: req.params.id },
    });
    if (!booking)
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    res.status(200).json({ success: true, data: booking });
  } catch (error) {
    next(error);
  }
};

// @desc    Update booking status
// @route   PUT /api/bookings/:id/status
// @access  Private (Admin)
const updateBookingStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    if (!VALID_STATUSES.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Status must be one of: ${VALID_STATUSES.join(", ")}`,
      });
    }

    const booking = await prisma.booking.update({
      where: { id: req.params.id },
      data: { status },
    });

    res.status(200).json({
      success: true,
      message: "Booking status updated",
      data: booking,
    });
  } catch (error) {
    if (error.code === "P2025")
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    next(error);
  }
};

// @desc    Delete a booking
// @route   DELETE /api/bookings/:id
// @access  Private (Admin)
const deleteBooking = async (req, res, next) => {
  try {
    await prisma.booking.delete({ where: { id: req.params.id } });
    res
      .status(200)
      .json({ success: true, message: "Booking deleted successfully" });
  } catch (error) {
    if (error.code === "P2025")
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    next(error);
  }
};

// @desc    Get dashboard stats
// @route   GET /api/bookings/stats
// @access  Private (Admin)
const getDashboardStats = async (req, res, next) => {
  try {
    const today = new Date().toISOString().split("T")[0];

    const [total, pending, approved, completed, rejected, cancelled, todayBookings] =
      await prisma.$transaction([
        prisma.booking.count(),
        prisma.booking.count({ where: { status: "Pending" } }),
        prisma.booking.count({ where: { status: "Approved" } }),
        prisma.booking.count({ where: { status: "Completed" } }),
        prisma.booking.count({ where: { status: "Rejected" } }),
        prisma.booking.count({ where: { status: "Cancelled" } }),
        prisma.booking.count({ where: { date: today } }),
      ]);

    res.status(200).json({
      success: true,
      data: {
        total,
        pending,
        approved,
        completed,
        rejected,
        cancelled,
        todayBookings,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ...

// @desc    Public: get booking by id (limited fields)
// @route   GET /api/bookings/public/:id
// @access  Public
const getPublicBookingById = async (req, res, next) => {
  try {
    const booking = await prisma.booking.findUnique({
      where: { id: req.params.id },
      select: {
        id: true,
        customerName: true,
        phone: true,
        vehicleNumber: true,
        serviceType: true,
        notes: true,
        date: true,
        time: true,
        status: true,
        createdAt: true,
      },
    });

    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    res.status(200).json({ success: true, data: booking });
  } catch (error) {
    next(error);
  }
};

// @desc    Public: lookup booking by vehicleNumber + phone
// @route   GET /api/bookings/public/lookup?vehicleNumber=...&phone=...
// @access  Public
const lookupBooking = async (req, res, next) => {
  try {
    const { vehicleNumber, phone } = req.query;

    if (!vehicleNumber || !phone) {
      return res.status(400).json({
        success: false,
        message: "vehicleNumber and phone are required",
      });
    }

    const booking = await prisma.booking.findFirst({
      where: {
        vehicleNumber,
        phone,
      },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        customerName: true,
        phone: true,
        vehicleNumber: true,
        serviceType: true,
        notes: true,
        date: true,
        time: true,
        status: true,
        createdAt: true,
      },
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "No booking found for given details",
      });
    }

    res.status(200).json({ success: true, data: booking });
  } catch (error) {
    next(error);
  }
};

export {
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
};
