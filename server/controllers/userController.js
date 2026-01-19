let jwt = require("jsonwebtoken");
let bcrypt = require("bcrypt");
require("dotenv").config();
const { User } = require("../models/userSchema");
const { Booking } = require("../models/bookingSchema");
const { Hotel } = require("../models/hotelSchema");
let stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

//login 
let login = async(req,res)=>{
    try{
        let {email,password} = req.body;
        if(!email||!password){
            return res.status(400).json({
                success:false,
                message:"Enter all credentials"
            });
        }
        let userfirm = await User.findOne({email:email});
        if(!userfirm){
            return res.status(401).json({
                success:false,
                message:"User is not registered"
            });
        }
        let passcompare = await bcrypt.compare(password,userfirm.password);
        if(!passcompare){
            return res.status(401).json({
                success:false,
                message:"Password is incorrect"
            });
        }
        let payload = {
            user:{
                id:userfirm._id
            }
        };
        let token = jwt.sign(payload,process.env.JWT_PAS,{expiresIn:"1d"});
        res.cookie("token",token,{
            httpOnly:true,
            sameSite:"strict",
            maxAge:24*60*60*1000
        });
        return res.status(200).json({
            success:true,
            message:"logged in successfully"
        })
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

//signup
let signup = async(req,res)=>{
    try{
        let {username,email,password} = req.body;
        if(!username||!email||!password){
            return res.status(400).json({
                success:false,
                message:"Enter all credentials"
            });
        }
        let emailconfirm = await User.findOne({email:email});
        if(emailconfirm){
            return res.status(401).json({
                success:false,
                message:"Email is already registered"
            });
        }
        let hashedPassword = await bcrypt.hash(password,Number(process.env.BCRYPT_PAS));
        let newUser = new User({
            email:email,
            username:username,
            password:hashedPassword
        });
       let newUserData = await newUser.save();
       let payload = {
        user:{
            id:newUserData._id
        }
       }
       let token  = jwt.sign(payload,process.env.JWT_PAS,{expiresIn:"1d"});
       res.cookie("token",token,{
        httpOnly:true,
        sameSite:"strict",
        maxAge:24*60*60*1000
       });
       return res.status(200).json({
        success:true,
        message:"Signed Up successfully"
       });
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

// FIXED booking function
let booking = async(req, res) => {
    try {
        let { totalPrice, checkin, checkout, roomId, hotelId, guests } = req.body;
        
        if (!totalPrice || !checkin || !checkout || !roomId || !hotelId || !guests) {
            return res.status(400).json({
                success: false,
                message: "Missing required data"
            });
        }
        let booking = new Booking({
            user: req.user.id, 
            room: roomId,
            hotel: hotelId,
            checkInDate: checkin,
            checkOutDate: checkout,
            totalPrice: totalPrice,
            guests: guests
        });
        await booking.save();
        return res.status(200).json({
            success: true,
            message: "Booked successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// FIXED registerhotel function
let registerhotel = async(req, res) => { 
    try {
        let { name, address, city, contact } = req.body;
        if (!name || !address || !city || !contact) {
            return res.status(400).json({  
                success: false,
                message: "Enter all the credentials"
            });
        }
        let hotel = new Hotel({
            name: name,
            address: address,
            city: city,
            contact: contact,
            owner: req.user.id 
        });
        await hotel.save();
        return res.status(200).json({
            success: true,
            message: "Hotel registered successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// FIXED getbookings function
let getbookings = async(req, res) => {
    try {
        let bookings = await Booking.find({ user: req.user.id })
            .populate('hotel')
            .populate('room');
        
        if (bookings.length === 0) { 
            return res.status(404).json({
                success: false,
                message: "No bookings found"
            });
        }
        return res.status(200).json({
            success: true,
            bookings: bookings
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

let paymentStripe = async(req,res)=>{
    try{
        let {bookingId} = req.body;
        if(!bookingId){
            return res.status(404).json({
                success:false,
                message:"data not found"
            });
        }
        let user = await User.findOne({_id:req.user.id});
        let bookingdata = await Booking.findOne({_id:bookingId}).populate("user").populate("room").populate("hotel")
        let lineitems = bookingdata.map((element)=>({
            price_data:{
                currency:"KES",
                product_data:{
                    name:element.hotel.name
                },
                unit_amount:Math.round(element.totalPrice*100)
            },
            quantity:1
        }));
        let session = await stripe.checkout.sessions.create({
            payment_method_types:["card"],
            line_items:lineitems,
            mode:"payment",
            success_url:"",
            cancel_url:"",
            customer_email:user.email,
            metadata:{
                bookingId:bookingId
            }
        });
        if(!session){
            return res.status(404).json({
                success:false,
                message:"No session data"
            });
        }
        return res.status(200).json({
            success:true,
            message:"Payment successfull",
            url:session.url
        });
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

let stripeWebHook = (req,res)=>{
    try{
        let event;
        let signature = req.headers["stripe-signature"];
        let signing_secret = process.env.SIGNING_KEY;
        event = stripe.webhooks.constructEvent(req.body,signature,signing_secret);
        console.log(event.type);
        return res.status(200).json({
            success:true,
            message:"It works"
        });
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


module.exports = {login,signup,booking,paymentStripe,stripeWebHook,getbookings,registerhotel};