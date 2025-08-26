import express from "express";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "./controllers/users.js";

const app = express();
const port = process.env.PORT ?? 3000;

app.use(express.json());

app.route("/users").get(getUsers).post(createUser);
// app.get('/users', getUsers)
// app.post('/users', createUser)
app.route("/users/:id").get(getUserById).put(updateUser).delete(deleteUser);
// app.get('/users/:id', getUserById)
// app.put('/users/:id', updateUser)
// app.delete('/users/:id', deleteUser)

app.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
});
