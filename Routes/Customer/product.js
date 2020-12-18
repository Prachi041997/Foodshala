const express = require('express');
const { getResturantProducts, getProductById, getProductphoto, getAllResturants, getResturantsbyType } = require('../../Controllers/Customer/product');
const { getResturantById } = require('../../Controllers/Resturant/user');
const router = express.Router();

router.param("productId", getProductById);

router.get('/getProducts/:resturantId', getResturantProducts)
router.get("/product/photo/:productId", getProductphoto)
router.get('/getallresturants', getAllResturants)
router.get('/getresturants/type/:type', getResturantsbyType)

module.exports = router;