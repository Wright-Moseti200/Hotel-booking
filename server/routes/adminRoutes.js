let express = require("express");
const { upload } = require("../middleware/upload");
const { uploadimages, addrooms, getroomlistings, getbooking, updateroomstatus } = require("../controllers/adminController");
const { auth } = require("../middleware/auth");
let adminRoutes = express.Router();

adminRoutes.get("/getbookings", getbooking);
adminRoutes.get("/getroomlistings", getroomlistings);
adminRoutes.post("/addrooms", auth, addrooms);
adminRoutes.post("/uploadimages", upload.array("images", 5), uploadimages);
adminRoutes.post("/updateroomstatus", auth, updateroomstatus);

module.exports = { adminRoutes };