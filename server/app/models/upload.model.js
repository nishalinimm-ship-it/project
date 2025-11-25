import { DataTypes } from 'sequelize';

const Uploads = (sequelize, DataTypes) => {
  return sequelize.define('uploads', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    filename: { type: DataTypes.STRING, allowNull: false },
    mimetype: { type: DataTypes.STRING, allowNull: false },
    size: { type: DataTypes.INTEGER, allowNull: false },
    path: { type: DataTypes.STRING, allowNull: false },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: 'users', key: 'id' } // <-- use string, not the function
    }
  }, {
    tableName: 'uploads',
    timestamps: true  
  });
};

export default Uploads;
