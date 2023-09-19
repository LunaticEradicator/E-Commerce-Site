import path from "path";
import express from "express";
import multer from "multer";
const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "frontend/public/uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(req, file, cb) {
  const filetypes = /jpeg|png|webp|jpg/;
  // const mimetypes = /image\/jpe?g|image\/png|image\/webp/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images only!");
  }
}

const upload = multer({ storage });
// const uploadSingleImage = upload.single("image");

router.post("/", upload.single("image"), (req, res) => {
  res.send({
    message: "Image uploaded successfully",
    image: `/${req.file.filename}`,
    //? regular expression to show "/"" instead of "\" for directory
    //? ./uploads/src\name = >./uploads/src/name
    // image: `/${req.file.path.replace(/\\/g, "/")}`,
  });
});

export default router;
