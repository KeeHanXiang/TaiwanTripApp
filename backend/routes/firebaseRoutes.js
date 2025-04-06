// backend/routes/firebaseRoutes.js
const express = require("express");
const multer = require("multer");
const { uploadFile } = require("../controllers/firebaseController");

const router = express.Router();
const upload = multer(); // or configure as needed

router.post("/upload", upload.single("file"), uploadFile);

// backend/routes/firebaseRoutes.js
router.post("/test", (req, res) => {
    console.log("Test route hit");
    res.json({ message: "Test route working" });
  });

module.exports = router;
