export default (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "users",
    {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mobile_no: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      company_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      }
    },
    {
      tableName: "users",
      timestamps: false
    }
  );

  return Users;
};
