import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${crypto.randomUUID()}${path.extname(
        file.originalname
      )}`
    );
  },
});

function fileFilter(req, file, cb) {
  const allowedTypes = ["image/png", "image/jpeg"];

  if (!allowedTypes.includes(file.mimetype))
    return cb(new Error("File Not Supported!!"));

  cb(null, true);
}

export const upload = multer({ storage, fileFilter });
