import db from "../config/db.config.js";
const Company = db.company;
const Users = db.users;

// Get all companies
export const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.findAll();
    res.json({ status: 200, reason: "Success", results: companies });
  } catch (err) {
    console.error("Error fetching companies:", err);
    res.status(500).json({ status: 500, reason: "Error fetching companies" });
  }
};

// Get users belonging to a specific company
export const getUsersByCompany = async (req, res) => {
  const { companyId } = req.params;

  try {
    const users = await Users.findAll({
      where: { company_id: companyId }
    });

    // Convert Sequelize instances to plain JSON
    const userData = users.map(user => user.get({ plain: true }));

    res.json({ status: 200, reason: "Success", results: userData });
  } catch (err) {
    console.error("Error fetching company users:", err);
    res.status(500).json({ status: 500, reason: "Error fetching users" });
  }
};
