const express = require('express');
const dataRouter = express.Router();

const DataController = require('../controllers/data.controller')

// mounted on server on route /data

// calculates the NAS score for 1 patient
// implement date variable later using:'/patient_nas/:Date'
dataRouter.get('/patient_weights/:HOSPITAL/:DATE1/:DATE2', DataController.PatientWeights_on_dates);
dataRouter.get('/patient_nas/:HOSPITAL/:DATE', DataController.PatientNAS_on_date);
dataRouter.get('/nas/:HOSPITAL/:DATE1/:DATE2', DataController.NAS);
dataRouter.get('/personnel_count/:HOSPITAL/:DATE/', DataController.Personnel_count);
dataRouter.get('/ReportPatientPersonnelAvgPerShift/:HOSPITAL/:DATE1/:DATE2', DataController.ReportPatientPersonnelAvgPerShift);
dataRouter.get('/NasMapData/:DATE1/:DATE2', DataController.NAS_mapData);


module.exports = dataRouter;