import {
  getAllUsers,
  addUser ,
  updateUser,
  deleteUser,
  loginUser
} from '../controller/users.controller.js';

export default function(app) {
 app.post("/api/login", loginUser);

  app.get('/api/getAllUsers', getAllUsers);

   app.post('/api/addUser', addUser);  

  app.put('/api/updateUser/:id', updateUser);

  app.delete('/api/deleteUser/:id', deleteUser);
}
