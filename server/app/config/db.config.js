import Sequelize from 'sequelize';
import env from './env.js';
import usersModel from '../model/users.js';


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


(async () => {
  console.log("jhhjbhj")
  try {
    await sequelize.authenticate();
    console.log(' Database connected successfully.');
  } catch (error) {
    console.error(' Unable to connect to database:', error);
  }
})();

export default db;