// backend/controllers/firebaseController.js
const { storage } = require("../firebase");
const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");

const uploadFile = async (req, res) => {
  console.log("uploadFile called");
  if (!req.file) {
    console.log("No file received in req.file");
    return res.status(400).json({ error: "No file provided" });
  }
  console.log("File received:", req.file.originalname);
  try {
    const storageRef = ref(storage, `profiles/${req.file.originalname}`);
    console.log("Uploading file to Firebase Storage...");
    await uploadBytes(storageRef, req.file.buffer);
    console.log("Upload successful. Retrieving download URL...");
    const downloadURL = await getDownloadURL(storageRef);
    console.log("Download URL:", downloadURL);
    res.json({ downloadURL });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ error: "Failed to upload file" });
  }
};

module.exports = { uploadFile };
