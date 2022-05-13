const express = require('express');
const router = express.Router();

router.get('/',(req, res, next) =>{
    res.status(200).json({
        message: "orders fetched"
    });
});

router.post('/',(req, res, next) =>{
    const order = {
      productId: req.body.productId,
      quantity: req.body.quantity 
    };
    res.status(201).json({
        message: "orders created",
        order: order
    });
});

// getting info about individual order
router.get('/:orderId',(req, res, next) =>{

    if(req.params.orderId == 'special'){
        res.status(200).json({
            message: "order details",
            id: req.params.orderId
        });
    }else{
        res.status(200).json({
            message: "blah blah blah",
        });
    }

});

router.delete('/:orderId',(req, res, next) =>{

    res.status(200).json({
        message: "order deleted",
    });

});

module.exports = router;