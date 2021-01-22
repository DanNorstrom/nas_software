const express = require('express');
const dataRouter = express.Router();

const DataController = require('../controllers/data.controller')

// mounted on server on route /data

// calculates the NAS score for 1 patient
// implement date variable later using:'/patient_nas/:Date'
dataRouter.get('/patient_nas/:DATE', DataController.PatientNAS_on_date);


module.exports = dataRouter;