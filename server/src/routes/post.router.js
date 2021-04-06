const express = require('express');
const postRouter = express.Router();
const STAGE_1 = require('../models/stage1nas.model');
const STAGE_2 = require('../models/stage2nas.model');
/* ### NOTES ###
app = express.Router()
app.METHOD(PATH, HANDLER)

takes the mongoose STAGE_1.model = P


find() returns a promise, returning JSON format
*/


/* Get all Posts */
postRouter.get('/stage1raw/', (req, res, next) => {
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

postRouter.get('/stage2raw/', (req, res, next) => {
  STAGE_2.find({} , function(err, result){
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

// req.body holds parameters that are sent up from the client as part of a POST request
// let is only available in current block scope { }.
/* Add Single Post to stage1 DB*/
postRouter.post("/stage1/", (req, res, next) => {

  // console.log("WE ARE TRYING TO POST TO STAGE1 FROM CLIENT");

  let newPost = { 
    PATIENT_ID: req.body.PATIENT_ID,
    ROOM_NR: req.body.ROOM_NR,
    WORK_SHIFT: req.body.WORK_SHIFT,
    TIME_IN: req.body.TIME_IN,
    TIME_OUT: req.body.TIME_OUT,
    DATE: req.body.DATE,
    BA1A: req.body.BA1A,
    BA1B: req.body.BA1B,
    BA1C: req.body.BA1C,
    BA2:  req.body.BA2,
    BA3:  req.body.BA3,
    BA4A: req.body.BA4A,
    BA4B: req.body.BA4B,
    BA4C: req.body.BA4C,
    BA5:  req.body.BA5,
    BA6A: req.body.BA6A,
    BA6B: req.body.BA6B,
    BA6C: req.body.BA6C,
    BA6D: req.body.BA6D,
    BA7A: req.body.BA7A,
    BA7B: req.body.BA7B,
    BA8A: req.body.BA8A,
    BA8B: req.body.BA8B,
    BA8C: req.body.BA8C,
    BA9:  req.body.BA9,
    BA10: req.body.BA10,
    BA11: req.body.BA11,
    BA12: req.body.BA12,
    BA13: req.body.BA13,
    BA14: req.body.BA14,
    BA15: req.body.BA15,
    BA16: req.body.BA16,
    BA17: req.body.BA17,
    BA18: req.body.BA18,
    BA19: req.body.BA19,
    BA20: req.body.BA20,
    BA21: req.body.BA21,
    BA22: req.body.BA22,
    BA23: req.body.BA23
  };

   STAGE_1.create(newPost, function(err, result) {
    if(err){
      res.status(400).send({
        success: false,
        error: err.message,
        message: "post wasnt created"
      });
      return; // dont run other code after error
    }
    res.status(201).send({
      success: true,
      data: result,
      message: "Post created successfully"
    });
  });
});


postRouter.post("/modifyStage1/", (req, res, next) => {

  bulkUpdateOperations = []

  for (const dataObj of req.body) {
    bulkUpdateOperations.push({
      'replaceOne': {
        'filter': {'_id': dataObj._id},
        'replacement': dataObj
      }
    });
  }

  STAGE_1.bulkWrite(bulkUpdateOperations, function(err, result) {
  // STAGE_1.findByIdAndUpdate
  // STAGE_1.create( req.body, function(err, result) {
    console.log(err)
    console.log(result)
    if(err){
      res.status(400).send({
        success: false,
        error: err.message,
        message: "posts not updated"
      });
      return; // dont run other code after error
  }
    res.status(201).send({
      success: true,
      data: result,
      message: "Posts updated successfully"
    });
  });
});

postRouter.post("/modifyStage2/", (req, res, next) => {

  bulkUpdateOperations = []

  for (const dataObj of req.body) {
    bulkUpdateOperations.push({
      'replaceOne': {
        'filter': {'_id': dataObj._id},
        'replacement': dataObj
      }
    });
  }

  STAGE_2.bulkWrite(bulkUpdateOperations, function(err, result) {
  // STAGE_1.findByIdAndUpdate
  // STAGE_1.create( req.body, function(err, result) {
    console.log(err)
    console.log(result)
    if(err){
      res.status(400).send({
        success: false,
        error: err.message,
        message: "posts not updated"
      });
      return; // dont run other code after error
  }
    res.status(201).send({
      success: true,
      data: result,
      message: "Posts updated successfully"
    });
  });
});

/* Add Single Post to stage2 DB*/
postRouter.post("/stage2/", (req, res, next) => {

  // console.log("WE ARE TRYING TO POST TO STAGE2 FROM CLIENT");

  let newPost = { 
    Personnel_D: req.body.Personnel_D,
    Personnel_A: req.body.Personnel_A,
    Personnel_N: req.body.Personnel_N,
    DATE: req.body.DATE
  };
  
   STAGE_2.create(newPost, function(err, result) {
    if(err){
      res.status(400).send({
        success: false,
        error: err.message,
        message: "post was not created"
      });
      return; // dont run other code after error
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