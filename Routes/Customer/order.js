const express = require('express');
const { createOrder } = require('../../Controllers/Customer/order');
const { getCustomerById } = require('../../Controllers/Customer/user');
const {isSignedIn, isAuthenticated} = require('../../Controllers/Customer/auth')
const router = express.Router();
router.param("userId", getCustomerById );
router.post('/order/create/:resturantId/:userId',isSignedIn,isAuthenticated,createOrder )

module.exports  = router;

