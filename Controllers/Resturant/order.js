const Resturant = require('../../models/resturant');
const Order = require('../../models/order');
exports.getOrders = (req, res)=> {
   Resturant.findOne({_id:req.params.resturantId})
   .select(['orders'])
   .populate({path: 'orders', populate: {
       path: 'user_info',
       populate: [
           {path: 'user_info'},
           {path: 'products'}
       ]
   }})
   .exec((err, orders)=> {
       console.log(orders);
       console.log(err);
       return res.json(orders);
    //    Order.findOne({_id: or})
   })
}