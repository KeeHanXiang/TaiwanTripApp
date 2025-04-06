import React, { createContext, useState, useEffect } from "react";
import UserService from "../services/UserService";

// Create the context
export const UserContext = createContext();

// Provider component
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Fetch all users or the authenticated user.
    // Here we assume the current user is the first user returned for demo purposes.
    UserService.getUsers()
      .then((users) => {
        if (users && users.length > 0) {
          setCurrentUser(users[0]);
        }
      })
      .catch(console.error);
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;