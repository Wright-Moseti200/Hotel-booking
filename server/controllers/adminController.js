const { Booking } = require("../models/bookingSchema");
const { Hotel } = require("../models/hotelSchema");
const { Room } = require("../models/roomSchema");

//getbooking
let getbooking = async(req,res)=>{
    try{
        let bookings = await Booking.find({});
        if(!bookings){
            return res.status(404).json({
                success:false,
                message:"No data found"
            });
        }
        return res.status(200).json({
            success:true,
            bookings:bookings
        });
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

//getroomlisting
let getroomlistings = async(req,res)=>{
    try{
        let rooms = await Room.find({}).populate("hotel");
        if(!rooms){
             return res.status(404).json({
                success:false,
                message:"No data found"
            });
        }
         return res.status(200).json({
            success:true,
            rooms:rooms
        });
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

//addrooms
let addrooms = async(req,res)=>{
    try{
        let {roomType,pricePerNight,amenities,images} = req.body;
        if(!roomType||!pricePerNight||!amenities||!images){
            return res.status(404).json({
                success:false,
                message:"Enter all valid data"
            });
        }
        let hoteldata = await Hotel.findOne({owner:req.user.id}).populate("owner");
        if(!hoteldata){
            return res.status(404).json({
                success:false,
                message:"no data found"
            });
        }
        let rooms = new Room({
            hotel:hoteldata._id,
            roomType:roomType,
            pricePerNight:pricePerNight,
            amenities:amenities,
            images:images,
        });
        await rooms.save();
        return res.status(200).json({
            success:true,
            message:"Room created successfully created"
        })
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

//upload images
let uploadimages = (req,res)=>{
    try{
        if(!req.files){
            return res.status(404).json({
               success:false,
               message:"no files found"
            });
        }
        let urls=req.files.map((file)=>file.path);
        if(!urls){
            res.status(404).json({
                success:false,
                message:"No urls found"
            });
        }
        return res.status(200).json({
            success:true,
            message:"Images uploaded successfuly",
            urls:urls
        });
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        }); 
    }
}

module.exports={getbooking,getroomlistings,addrooms,uploadimages}