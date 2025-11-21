
///database file
export default (sequelize, Sequelize) => {
  const File = sequelize.define("file", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    filename: {
      type: Sequelize.STRING,
      allowNull: false
    },
    mimetype: {
      type: Sequelize.STRING,
       allowNull: false
    },
    // data: {
    //   type: Sequelize.BLOB('long'), // store binary
    //    allowNull: false
    // }
     path: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
{
    tableName: "files",
    timestamps: false
  });

  return File;
};
