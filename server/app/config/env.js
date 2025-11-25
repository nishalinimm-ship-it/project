const env = {
  database: 'studentsdb',
  username: 'postgres',
  password: '2025sql',
  host: 'localhost',
  port: '5432',
  dialect: 'postgres',
  pool: {
    max: 10,
    min: 0,
    acquire: 1000000,
    idle: 200000
  }
};

export default env;
