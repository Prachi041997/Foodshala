const express = require('express');
const router = express.Router();
const Resturant = require('../../models/resturant');
const {check,validationResult, body} = require('express-validator');
const { signup, signin, signout } = require('../../Controllers/Resturant/auth');

router.post('/admin/signup', [
body('email')
.notEmpty()
.withMessage("Email is required")
.bail()
.isEmail()
.withMessage("Must be an email")
 .custom(value => {
  console.log(value);
  return Resturant.findOne({email: value}).then(resturant => {
    if (resturant) {
      return Promise.reject('E-mail already in use');
    }
  })
}),

body('phone')
.notEmpty()
.withMessage("Phone is required")
 .custom(value => {
  console.log(value);
  return Resturant.findOne({phone: value}).then(resturant => {
    if (resturant) {
      return Promise.reject('Phone number already in use');
    }
  })
}),

body('password')
.notEmpty()
.withMessage("Password is required")
.bail()
.isLength({min:3})
.withMessage("Password must be atleast 3 characters long"),

body('name')
.notEmpty()
.withMessage('Name is required'),

body('address1')
.notEmpty()
.withMessage('Address is required'),

body('address2')
.notEmpty()
.withMessage('Address is required'),

body('city')
.notEmpty()
.withMessage('City is required'),

body('pin')
.notEmpty()
.withMessage('PIN is required'),

body('avgcost')
.notEmpty()
.withMessage('Field is required'),

body('deliveryRadius')
.notEmpty()
.withMessage('Field is required'),

body('type')
.notEmpty()
.withMessage('Field is required')
], signup);

router.post('/admin/signin', [
    check('email')
    .notEmpty()
    .withMessage('Email is required'),

    check('password')
    .notEmpty()
    .withMessage('Password is required')
],signin);

router.get('/signout', signout);


module.exports = router;