const formidable = require('formidable');
const Product = require('../../models/product');
const Resturant = require('../../models/resturant');
const fs = require('fs')

exports.createProduct = (req, res)=> {
    let form = formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, file)=> {
        if(err) {
            return res.status(400).json({
                errors: "Problem with image"
            })
        }
    const {name, description, price, category} = fields;
    fields.resturant_info = req.params.resturantId;
        if(!name || !description || !price  || !category) {
            return res.status(400).json({
                errors: "Please fill all the fields"
            })
        }

        console.log(fields);
        let product  = new Product(fields);
        // product.resturant_info = req.params.resturantId;
        if(file.photo) {
            if(file.photo.size> 3000000) {
                return res.status(400).json({
                    errors: "File too big"
                }) 
            }
         product.photo.data = fs.readFileSync(file.photo.path);
         product.photo.contentType = file.photo.type;

        }

        //save to db
        product.save((err, product)=> {
            if(err){
                return res.status(400).json({
                    errors: "saving product failed"
                }) 
            }
            Resturant.findById(fields.resturant_info)
            .then((resturant)=> {
                console.log(resturant);
                resturant.products.push(product._id);
                resturant.save((err, resturant)=> {
                    if(err){
                        return res.status(400).json({
                            errors: "saving product failed"
                        }) 
                    } 
                })
            })
           return res.json(product);
        })
    })
}
