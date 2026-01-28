let express = require("express");
const { login, signup, getbookings, booking, registerhotel, paymentStripe, mpesapayment, logout, gettoken, getrooms } = require("../controllers/userController");
const { auth } = require("../middleware/auth");
let userRouter = express.Router();

userRouter.post("/login", login);
userRouter.post("/signup", signup);
userRouter.get("/getbooking", auth, getbookings);
userRouter.post("/booking", auth, booking);
userRouter.post("/registerhotel", auth, registerhotel);
userRouter.post("/stripepayment", auth, paymentStripe);
userRouter.post("/mpesaPayment", auth, mpesapayment);
userRouter.get("/logout", logout);
userRouter.get("/gettoken", gettoken)
userRouter.get("/getrooms", getrooms)

module.exports = { userRouter };