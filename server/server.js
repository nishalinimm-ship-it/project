import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from "path";
import routes from './app/routes/index.js';
import db from './app/config/db.config.js';

const app = express();

global.__basedir = process.cwd();
const uploadDir = path.join(global.__basedir, "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: '*' }));

app.use("/uploads", express.static(path.join(global.__basedir, "uploads")));

(async () => {
  try {
    await db.sequelize.authenticate();
    console.log('Database connected successfully.');
  } catch (error) {
    console.error('Unable to connect to database:', error);
  }
})();

app.get("/test", (req, res) => {
  res.send("Backend running OK");
});

routes(app);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
