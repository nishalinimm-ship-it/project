import {
  getAllUsers,
  addUser ,
  updateUser,
  deleteUser,
  loginUser 

} from '../controller/users.controller.js';
import db from "../config/db.config.js";
import multer from 'multer';

export default function(app) {
 app.post("/api/login", loginUser);

  app.get('/api/getAllUsers', getAllUsers);

   app.post('/api/addUser', addUser);  

  app.put('/api/updateUser/:id', updateUser);

  app.delete('/api/deleteUser/:id', deleteUser);

  

  
  // ------------------- FILE UPLOAD SETUP -------------------
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/");   // folder where files are saved
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    }
  });

  const Upload = multer({ storage: storage });

  // ------------------- UPLOAD ROUTE -------------------

app.post("/upload", Upload.array("myFiles"), async (req, res) => {
  try {
       const files = req.files;
    const savedFiles = [];

  for (const file of files) {
        const saved = await db.file.create({
          filename: file.originalname,
          mimetype: file.mimetype,
          path: file.path
        });
        savedFiles.push(saved);
      }

      res.json({
        message: "Files uploaded & saved to DB!",
        files: savedFiles
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Upload DB error", error });
    }
  });
}