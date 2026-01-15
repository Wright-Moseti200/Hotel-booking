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
        folder_name:"Hotel Pictures",
        allowed_formats:["jpg","png","jpeg","gif",""]
    }
});

let upload = multer({storage:storage});
module.exports = {upload};