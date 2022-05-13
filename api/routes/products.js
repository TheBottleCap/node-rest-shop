const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Product = require("../models/product");

// get is the method which will handle all the incoming get requests
router.get("/", (req, res, next) => {
  Product.find()
    .select("name price _id")
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        products: docs.map((doc) => {
            // we are returning this because we only want specific information and not that 'v' thing in the output
          return {
            name: doc.name,
            price: doc.price,
            id: doc._id,
            request: {
              type: "GET",
              url: "http://localhost:3000/products" + doc._id,
            },
          };
        }),
      };

      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json("problem fetching values");
    });
});
//in the above get request we are returning all the products we have

router.post("/", (req, res, next) => {
  //instance of the model
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
  });
  product
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "product created successfully",
        createdProduct: {
            name: result.name,
            price: result.price,
            _id: result._id,
            request:{
                type: 'GET',
                url: "http://localhost:3000/products" + result._id
            }
        }
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    }); //store in database
});

router.get("/:productId", (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    .select('name price _id')
    .exec()
    .then((doc) => {
      console.log("from Database", doc);
      if (doc) {
        res.status(200).json({
            product: doc,
            request:{
                type: 'GET',
                url: "http://localhost:3000/products" + doc._id
            }
        });
      } else {
        res.status(404).json({ message: "no Valid id found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.patch("/:productId", (req, res, next) => {
  const id = req.params.productId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }

  Product.updateOne({ _id: id }, { $set: updateOps })
    .exec()
    .then((result) => {
      res.status(200).json({
          message: "Product Updated",
          request:{
            type: 'GET',
            url: "http://localhost:3000/products" + result._id
        }
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "not able to update object" });
    });
});

//delete meinn we are checking also ki whetehr it is empty or not... if empty hai toh return no daa else return data
router.delete("/:productId", (req, res, next) => {
  const id = req.params.productId;
  Product.remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({ 
          message: "product deleted",
          request:{
            type: 'POST',
            url: "http://localhost:3000/products" + result._id
            ,body: {name: "String", price: "Number"}    
        }
        });
    })
    .catch((err) => {
      res.status(200).json({
        error: err,
      });
    }); //remove all the object which fulfills the criteria
});

module.exports = router;
