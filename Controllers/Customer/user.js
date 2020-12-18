const Customer = require('../../models/customer');
exports.getCustomerById = (req, res,next, id)=> {
    Customer.findById(id)
    .exec((err, customer)=> {
        if(err) {
            return res.status(400).json({error: err})
        }
        if(!customer) {
            return res.status(400).json({
                error: "Customer Does no exists"
            })
        }
        req.profile = customer;
        next();
    })
}