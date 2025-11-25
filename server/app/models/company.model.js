export default (sequelize, DataTypes) => {
  return sequelize.define(
    "company",
    {
      company_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      company_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contact_person: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      mobile_number: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "company",
      timestamps: false,
    }
  );
};
