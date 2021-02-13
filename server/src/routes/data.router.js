const express = require('express');
const dataRouter = express.Router();

const DataController = require('../controllers/data.controller')

// mounted on server on route /data

// calculates the NAS score for 1 patient
// implement date variable later using:'/patient_nas/:Date'
dataRouter.get('/patient_weights/:DATE1/:DATE2', DataController.PatientWeights_on_dates);
dataRouter.get('/patient_nas/:DATE', DataController.PatientNAS_on_date);
dataRouter.get('/nas/:DATE1/:DATE2', DataController.NAS);
dataRouter.get('/personnel_count/:DATE/', DataController.Personnel_count);
dataRouter.get('/ReportPatientPersonnelAvgPerShift/:DATE1/:DATE2', DataController.ReportPatientPersonnelAvgPerShift);


module.exports = dataRouter;