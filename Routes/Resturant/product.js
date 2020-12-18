const express = require('express');
const router = express.Router();
const { isSignedIn, isAuthenticated } = require('../../Controllers/Resturant/auth');
const { createProduct } = require('../../Controllers/Resturant/product');
const { getResturantById, uploadResturantPhoto, getResturantPhoto } = require('../../Controllers/Resturant/user');
const { route } = require('./auth');



router.param("resturantId", getResturantById);

router.post('/admin/product/create/:resturantId', isSignedIn, isAuthenticated ,createProduct)

router.post('/uploadphoto/resturant/:id',isSignedIn,isAuthenticated,uploadResturantPhoto);
router.get('/resturant/photo/:resturantId', getResturantPhoto)


module.exports = router