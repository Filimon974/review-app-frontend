import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";



const AuthContext =
  createContext();



export function AuthProvider({
  children
}) {

  const [user, setUser] =
    useState(null);
  
  const [authLoading, setAuthLoading] =
  useState(true);

  const [token, setToken] =
    useState(
      localStorage.getItem("token")
    );



  /*
  ============================
  LOAD USER
  ============================
  */

  useEffect(() => {

  const savedUser =
    localStorage.getItem("user");

  if (savedUser) {

    setUser(
      JSON.parse(savedUser)
    );

  }

  setAuthLoading(false);

}, []);




  /*
  ============================
  LOGIN
  ============================
  */

  const login = (data) => {

    setUser(data);

    setToken(data.token);

    localStorage.setItem(
      "token",
      data.token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(data)
    );

  };




  /*
  ============================
  LOGOUT
  ============================
  */

  const logout = () => {

    setUser(null);

    setToken(null);

    localStorage.removeItem("token");

    localStorage.removeItem("user");

  };



  return (

    <AuthContext.Provider
  value={{
    user,
    token,
    login,
    logout,
    authLoading
  }}
>

      {children}

    </AuthContext.Provider>

  );

}



export const useAuth = () =>
  useContext(AuthContext);