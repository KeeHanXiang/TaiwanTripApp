// frontend/src/components/ImageUploader/ImageUploader.jsx
import React, { useState } from "react";
import UserService from "../../services/UserService";

const ImageUploader = ({ userId, onUpload }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert("No file selected");
    setUploading(true);

    try {
      // Upload file to Firebase
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/firebase/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const { downloadURL } = await response.json();
      console.log("Firebase download URL:", downloadURL);

      // Update the profile picture in the database using the service
      await UserService.updateProfilePic(userId, downloadURL);

      // If an onUpload callback is provided, pass the downloadURL back
      if (onUpload) onUpload(downloadURL);

      alert("✅ Image uploaded and profile updated!");
    } catch (error) {
      console.error("Upload failed:", error);
      alert("❌ Upload failed!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
};

export default ImageUploader;
