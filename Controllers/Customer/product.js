const Resturant = require('../../models/resturant');
const Product = require('../../models/product');
const resturant = require('../../models/resturant');
exports.getProductById = (req, res, next, id)=> {
    console.log(id);
    Product.findById(id)
    .then((product)=> {
        req.product = product;
        next();
    })
}
exports.getResturantProducts = (req, res)=> {
    console.log('hydygg')
    Resturant.findOne({_id:req.params.resturantId})
    .select(['products'])
    .populate({path:'products', select:'-photo'})
    .exec((err, products)=> {
        if(err){
            return res.json({
                error: err
            })
        }
      return res.json(products)
    })
}

exports.getAllResturants = (req, res)=> {
    const projection = { _id: 0, name: 1 };
    Resturant.find()
    .select(["_id", "name", 'avgcost', 'description'])
    .then(resturants=> {
       res.json({
           resturants
       })
    })
    .catch(err=> {
        console.log(err);
    })
}

exports.getProductphoto =  (req, res, next)=> {
    console.log( req.product.photo.contentType);
    if(req.product.photo.data) {
        res.set("Content-Type", req.product.photo.contentType);
        return res.send(req.product.photo.data)
    }
    next();
}
exports.getResturantsbyType = (req,res)=>{
    console.log(req.params);
      Resturant.find({type: req.params.type})
      .select(["_id", "name", 'avgcost', 'description'])
      .then(resturants=> {
          console.log(resturants);
          return res.json(resturants)
      }).catch(err=> console.log(err))
}