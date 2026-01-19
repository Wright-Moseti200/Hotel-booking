let express = require("express");
const { login, signup, getbookings, booking, registerhotel,paymentStripe } = require("../controllers/userController");
let userRouter = express.Router();

userRouter.post("/login",login);
userRouter.post("/signup",signup);
userRouter.get("/getbooking",getbookings);
userRouter.post("/booking",booking);
userRouter.post("/registerhotel",registerhotel);
userRouter.post("/stripepayment",paymentStripe);
module.exports = {userRouter};
