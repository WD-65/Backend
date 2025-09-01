import express from "express";
import userRouter from "./routes/users.js";

const app = express();
const port = process.env.PORT ?? 3000;

app.use(express.json());

app.use((req, res, next) => {
  console.log(`Method: ${req.method}, Path: ${req.path}`);
  req.wd65 = "some value";
  next();
});

const logTime = (req, res, next) => {
  const date = new Date();
  console.log(date.getTime());
  next();
};

app.get("/", logTime, logTime, logTime, logTime, (req, res) => {
  console.log(req.wd65);
  res.send("Hello world");
});

app.use("/users", userRouter);

app.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
});
