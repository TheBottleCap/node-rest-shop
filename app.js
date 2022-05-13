const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

//connect to mongoose
mongoose.connect(
    'mongodb+srv://aviral:' +
    process.env.MONGO_ATLAS_PW+ 
    '@node-rest-shop.slfof.mongodb.net/node-rest-shop?retryWrites=true&w=majority');

mongoose.Promise = global.Promise;


//morgan will log the requests in the terminal so that we could understand what all things are happening here.
app.use(morgan('dev'));
//extracts data and makes it easier for us to understand
app.use(bodyParser.urlencoded({extended: false})); // true: extended encoded bodies and false is simple encoded data
app.use(bodyParser.json());

//CORS error means access is not allowed to control blah blah
//b7ut since now we have mentioned it so there's no point occuring the error
app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin', '*'); // * means koi se bhi page se access kar sakte ho
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
      );

    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods',"PUT, POST, PATCH, DELETE, GET");
        res.status(200).json({});
    }
    next();
});

// middleware
// app.use((req, res, next) => {

//     res.status(200).json({
//         message: 'it works!'
//     });

// });

app.use('/orders', orderRoutes)
app.use('/products', productRoutes) // anything requested to /products will be forwrded to prouct route waali file

//error handeling below middle ware only handles if the error is in the baove requests 
app.use((req, res, next)=>{
    const error = new Error('Not Found');
    error.status= 404;
    next(error);
});

// this middleware handles all the error requests which are occuring
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: "url theek kar lomdike"
        }
    });
});

module.exports = app;