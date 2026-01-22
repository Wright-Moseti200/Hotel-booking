let jwt = require("jsonwebtoken");
let bcrypt = require("bcrypt");
require("dotenv").config();
const { User } = require("../models/userSchema");
const { Booking } = require("../models/bookingSchema");
const { Hotel } = require("../models/hotelSchema");
let stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
let IntaSend = require("intasend-node");
let intasend = new IntaSend(process.env.INTASEND_PUBLIC_KEY,process.env.INTASEND_SECRET_KEY,process.env.TEST_STATUS);
let nodemailer = require("nodemailer");
const { Room } = require("../models/roomSchema");

let transporter = nodemailer.createTransport({
    host:process.env.HOST,
    port:587,
    secure:false,
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASS
    }
});

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
      return  res.status(500).json({
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
      return  res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

// booking function
let booking = async(req,res) => {
    try {
        let { totalPrice, checkin, checkout, roomId, hotelId, guests } = req.body;
        
        if (!totalPrice || !checkin || !checkout || !roomId || !hotelId || !guests) {
            return res.status(400).json({
                success: false,
                message: "Missing required data"
            });
        }
        
        await Room.findOneAndUpdate({_id:roomId},{isAvailable:false});

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
      return  res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// registerhotel function
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
      return  res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

//getbookings function
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
      return  res.status(500).json({
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
        let bookingdatafind = await Booking.findOne({_id:bookingId}).populate("user").populate("room").populate("hotel");
        let bookingdata = [bookingdatafind];
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
            success_url:"http://localhost:5173/success",
            cancel_url:"http://localhost:5173/cancel",
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
     return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

//stripe webhook
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
      return  res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

//logout
let logout = async(req,res)=>{
    try{
        res.clearCookie("token");
      return  res.status(200).json({
            success:true,
            message:"logged out successfully"
        });
    }
    catch(error){
      return  res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

//mpesapayment 
let mpesapayment = async(req,res)=>{
    try{
        let {bookingid,phonenumber,} = req.body;
        if(!bookingid||!phonenumber){
            return res.status(404).json({
                success:true,
                message:"No data found"
            });
        }
        let bookings = await Booking.findOne({_id:bookingid});
        if(!bookings){
            return res.status(404).json({
                success:false,
                message:"booking not found"
            });
        }
       let user = await User.findOne({_id:req.user.id});
       if(!user){
        res.status(401).json({
            success:false,
            message:"User not found"
        });
       }
       let response = await intasend.collection().mpesaStkPush({
            phone_number:phonenumber,
            email:user.email,
            amount:bookings.totalPrice,
            currency:"KES",
            api_ref:bookingid
        });
       return res.status(200).json({
        success:true,
        message:"Payment Successful",
        data:response
       });
    }
    catch(error){
        if (Buffer.isBuffer(error)) {
        const decodedError = JSON.parse(error.toString('utf8'));
        console.log("Decoded IntaSend Error:", decodedError);
    } else {
        console.log("Error:", error.message);
    }
    return res.status(500).json({
        success:false,
        message:error
    })
    }
}

//mpesawebhook
let mpesawebhook = async(req,res)=>{
    try{
        let payload = req.body;
        if(payload.challenge!==process.env.INTASEND_CHALLENGE){
            return res.status(401).json({
                success:false,
                message:"Unauthorized"
            });
        }
        if(payload.invoice_id&&payload.state){
            if(payload.state==="COMPLETE"){
                let bookingid = payload.api_ref;
                if(!bookingid){
                    return res.status(404).json({
                        success:false,
                        message:"no bookingid"
                    });
                }
              let booking = await Booking.findByIdAndUpdate({_id:bookingid},{paymentMethod:"Mpesa",isPaid:true}).populate("user").populate("room").populate("hotel");
              transporter.sendMail({
                from:process.env.EMAIL,
                to:payload.email,
                subject:"Hotel Booking Details",
                html:
                `
                <h1>Your Hotel Booking Details:</h1>
                <br/>
                <p>Thank you ffor your booking!Here are your details:</p>
                <br/>
                <p>Id:${booking._id}</p>
                <p>${booking.hotel.name}</p>
                <p>${booking.hotel.address} ${booking.hotel.city}</p>
                <p>${Date.now()}</p>
                <p>${booking.totalPrice}</p>
                <br/>
                <p>We look forward to welcoming you!</p>
                <br/>
                <p>If you nedd to make any changes, feelfree to contact us.</p>
                `
              });
                return res.status(404).json({
                    success:true,
                    message:"Payment succcessful"
                });
            }
        }
    }
    catch(error){
        return res.status(500).json({
        success:false,
        message:error
    }); 
    }
}

module.exports = {login,signup,booking,paymentStripe,stripeWebHook,getbookings,registerhotel,logout,mpesapayment,mpesawebhook};