import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: null,
    isLoading: true,
  });

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("auth");

    if (user && token) {
      setAuth({ user: JSON.parse(user), token, isLoading: false });
    } else {
      setAuth({ ...auth, isLoading: false });
    }
  }, []);

  async function logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("auth");

    setAuth({
      isLoading: false,
    });
  }

  const [workspaceId, setWorkspaceId] = useState();

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, logout, setWorkspaceId, workspaceId }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
