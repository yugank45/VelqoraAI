import { auth, googleProvider } from "./utils/firebase";
import { signInWithPopup } from "firebase/auth";
import api from "./utils/axios";
import { useEffect } from "react";
import getCurrentUser from "./features/getCurrentUser.js";
import { useDispatch } from "react-redux";
import { setUserData } from "./redux/userSlice.js";
import Home from "./pages/Home.jsx";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    
    const getUser = async () => {
      const data = await getCurrentUser();
      dispatch(setUserData(data));
    };
    getUser();
  }, []);

  const handleLogin = async (token) => {
    try {
      const { data } = await api.post("/api/auth/login", { token });
      console.log("Login successful:", data);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const googleLogin = async () => {
    const data = await signInWithPopup(auth, googleProvider);
    const token = await data.user.getIdToken();
    console.log("Token:", token);
    await handleLogin(token);
    console.log(data);
  };

  return (
    <Home/>
  );
}

export default App;
