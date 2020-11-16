const express = require('express');
const postRouter = express.Router();
const STAGE_1 = require('../models/stage1nas.model');

/* ### NOTES ###
app = express.Router()
app.METHOD(PATH, HANDLER)

takes the mongoose STAGE_1.model = P


find() returns a promise, returning JSON format
*/


/* Get all Posts */
postRouter.get('/', (req, res, next) => {
    STAGE_1.find({} , function(err, result){
        if(err){
            res.status(400).send({
                'success': false,
                'error': err.message
            });
        }
        res.status(200).send({
            'success': true,
            'data': result
        });
    });
});

/* Get Single Post */
postRouter.get("/:post_id", (req, res, next) => {
    STAGE_1.findById(req.params.post_id, function (err, result) {
        if(err){
             res.status(400).send({
               success: false,
               error: err.message
             });
        }
        res.status(200).send({
            success: true,
            data: result
        });
     });
});


/* Add Single Post */
postRouter.post("/", (req, res, next) => {
  let newPost = { 
    PATIENT_ID: req.body.PATIENT_ID,
    ROOM_NR: req.body.ROOM_NR,
    WORK_SHIFT: req.body.WORK_SHIFT,
    TIME_IN: req.body.TIME_IN,
    TIME_OUT: req.body.TIME_OUT,
    DATE: req.body.DATE,
    BA1A: BA1A,
    BA1B: BA1B,
    BA1C: BA1C,
    BA2: BA2,
    BA3: BA3,
    BA4A: BA4A,
    BA4B: BA4B,
    BA4C: BA4C,
    BA5: BA5,
    BA6A: BA6A,
    BA6B: BA6B,
    BA6C: BA6C,
    BA6D: BA6D,
    BA7A: BA7A,
    BA7B: BA7B,
    BA8A: BA8A,
    BA8B: BA8B,
    BA8C: BA8C,
    BA9: BA9,
    BA10: BA10,
    BA11: BA11,
    BA12: BA12,
    BA13: BA13,
    BA14: BA14,
    BA15: BA15,
    BA16: BA16,
    BA17: BA17,
    BA18: BA18,
    BA19: BA19,
    BA20: BA20,
    BA21: BA21,
    BA22: BA22,
    BA23: BA23
  };
   STAGE_1.create(newPost, function(err, result) {
    if(err){
        res.status(400).send({
          success: false,
          error: err.message
        });
    }
      res.status(201).send({
        success: true,
        data: result,
        message: "Post created successfully"
      });
  });
});

/* Edit Single Post */
postRouter.patch("/:post_id", (req, res, next) => {
  let fieldsToUpdate = req.body;
  STAGE_1.findByIdAndUpdate(req.params.post_id,{ $set: fieldsToUpdate }, { new: true },  function (err, result) {
      if(err){
          res.status(400).send({
             success: false,
            error: err.message
            });
      }
      res.status(200).send({
        success: true,
        data: result,
        message: "Post updated successfully"
        });
  });
});

/* Delete Single Post */
postRouter.delete("/:post_id", (req, res, next) => {
  STAGE_1.findByIdAndDelete(req.params.post_id, function(err, result){
      if(err){
        res.status(400).send({
          success: false,
          error: err.message
        });
      }
    res.status(200).send({
      success: true,
      data: result,
      message: "Post deleted successfully"
    });
  });
});

module.exports = postRouter;