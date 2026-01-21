let express = require("express");
const { upload } = require("../middleware/upload");
const { uploadimages, addrooms, getroomlistings, getbooking } = require("../controllers/adminController");
const { auth } = require("../middleware/auth");
let adminRoutes = express.Router();

adminRoutes.get("/getbookings",getbooking);
adminRoutes.get("/getroomlistings",getroomlistings);
adminRoutes.post("/addrooms",auth,addrooms);
adminRoutes.post("/uploadimages",upload.array("images",5),uploadimages);

module.exports={adminRoutes};