import Sequelize from "sequelize";
import env from "./env.js";

import usersModel from "../models/users.model.js";
import uploadsModel from "../models/upload.model.js";
import companyModel from "../models/company.model.js";

const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  port: env.port,
  dialect: env.dialect,
  logging: console.log,
  define: { timestamps: false },
  pool: env.pool,
  dialectOptions: { useUTC: false },
  timezone: "+05:30",
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

/* ==========================================
   MODELS
============================================*/
db.users = usersModel(sequelize, Sequelize.DataTypes);
db.uploads = uploadsModel(sequelize, Sequelize.DataTypes);
db.company = companyModel(sequelize, Sequelize.DataTypes);

/* ==========================================
   ASSOCIATIONS
============================================*/

// 1️⃣ Uploads → Users
db.uploads.belongsTo(db.users, { foreignKey: "user_id" });
db.users.hasMany(db.uploads, { foreignKey: "user_id" });

// 2️⃣ Users → Company (foreign key)
db.users.belongsTo(db.company, { foreignKey: "company_id" });

// 3️⃣ Company → Users (one company has many employees)
db.company.hasMany(db.users, { foreignKey: "company_id" });

/* ==========================================
   TEST CONNECTION
============================================*/
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully.");

    await sequelize.sync(); // creates missing tables but does NOT drop
    console.log("Models synced.");
  } catch (err) {
    console.error("Unable to connect to database:", err);
  }
})();

export default db;
