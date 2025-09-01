import express from "express";
import cors from "cors";

import { upload } from "./middlewares/upload-file.js";

const app = express();
const port = process.env.PORT ?? 3000;

app.use(cors());
app.use("/uploads", express.static("uploads"));

app.post("/file-upload", upload.single("image"), (req, res) => {
  res.json({
    name: req.file.filename,
    location: `http://localhost:${port}/uploads/${req.file.filename}`,
  });
});

app.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
});
