import express from "express";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "./controllers/users.js";
import {
  createNote,
  deleteNote,
  getNoteById,
  getNotes,
  updateNote,
} from "./controllers/notes.js";

const app = express();
const port = process.env.PORT ?? 3000;

app.use(express.json());

app.route("/users").get(getUsers).post(createUser);
app.route("/users/:id").get(getUserById).put(updateUser).delete(deleteUser);

app.route("/notes").get(getNotes).post(createNote);
app.route("/notes/:id").get(getNoteById).put(updateNote).delete(deleteNote);

app.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
});
