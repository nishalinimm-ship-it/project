import db from "../config/db.config.js";
import { Op } from "sequelize";

const users = db.users;

// Login
export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      status: 400,
      reason: "Username and password are required",
    });
  }

  const t = await db.sequelize.transaction();

  try {
    const user = await users.findOne({
      where: {
        user_name: username, // FIX: field corrected
        password,
        status: { [Op.in]: [0, 1] }
      },
      transaction: t,
    });

    await t.commit();

    if (user) {
      return res.status(200).json({
        status: 200,
        reason: "Login successful",
        results: user.get({ plain: true }),
      });
    }

    return res.status(404).json({
      status: 404,
      reason: "Invalid credentials",
    });

  } catch (err) {
    await t.rollback();
    console.error("Login error:", err);
    return res.status(500).json({
      status: 500,
      reason: "Server error during login",
    });
  }
};

// Get All Users
export const getAllUsers = async (req, res) => {
  const t = await db.sequelize.transaction();

  try {
    const queryRes = await users.findAll({
      where: {
        status: { [Op.in]: [0, 1] }
      },
      transaction: t,
    });

    const userData = queryRes.map(u => u.get({ plain: true }));

    await t.commit();

    if (userData.length > 0) {
      return res.json({ status: 200, reason: "Success", results: userData });
    }

    return res.status(404).json({ status: 404, reason: "No data found", results: [] });

  } catch (err) {
    await t.rollback();
    console.error("Fetch users error:", err);
    res.status(500).json({ status: 500, reason: "Error fetching users", results: [] });
  }
};

// Add User
export const addUser = async (req, res) => {
  const t = await db.sequelize.transaction();

  try {
    const { user_name, email, password, status, company_id } = req.body;

    if (!user_name || !email || !password) {
      return res.status(400).json({
        status: 400,
        reason: "User name, email, and password are required",
        results: [],
      });
    }

    const newUser = await users.create(
      {
        user_name,
        email,
        password,
        mobile_no: req.body.mobile_no || null,
        status: status ?? 0,
        company_id
      },
      { transaction: t }
    );

    await t.commit();

    return res.status(201).json({
      status: 201,
      reason: "User created successfully",
      results: newUser.get({ plain: true })
    });

  } catch (err) {
    await t.rollback();
    console.error("Create user error:", err);

    if (err.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        status: 409,
        reason: "A user with this email already exists",
        results: [],
      });
    }

    return res.status(500).json({
      status: 500,
      reason: "Error creating user",
      results: []
    });
  }
};

// Update User
export const updateUser = async (req, res) => {
  const { user_id } = req.params;
  const updateData = req.body;
  const t = await db.sequelize.transaction();

  try {
    const user = await users.findByPk(user_id, { transaction: t });

    if (!user) {
      await t.commit();
      return res.status(404).json({ status: 404, reason: "User not found" });
    }

    await user.update(updateData, { transaction: t });
    await t.commit();

    res.json({
      status: 200,
      reason: "User updated successfully",
      results: user.get({ plain: true }),
    });

  } catch (err) {
    await t.rollback();
    console.error("Update user error:", err);
    res.status(500).json({ status: 500, reason: "Error updating user" });
  }
};

// Delete User
export const deleteUser = async (req, res) => {
  const { user_id } = req.params;

  const t = await db.sequelize.transaction();
  try {
    const user = await users.findByPk(user_id, { transaction: t });

    if (!user) {
      await t.commit();
      return res.status(404).json({ status: 404, reason: "User not found" });
    }

    await user.destroy({ transaction: t });
    await t.commit();

    res.json({ status: 200, reason: "User deleted successfully" });

  } catch (err) {
    await t.rollback();
    console.error("Delete user error:", err);
    res.status(500).json({ status: 500, reason: "Error deleting user" });
  }
};
