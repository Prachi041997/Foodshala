const express = require('express');
const { isSignedIn, isAuthenticated } = require('../../Controllers/Resturant/auth');
const { getOrders } = require('../../Controllers/Resturant/order');
const { getResturantById } = require('../../Controllers/Resturant/user');
const router = express.Router();

router.param("resturantId", getResturantById);


router.get('/getorders/:resturantId',isSignedIn, isAuthenticated, getOrders);

module.exports = router;