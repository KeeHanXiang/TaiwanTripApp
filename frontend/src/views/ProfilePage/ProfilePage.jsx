// frontend/src/views/ProfilePage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import ImageUploader from "../../components/ImageUploader/ImageUploader";
import ManageBills from "../../components/ManageBills.jsx/ManageBills";
import UserService from "../../services/UserService";
import SneakyConfession from "../../components/SneakyConfession/SneakyConfession";

const ProfilePage = () => {
  const { userId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeFeature, setActiveFeature] = useState(null); // "upload", "confession", or "bills"

  useEffect(() => {
    if (location.state && location.state.user) {
      setUser(location.state.user);
    } else {
      UserService.getUsers()
        .then((users) => {
          const found = users.find((u) => u.user_id === Number(userId));
          setUser(found);
        })
        .catch(console.error);
    }
  }, [userId, location.state]);

  const handleUpload = async (downloadURL) => {
    // Update the user state with the new image URL.
    setUser(prev => ({ ...prev, imageUrl: downloadURL }));
  };

  // Use inline styles for the background similar to Home.jsx
  const backgroundStyle = {
    backgroundImage: "url('/background2.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  // Style for the content container
  const containerStyle = {
    backgroundColor: "rgba(255,255,255,0.9)",
    padding: "30px",
    borderRadius: "10px",
    textAlign: "center",
    maxWidth: "500px",
    width: "90%",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    color: "#000", // Text color set to black
  };

  // Style for the profile image
  const imageStyle = {
    maxWidth: "200px",
    borderRadius: "50%",
    border: "4px solid #333",
  };

  // Style for the "No Image" placeholder
  const noImageStyle = {
    width: "200px",
    height: "200px",
    backgroundColor: "#ccc",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.2rem",
    color: "#666",
  };

  return (
    <div style={backgroundStyle}>
      {user ? (
        <div style={containerStyle}>
          <h1>{user.name}'s Profile</h1>
          <div style={{ margin: "20px 0", display: "flex", justifyContent: "center" }}>
            {user.imageUrl ? (
              <img src={user.imageUrl} alt="Profile" style={imageStyle} />
            ) : (
              <div style={noImageStyle}>No Profile Image</div>
            )}
          </div>
          
          {/* Feature Section */}
          {activeFeature === null ? (
            <div style={{ margin: "20px 0", display: "flex", flexDirection: "column", gap: "15px" }}>
              <button onClick={() => setActiveFeature("upload")}>
                Upload Profile
              </button>
              <button onClick={() => setActiveFeature("confession")}>
                Sneaky Confession
              </button>
              <button onClick={() => setActiveFeature("bills")}>
                Manage Bills
              </button>
              <button onClick={() => navigate(-1)}>Back</button>
            </div>
          ) : (
            <div style={{ margin: "20px 0" }}>
              {activeFeature === "upload" && (
                <div>
                  <h3>Upload Profile</h3>
                  <ImageUploader userId={user.user_id} onUpload={handleUpload} />
                </div>
              )}
              {activeFeature === "confession" && (
                <div>
                  <h3>Sneaky Confession</h3>
                  <SneakyConfession userId={user.user_id} />
                </div>
              )}
              {activeFeature === "bills" && (
                <div>
                  <h2>Manage Bills</h2>
                  <ManageBills userId={user.user_id} />
                </div>
              )}
              <button onClick={() => setActiveFeature(null)}>Back</button>
            </div>
          )}
        </div>
      ) : (
        <p>Loading user info...</p>
      )}
    </div>
  );
};

export default ProfilePage;
