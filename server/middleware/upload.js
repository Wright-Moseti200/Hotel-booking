let multer = require("multer")
let cloudinary = require("cloudinary").v2
let {CloudinaryStorage} = require("multer-storage-cloudinary")

cloudinary.config({
    cloud_name:"",
    api_key:"",
    api_secret:""
});

let storage = new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:"Hotel Pictures",
        allowed_formats:["jpg","png","jpeg","gif"]
    }
});

let upload = multer({storage:storage,limits:{fileSize:10*1024*1024}});
module.exports = {upload};