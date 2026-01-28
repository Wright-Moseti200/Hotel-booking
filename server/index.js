let express = require("express");
let app = express()
let cookieparser = require("cookie-parser");
let rateLimit = require("express-rate-limit");
require("dotenv").config();
let cors = require("cors");
const { connectDB } = require("./config/config");
const { userRouter } = require("./routes/userRoutes");
const { stripeWebHook, mpesawebhook } = require("./controllers/userController");
const { adminRoutes } = require("./routes/adminRoutes");
const { auth } = require("./middleware/auth");

let port = 4000;
let limit = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 100
});
app.set("trust proxy", 1);
app.post("/webhook", express.raw({ type: "application/json" }), stripeWebHook);
app.post("/mpesaWebhook",express.json(), mpesawebhook);
app.use([express.json(), cookieparser(), limit, cors({ origin: ["http://localhost:5173", "http://localhost:5174"], credentials: true })]);

connectDB();
app.get("/", (req, res) => {
    res.send("Express server is running");
});

app.use("/api/user", userRouter);
app.use("/api/admin", adminRoutes);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});