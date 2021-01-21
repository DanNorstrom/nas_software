const express = require('express');
const dataRouter = express.Router();

const STAGE_1 = require('../models/stage1nas.model');
const STAGE_2 = require('../models/stage2nas.model');

dataRouter.get('/patient_nas/:Date', (req, res, next) => {
    // req.params.Date
    STAGE_1.find({} , function(err, result){
        if(err){
            res.status(400).send({
                'success': false,
                'error': err.message
            });
        }
        res.status(200).send({
            'success': true,
            'data': result,
        });
    });
});

module.exports = dataRouter;