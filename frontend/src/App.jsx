import React from "react";
import { auth, googleProvider } from "./utils/firebase";
import { signInWithPopup } from "firebase/auth";

function App() {
  const googleLogin = async () => {
    const data = await signInWithPopup(auth, googleProvider);
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
