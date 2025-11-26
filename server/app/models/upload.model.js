export default (sequelize, DataTypes) => {
  const Uploads = sequelize.define('uploads', {
    id: { 
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true 
    },
    filename: DataTypes.STRING,
    mimetype: DataTypes.STRING,
    size: DataTypes.INTEGER,
    path: DataTypes.STRING,
    user_id: {                  
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { 
        model: 'users',
        key: 'id'     // ✅ FIXED foreign key
      }
    }
  }, {
    tableName: 'uploads',
    timestamps: true  
  });

  return Uploads;
};
