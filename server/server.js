import express from 'express';
import cors from 'cors';
import multer from 'multer';
import routes from './app/route/index.js';
import db from './app/config/db.config.js';

const app = express();

// Middleware
app.use(express.json({ limit: '524288000' })); 
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Database connection
global.__basedir = process.cwd();

(async () => {
  try {
    await db.sequelize.authenticate();
    console.log(' Database connected successfully.');
  } catch (error) {
    console.error(' Unable to connect to the database:', error);
  }
})();

// Routes
routes(app);

// File upload config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

app.post("/upload", upload.array("myFiles"), (req, res) => {
  return res.json({ message: "Files uploaded successfully!" });
});

// Server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(` Server running at: http://localhost:${PORT}`);
});
