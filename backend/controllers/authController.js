import bcrypt from "bcryptjs";
import prisma from "../config/db.js";
import generateToken from "../utils/generateToken.js";

const sanitizeName = (name = "") => name.trim().replace(/\s+/g, " ");

const toUserPayload = (user) => ({
  id: user.id,
  username: user.username,
  name: user.name,
  email: user.email,
  role: user.role,
  token: generateToken(user.id),
});

// @desc    Login admin
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const identifier = (email || username || "").trim().toLowerCase();

    if (!identifier) {
      return res.status(400).json({ success: false, message: "Email or username is required" });
    }

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ username: identifier }, { email: identifier }],
      },
    });

    if (!user || user.role !== "admin" || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ success: false, message: "Invalid username or password" });
    }

    res.status(200).json({
      success: true,
      data: toUserPayload(user),
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Signup customer
// @route   POST /api/auth/customer/signup
// @access  Public
const customerSignup = async (req, res, next) => {
  try {
    const normalizedEmail = req.body.email.trim().toLowerCase();
    const name = sanitizeName(req.body.name);
    const { password } = req.body;

    const existing = await prisma.user.findUnique({
      where: { username: normalizedEmail },
    });

    if (existing) {
      return res.status(409).json({ success: false, message: "Email already registered" });
    }

    const user = await prisma.user.create({
      data: {
        username: normalizedEmail,
        email: normalizedEmail,
        name,
        password: await bcrypt.hash(password, 12),
        role: "customer",
      },
    });

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      data: toUserPayload(user),
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Login customer
// @route   POST /api/auth/customer/login
// @access  Public
const customerLogin = async (req, res, next) => {
  try {
    const normalizedEmail = req.body.email.trim().toLowerCase();
    const { password } = req.body;

    const user = await prisma.user.findUnique({
      where: { username: normalizedEmail },
    });

    if (!user || user.role !== "customer" || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    res.status(200).json({
      success: true,
      data: toUserPayload(user),
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current logged-in user
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  res.status(200).json({ success: true, data: req.user });
};

export { login, customerSignup, customerLogin, getMe };
