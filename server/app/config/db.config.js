import Sequelize from 'sequelize';
import env from './env.js';
import usersModel from '../model/users.js';
import FileModel from "../model/file.model.js";//added for file

const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  port: env.port,
  dialect: env.dialect,
  logging: console.log,
  define: { timestamps: false },
  pool: env.pool,
    dialectOptions: { 
   useUTC: false, 
 },
  timezone: '+05:30'
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = usersModel(sequelize, Sequelize.DataTypes);
db.file = FileModel(sequelize, Sequelize);//added for db 


(async () => {
  console.log("jhhjbhj")
  try {
    await sequelize.authenticate();
    console.log(' Database connected successfully.');

//added for file
     await sequelize.sync({after: true});
    console.log(" All models synced successfully.");

 
  } catch (error) {
    console.error(' Unable to connect to database:', error);
  }
})();

export default db;