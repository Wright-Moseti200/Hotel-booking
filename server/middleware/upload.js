let multer = require("multer")
let cloudinary = require("cloudinary").v2
let {CloudinaryStorage} = require("multer-storage-cloudinary")
require("dotenv").config();
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
});

let storage = new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:"Hotel Pictures",
        allowed_formats:["jpg","png","jpeg","gif"]
    }
});

let upload = multer({storage:storage,limits:{fileSize:15*1024*1024}});
module.exports = {upload};