import express from 'express';
import cors from 'cors';
import routes from './app/route/index.js';
import db from './app/config/db.config.js';

const app = express();
app.use(express.json());
app.use(cors());

// DB Sync
(async () => {
  await db.sequelize.authenticate();
  await db.sequelize.sync();
  console.log("DB Ready 🚀");
})();

// Routes
routes(app);

const PORT = 3001;
app.listen(PORT, () => console.log(`Server http://localhost:${PORT}`));
