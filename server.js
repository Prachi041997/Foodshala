const express = require('express');
const mongoose = require('mongoose');
const path = require('path')
const cors = require('cors');
const bodyparser = require('body-parser');
const cookieparser = require('cookie-parser');
const resAuthRoute = require('./Routes/Resturant/auth')
const customerAuthRoute = require('./Routes/Customer/auth')
const adminproductRoute = require('./Routes/Resturant/product')
const customerproductRoute = require('./Routes/Customer/product')
const customerorderRoute = require('./Routes/Customer/order');
const adminorderRoute = require('./Routes/Resturant/order');



const app = express();
const URI = 'mongodb+srv://prachi:prachi123@prachi-324ca.mongodb.net/FoodShala?retryWrites=true&w=majority'

app.use(cors());
app.use(bodyparser.json());
app.use(cookieparser());
// app.use('/', route);
app.use('/api', resAuthRoute);
app.use('/api', customerAuthRoute);
app.use('/api', adminproductRoute);
app.use('/api', customerproductRoute)
app.use('/api', customerorderRoute);
app.use('/api', adminorderRoute);



 


// app.use('/api', routeS);
console.log(process.env.MONGODB_URI);
mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true }).then(()=> {
    console.log('Mongodb connected')
}).catch(err=> console.log(err))



const port = process.env.PORT || 3030;
if(process.env.NODE_ENV === 'production' ||  process.env.NODE_ENV === 'staging'){
    app.use(express.static('client/build'))

    app.get('*', (req, res)=> {
        res.sendFile(path.join(__dirname + '/client/build/index.html'));
    })
}
app.listen(port, ()=> {
    console.log(`server running on ${port}`)
});   