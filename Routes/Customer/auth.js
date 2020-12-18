const express = require('express');
const router = express.Router();
const Customer = require('../../models/customer');
const {check, validationResult} = require('express-validator');
const { signup, signin, signout } = require('../../Controllers/Customer/auth');

router.post('/signup', [
check('email')
.notEmpty()
.withMessage("Email is required")
.bail()
.isEmail()
.withMessage("Must be an email")
 .custom(value => {
  console.log(value);
  return Customer.findOne({email: value}).then(customer => {
    if (customer) {
      return Promise.reject('E-mail already in use');
    }
  })
}),

check('phone')
.notEmpty()
.withMessage("Phone is required")
 .custom(value => {
  console.log(value);
  return Customer.findOne({phone: value}).then(customer => {
    if (customer) {
      return Promise.reject('Phone number already in use');
    }
  })
}),

check('password')
.notEmpty()
.withMessage("Password is required")
.bail()
.isLength({min:3})
.withMessage("Password must be atleast 3 characters long"),

check('name')
.notEmpty()
.withMessage('Name is required'),

check('preference')
.notEmpty()
.withMessage('Field is required')

], signup);

router.post('/signin', [
    check('email')
    .notEmpty()
    .withMessage('Email is required'),

    check('password')  
    .notEmpty()
    .withMessage('Password is required')
],signin);

router.get('/signout', signout);


module.exports = router;