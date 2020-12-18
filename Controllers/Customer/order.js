const Order = require('../../models/order');
const Resturant = require('../../models/resturant');
exports.createOrder = (req, res)=>{
    console.log(req.body)
    var objArray = [];
    req.body.products.map(p=>{
         let obj = {
             product: p._id,
             name: p.name,
             quntity:p.quantity,
             price: p.price,

         }
         objArray.push(obj);
    })
    Order.create({
        user_info: req.params.userId,
        resturant_info: req.params.resturantId,
        products: objArray,
        totalprice: req.body.totalprice
    }).then(createdOrder=> {
        console.log(createdOrder)
        Resturant.findById(createdOrder.resturant_info)
        .then(resturant=> {
           resturant.orders.push(createdOrder._id);
           resturant.save((err, data)=> {
               if(err){
                    return res.status(400).json({
                    errors: "some error occured"
                })
            }
           }) 
        })
       return res.json(createdOrder);
    })
}