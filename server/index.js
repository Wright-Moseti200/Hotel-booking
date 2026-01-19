let express = require("express");
let app = express()
let cookieparser = require("cookie-parser");
let rateLimit = require("express-rate-limit");
let cors = require("cors");
const { connectDB } = require("./config/config");
const { userRouter } = require("./routes/userRoutes");
let port = 4000;
let limit = rateLimit({
    windowMs:10*60*1000,
    max:100
});
app.set("trust proxy",1);

app.use([express.json(),cookieparser(),limit,cors({origin:"http://localhost:5173/",credentials:true})]);

connectDB()
app.get("/",(req,res)=>{
    res.send("Express server is running");
});

app.use("/api/user",userRouter);

app.listen(port,()=>{
console.log(`Server is running on port ${port}`);
});