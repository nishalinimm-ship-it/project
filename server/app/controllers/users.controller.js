import db from "../config/db.config.js";
import { Op } from "sequelize";

const users = db.users;

// =====================
// PAGINATION CONTROLLER
// =====================
export const getUsersPaginated = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const offset = page * limit;

  try {
    const { count, rows } = await users.findAndCountAll({
      limit,
      offset,
      where: {
        status: { [Op.in]: [0, 1] }
      }
    });

    res.json({
      status: 200,
      results: rows,
      total: count
    });

  } catch (error) {
    console.error("Pagination error:", error);
    res.status(500).json({
      status: 500,
      reason: "Database error",
      error: error.message,
    });
  }
};


// =====================
// LOGIN USER
// =====================
export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      status: 400,
      reason: "username and password are required",
    });
  }

  const t = await db.sequelize.transaction();

  try {
    const user = await users.findOne({
      where: {
        user_name: username,
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
    } else {
      return res.status(404).json({
        status: 404,
        reason: "User not found or invalid credentials",
      });
    }
  } catch (err) {
    await t.rollback();
    console.error("Login error:", err);
    return res.status(500).json({
      status: 500,
      reason: "Server error during login",
    });
  }
};


// =====================
// GET ALL USERS
// =====================
export const getAllUsers = async (req, res) => {
  console.log("Inside getAllUsers");

  const t = await db.sequelize.transaction();

  try {
    const queryRes = await users.findAll({
      where: {
        status: { [Op.in]: [0, 1] }
      },
      transaction: t,
    });

    const userData = queryRes.map((u) => u.get({ plain: true }));
    console.log("Fetched users:", userData.map((u) => ({ id: u.user_id })));

    await t.commit();

    if (userData.length > 0) {
      res.json({ status: 200, reason: "Success", results: userData });
    } else {
      res.status(404).json({ status: 404, reason: "No data found", results: [] });
    }
  } catch (err) {
    await t.rollback();
    console.error("Error fetching users:", err);
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
// export const updateUser = async (req, res) => {
//   const { user_id } = req.params;
//   const updateData = req.body;
//   const t = await db.sequelize.transaction();

//   try {
//     const user = await users.findByPk(user_id, { transaction: t });

//     if (!user) {
//       await t.commit();
//       return res.status(404).json({ status: 404, reason: "User not found" });
//     }

//     await user.update(updateData, { transaction: t });
//     await t.commit();

//     res.json({
//       status: 200,
//       reason: "User updated successfully",
//       results: user.get({ plain: true }),
//     });

//   } catch (err) {
//     await t.rollback();
//     console.error("Update user error:", err);
//     res.status(500).json({ status: 500, reason: "Error updating user" });
//   }
// };

// controllers/users.controller.js
// UPDATE USER
export const updateUser = async (req, res) => {
  try {
    console.log(">>> updateUser called - params:", req.params, "body:", req.body);

    const user_id = parseInt(req.params.user_id);

    if (!user_id || isNaN(user_id)) {
      console.log("updateUser - invalid id:", req.params.user_id);
      return res.status(400).json({ status: 400, message: "Invalid User ID" });
    }

    const existingUser = await users.findByPk(user_id);

    if (!existingUser) {
      console.log("updateUser - user not found:", user_id);
      return res.status(404).json({ status: 404, message: "User not found" });
    }

    const updateData = { ...req.body };
    delete updateData.user_id; // prevent primary key update

    await users.update(updateData, { where: { user_id } });

    console.log("updateUser - success:", user_id);
    return res.status(200).json({ status: 200, message: "User updated successfully" });

  } catch (error) {
    console.error("updateUser error:", error);
    return res.status(500).json({ status: 500, message: "Update failed", error });
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
