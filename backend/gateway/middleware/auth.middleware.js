import redis from "../../shared/redis/redis.js";

const protect = async (req, res, next) => {
  try {
    console.log("=== AUTH CHECK ===");
    console.log("Cookies:", req.cookies);

    const sessionId = req.cookies?.sessionId;
    console.log("Session ID:", sessionId);

    if (!sessionId) {
      console.log("❌ No sessionId cookie");
      return res.status(401).json({ message: "Unauthorized" });
    }

    const session = await redis.get(`session:${sessionId}`);
    console.log("Redis session:", session);

    if (!session) {
      console.log("❌ Session not found in Redis");
      return res.status(401).json({ message: "Session expired" });
    }

    req.user = JSON.parse(session);

    console.log("✅ User authenticated:", req.user);

    next();
  } catch (error) {
    console.error("❌ Auth middleware error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default protect;
