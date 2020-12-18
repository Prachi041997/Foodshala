const Resturant = require('../../models/resturant');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const expressjwt = require('express-jwt');
const formidable = require('formidable');
const fs = require('fs')
exports.signup = (req, res) => {

    let form = formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({
                errors: "Problem with image"
            })
        }
        const { name, email, phone, pin, city, address1, address2, description,  avgcost, password, deliveryRadius, type } = fields;
        // fields.resturant_info = req.params.resturantId;
        // if (!name || !description || !type || !pin || !city ||
        //     !address1 || !address2 || !email || !phone || !avgcost || !password || !deliveryRadius) {
        //     return res.status(400).json({
        //         errors: "Please fill all the fields"
        //     })
        // }

        console.log(fields);
        let resturant = new Resturant(fields);
        // product.resturant_info = req.params.resturantId;
        if (file.photo) {
            if (file.photo.size > 300000) {
                return res.status(400).json({
                    errors: "File too big"
                })
            }
            resturant.photo.data = fs.readFileSync(file.photo.path);
            resturant.photo.contentType = file.photo.type;

        }
        resturant.save((err, resturant) => {
            if (err) {
                console.log(err);
                return res.status(400).json({
                    error: err
                })
            }
            //create token
            const token = jwt.sign({ _id: resturant._id }, 'cat')
            //put token into cookie
            res.cookie("token", token, { expire: new Date() + 9999 })
            // res.cookie("resturantId",resturant._id, {expire: new Date() + 9999})

            //send data 
            res.json({
                token,
                resturant: {
                    id: resturant._id,
                    email: resturant.email,
                    name: resturant.name
                }
            })
      
        })
    })
}
exports.signin = (req, res) => {
            const errors = validationResult(req);
            console.log('lab');

            console.log(errors);
            if (!errors.isEmpty()) {
                console.log(errors.array());
                return res.status(422).json({ error: errors.array() });
            }
            const { email, password } = req.body;
            Resturant.findOne({ email }, (err, resturant) => {
                if (err) {
                    return res.status(400).json({
                        error: err
                    })
                }
                if (!resturant) {
                    return res.status(400).json({
                        error: 'resturant does not exist'
                    })
                }
                if (!resturant.authenticate(password)) {
                    return res.status(400).json({
                        error: 'Email and Password do not match'
                    })
                }
                //create token
                const token = jwt.sign({ _id: resturant._id }, 'cat')
                //put token into cookie
                res.cookie("token", token, { expire: new Date() + 9999 })
                // res.cookie("resturantId",resturant._id, {expire: new Date() + 9999})

                //send data 
                res.json({
                    token,
                    resturant: {
                        id: resturant._id,
                        email: resturant.email,
                        name: resturant.name,
                        role: resturant.role


                    }
                })
            })
        }
exports.signout = (req, res) => {
            res.clearCookie('token');
            res.clearCookie('userId');
            res.json({
                message: "user signout successfully"
            })
        }

exports.isSignedIn = expressjwt({
            secret: 'cat',
            algorithms: ['HS256'],
            userProperty: "authres",
        })

exports.isAuthenticated = (req, res, next) => {
            console.log('went');
            console.log(req.resprofile);
            console.log(req.authres);
            let checker = req.resprofile && req.authres && req.resprofile._id == req.authres._id; //auth in req.auth is userproperty value in isSignedIn middleware

            if (!checker) {
                return res.status(403).json({
                    err: "ACCESS DENIED Resturant"
                })
            }
            next();
        }
