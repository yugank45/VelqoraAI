
import React from "react";

import { auth, googleProvider } from "../utils/firebase";
import { signInWithPopup } from "firebase/auth";
import api from "../utils/axios";
import { FcGoogle } from "react-icons/fc";
import { useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { useDispatch } from "react-redux";

function Home() {
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // console.log("User Data from Redux:", userData);
  const handleLogin = async (token) => {
    try {
      const { data } = await api.post("/api/auth/login", { token });
      console.log("Login successful:", data);
       dispatch(setUserData(data));
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const googleLogin = async () => {
    try {
      const data = await signInWithPopup(auth, googleProvider);

      const token = await data.user.getIdToken();

      console.log("Token:", token);

      await handleLogin(token);

      console.log(data);
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  return (
    <div className="h-screen flex bg-[#0d0f14] text-white overflow-hidden">

      {!userData && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

        <div className="w-[340px] bg-[#13151c] border border-white/[0.08] rounded-2xl p-7 flex flex-col gap-5">

          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-semibold">
              Welcome to VelqoraAI
            </h2>

            <p className="text-gray-400">
              Please login to continue using the app.
            </p>
          </div>

          <button
            onClick={googleLogin}
            className="w-full py-3 rounded-xl bg-white text-black font-medium hover:bg-gray-200 transition flex items-center justify-center gap-3"
          >
            <FcGoogle size={22} />
            <span>Continue with Google</span>
          </button>

        </div>

      </div>}
      

    </div>
  );
}

export default Home;

