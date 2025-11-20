export default (sequelize, Sequelize) => {
  const File = sequelize.define("file", {
    filename: { type: Sequelize.STRING },
    filepath: { type: Sequelize.STRING }
  });

  return File;
};
///database file