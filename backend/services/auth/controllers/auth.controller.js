
import { getAuth } from "firebase-admin/auth";
import { app } from "../config/firebase.js";
import crypto from "crypto";
import User from "../models/user.model.js";

export const login = async (req, res) => {
  try {
    const { token } = req.body;

    const decoded = await getAuth().verifyIdToken(token);

    console.log("Firebase user:", decoded.uid);

    let user = await User.findOne({
      firebaseUid: decoded.uid,
    });

    if (!user) {
      user = await User.create({
        firebaseUid: decoded.uid,
        email: decoded.email,
        name: decoded.name,
        avatar: decoded.picture,
      });
    }

    const sessionId = crypto.randomUUID();

    res.cookie("sessionId", sessionId, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Login successful",
      user,
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return res.status(401).json({
      error: "Invalid token",
      details: error.message,
    });
  }
};
