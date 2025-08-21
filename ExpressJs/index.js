import express from "express";

const app = express();
const port = 3000;

let users = [
  {
    id: crypto.randomUUID(),
    name: "John Doe",
    age: 20,
  },
  {
    id: crypto.randomUUID(),
    name: "Jane Doe",
    age: 21,
  },
];

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/users", (req, res) => {
  // fetch users from db
  res.json(users);
});

app.post("/users", (req, res) => {
  const { name, age } = req.body;

  const newUser = {
    id: crypto.randomUUID(),
    name,
    age,
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((u) => {
    return u.id === id;
  });
  res.json(user);
});

app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, age } = req.body;

  let updatedUser;
  users = users.map((u) => {
    if (u.id === id) {
      updatedUser = { ...u, name, age };
      return updatedUser;
    } else {
      return u;
    }
  });

  res.json(updatedUser);
});

app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  users = users.filter((u) => {
    return u.id !== id;
  });

  res.status(204).end();
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
