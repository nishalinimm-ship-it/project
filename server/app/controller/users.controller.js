import db from "../config/db.config.js";
import { Op } from "sequelize";

const users = db.users;


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
       name: username,
        password,
        status: { [Op.in]: [0, 1] }, 
      },
      transaction: t,
    });

    await t.commit();

    if (user) {
      const userData = user.get({ plain: true });
      return res.status(200).json({
        status: 200,
        reason: "Login successful",
        results: user.get({plain: true}),
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

export const getAllUsers = async (req, res) => {
  console.log("Inside getAllUsers");

  const t = await db.sequelize.transaction();

  try {
    const queryRes = await users.findAll({
      where: {
        status: {
          [Op.in]: [0, 1],
        },
      },
      transaction: t,
    });

    const userData = queryRes.map((user) => user.get({ plain: true }));
    console.log("fetched users:", userData.map((u)=>({id: u.id })));

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

export const addUser = async (req, res) => {
  const t = await db.sequelize.transaction();

  try {
    const { name, email, password, status } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        status: 400,
        reason: "Name, email, and password are required",
        results: []
      });
    }

    const newUser = await users.create(
      {
        name,
        email,
        password,
        status: status ?? 0, 
      },
      { transaction: t }
    );

    await t.commit();

    const userData = newUser.get({ plain: true });

    return res.status(201).json({
      status: 201,
      reason: "User created successfully",
      results: userData
    });

  } catch (err) {
    await t.rollback();
    console.error("Error creating user:", err);

    if (err.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        status: 409,
        reason: "A user with this email already exists",
        results: []
      });
    }

    return res.status(500).json({
      status: 500,
      reason: "Error creating user",
      results: []
    });
  }
};



export const updateUser = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  const t = await db.sequelize.transaction();
  try {
    const user = await users.findByPk(id, { transaction: t });

    if (!user) {
      await t.commit();
      return res.status(404).json({ status: 404, reason: "User not found" });
    }

    await user.update(updateData, { transaction: t });
    await t.commit();

    res.json({
      status: 200,
      reason: "User updated successfully",
      results: user,
    });
  } catch (err) {
    await t.rollback();
    console.error("Error updating user:", err);
    res.status(500).json({ status: 500, reason: "Error updating user" });
  }
};


export const deleteUser = async (req, res) => {
  const { id } = req.params;

  const t = await db.sequelize.transaction();
  try {
    const user = await users.findByPk(id, { transaction: t });

    if (!user) {
      await t.commit();
      return res.status(404).json({ status: 404, reason: "User not found" });
    }

    await user.destroy({ transaction: t });
    await t.commit();

    res.json({ status: 200, reason: "User deleted successfully" });
  } catch (err) {
    await t.rollback();
    console.error("Error deleting user:", err);
    res.status(500).json({ status: 500, reason: "Error deleting user" });
  }
};

