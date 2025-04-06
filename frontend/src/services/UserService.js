// frontend/src/services/UserService.js
class UserService {
  static async updateProfilePic(userId, imageUrl) {
    const res = await fetch("/api/upload-profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, imageUrl }),
    });
    if (!res.ok) throw new Error("Failed to update profile picture");
    return await res.json();
  }

  static async getUsers() {
    const res = await fetch("/api/users");
    if (!res.ok) throw new Error("Failed to fetch users");
    return await res.json();
  }
}

export default UserService;
