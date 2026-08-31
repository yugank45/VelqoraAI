import { auth, googleProvider } from "./utils/firebase";
import { signInWithPopup } from "firebase/auth";
import api from "./utils/axios";
import { useEffect } from "react";
import getCurrentUser from "./features/getCurrentUser.js";

function App() {
  useEffect(() => {
    const getUser = async () => {
      await getCurrentUser();
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
    <div className="w-full h-screen bg-black  flex items-center justify-center">
      <button
        className="bg-white text-black px-4 py-2 rounded-md "
        onClick={googleLogin}
      >
        Login
      </button>
    </div>
  );
}

export default App;
