// frontend/src/services/UserService.js
class UserService {
    static async uploadProfilePicture(userId, imageUrl) {
      try {
        const res = await fetch("/api/users/upload-profile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, imageUrl }),
        });
  
        if (!res.ok) throw new Error("Failed to upload profile picture");
  
        return await res.json();
      } catch (error) {
        console.error("❌ Upload failed:", error);
        throw error;
      }
    }
  
    static async getUsers() {
      const res = await fetch("/api/users");
      if (!res.ok) throw new Error("Failed to fetch users");
      return await res.json();
    }
  }
  
  export default UserService;
  