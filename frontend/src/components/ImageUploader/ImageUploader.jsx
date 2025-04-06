// frontend/src/components/ImageUploader/ImageUploader.jsx
import React, { useState } from "react";

const ImageUploader = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert("No file selected");
    setUploading(true);

    try {
      // Prepare form data
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

      // Pass the download URL back to the parent component
      onUpload(downloadURL);

      alert("✅ Image uploaded!");
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
