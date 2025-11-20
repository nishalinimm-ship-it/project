import {
  getAllUsers,
  addUser ,
  updateUser,
  deleteUser,
  loginUser 

} from '../controller/users.controller.js';
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
  app.post("/upload", Upload.array("myFiles"), (req, res) => {
    console.log(req.files);
    res.json({
      message: "Files uploaded successfully!",
      files: req.files
    });
  });

}

// app.post("/upload", upload.array("myFiles"), async (req, res) => {
//   try {
//     const savedFiles = [];

//     for (let f of req.files) {
//       const fileRecord = await db.file.create({
//         filename: f.filename,
//         filepath: "/uploads/" + f.filename
//       });
//       savedFiles.push(fileRecord);
//     }

//     res.json({
//       message: "Uploaded & saved to DB!",
//       files: savedFiles
//     });

//   } catch (error) {
//     res.status(500).json({ message: "DB save error", error });
//   }
// });


// }