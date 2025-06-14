// // import { v2 as cloudinary } from 'cloudinary';
// const express = require("express");
// const app = express();
// const cloudinary = require("");
// const multer = require("multer");
// const { ClodinaryStorage } = require("multer-storage-cloudinary");
// const storage = new ClodinaryStorage({
//     cloudinary: cloudinary,
//     folder: "BANK",
//     allowedFormats: ["jpg", "png",'jpeg'],
//     transformation : [{width:500, height:500, crop:"limit"}],

// });

// const upload = multer({ storage: cloudinaryStorage() });




// const cloudinary = require('cloudinary').v2;
// require('dotenv').config();
// (async function () {

//     // Configuration
//     cloudinary.config({
//         cloud_name: 'dyilzwziv',
//         api_key: '215441275658421',
//         api_secret: 'pMiC5-j_zWwvmOlkgohQ62cyQsY' // Click 'View API Keys' above to copy your API secret
//     });

//     // Upload an image
//     const uploadResult = await cloudinary.uploader
//         .upload(
//             'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
//             public_id: 'shoes',
//         }
//         )
//         .catch((error) => {
//             console.log(error);
//         });

//     console.log(uploadResult);

//     // Optimize delivery by resizing and applying auto-format and auto-quality
//     const optimizeUrl = cloudinary.url('shoes', {
//         fetch_format: 'auto',
//         quality: 'auto'
//     });

//     console.log(optimizeUrl);

//     // Transform the image: auto-crop to square aspect_ratio
//     const autoCropUrl = cloudinary.url('shoes', {
//         crop: 'auto',
//         gravity: 'auto',
//         width: 500,
//         height: 500,
//     });

//     console.log(autoCropUrl);
// })();