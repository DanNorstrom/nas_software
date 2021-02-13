const { set } = require('mongoose');
const STAGE_1 = require('../models/stage1nas.model');
const STAGE_2 = require('../models/stage2nas.model');

//######################################################################
//########################### DATA STRUCTS #############################
//######################################################################

// data chart for NAS Scoring
nas_map = new Map([
    ["BA1A", 4.5],
    ["BA1B", 12.1],
    ["BA1C", 19.6],
    ["BA2", 4.3],
    ["BA3", 5.6],
    ["BA4A", 4.1],
    ["BA4B", 16.5],
    ["BA4C", 20],
    ["BA5", 1.8],
    ["BA6A", 5.5],
    ["BA6B", 12.4],
    ["BA6C", 17],
    ["BA7A", 4],
    ["BA7B", 32],
    ["BA8A", 4.2],
    ["BA8B", 23.2],
    ["BA8C", 30],
    ["BA9", 1.4],
    ["BA10", 1.8],
    ["BA11", 4.4],
    ["BA12", 1.2],
    ["BA13", 2.5],
    ["BA14", 1.7],
    ["BA15", 7.1],
    ["BA16", 7.7],
    ["BA17", 7.0],
    ["BA18", 1.6],
    ["BA19", 1.3],
    ["BA20", 2.8],
    ["BA21", 1.3],
    ["BA22", 2.8],
    ["BA23", 1.9]
]);

// data chart for hour weight
hour_map = new Map([
    [0, 0.05],      // for any rounding issues going downwards from 0.49
    [1, 0.05],
    [2, 0.09],
    [3, 0.13],
    [4, 0.17],
    [5, 0.20],
    [6, 0.25],
    [7, 0.3],
    [8, 1.0]
]);



//######################################################################
//###########################   Functions  #############################
//######################################################################





function result_date_to_daily_patient_nas_collection(result){

    // find all unique patients and their min(time_in), max(time_:out)
    time_range_map = new Map();
    for (var i = 0; i < result.length; i++){
        var p_id = result[i].PATIENT_ID
        var p_in = null
        var p_out = null

        // if new patient_id, add to map
        if (typeof time_range_map.get(p_id) =='undefined'){
            time_range_map.set(p_id, {TIME_IN: result[i].TIME_IN, TIME_OUT: result[i].TIME_OUT})
            //time_range_map.set(p_id, {TIME_IN: result[i].TIME_IN, TIME_OUT: result[i].TIME_OUT})
        }

        // if existing patient, find earliest and latest time
        else {
            // add earliest if earliest
            var t_in_old = new Date("01/01/1970 "+time_range_map.get(p_id).TIME_IN)
            var t_in_new = new Date("01/01/1970 "+result[i].TIME_IN)
            var p_date_in = (t_in_new < t_in_old) ? t_in_new : t_in_old;

            // add latest if latest
            var t_out_old = new Date("01/01/1970 "+time_range_map.get(p_id).TIME_OUT)
            var t_out_new = new Date("01/01/1970 "+result[i].TIME_OUT)
            var p_date_out = (t_out_new > t_out_old) ? t_out_new : t_out_old;

            // convert back to HH:MM format
            p_in = p_date_in.toTimeString().split(' ')[0].slice(0,5)
            p_out = p_date_out.toTimeString().split(' ')[0].slice(0,5)

            time_range_map.set(p_id, {TIME_IN: p_in, TIME_OUT: p_out})
        }
    }

    // calculate time from time_in and time_out
    time_map = new Map();
    time_range_map.forEach((value,key) => {
        var t_earliest = new Date("01/01/1970 "+value.TIME_IN)
        var t_latest = new Date("01/01/1970 "+value.TIME_OUT)
        var t_diff = Math.abs(t_latest - t_earliest)
        var hours = Math.round(t_diff/1000/60/60)   //MS -> hour
        if (hours > 8) hours = 8;   // 8+ hours is a full day treatment
        time_map.set(key, hours)
    })


    // Basic activities map
    patient_ba_map = new Map();
    for (var i = 0; i < result.length; i++){
        var p_id = result[i].PATIENT_ID
        var p_date = result[i].DATE
        // if new patient_id, add to map
        if (!patient_ba_map.has(p_id)){
            patient_ba_map.set(p_id,
            {
            BA1A: result[i].BA1A,
            BA1B: result[i].BA1B,
            BA1C: result[i].BA1C,
            BA2: result[i].BA2,
            BA3: result[i].BA3,
            BA4A: result[i].BA4A,
            BA4B: result[i].BA4B,
            BA4C: result[i].BA4C,
            BA5: result[i].BA5,
            BA6A: result[i].BA6A,
            BA6B: result[i].BA6B,
            BA6C: result[i].BA6C,
            BA7A: result[i].BA7A,
            BA7B: result[i].BA7B,
            BA8A: result[i].BA8A,
            BA8B: result[i].BA8B,
            BA8C: result[i].BA8C,
            BA9: result[i].BA9,
            BA10: result[i].BA10,
            BA11: result[i].BA11,
            BA12: result[i].BA12,
            BA13: result[i].BA13,
            BA14: result[i].BA14,
            BA15: result[i].BA15,
            BA16: result[i].BA16,
            BA17: result[i].BA17,
            BA18: result[i].BA18,
            BA19: result[i].BA19,
            BA20: result[i].BA20,
            BA21: result[i].BA21,
            BA22: result[i].BA22,
            BA23: result[i].BA23,
            DATE: p_date
            });
        }
        // console.log(time_range_map)
        // console.log(patient_ba_map)
        //if id exists, merge maps
        else{
            patient_ba_map.set(p_id,
            {
            BA1A: result[i].BA1A || patient_ba_map.get(p_id).BA1A,
            BA1B: result[i].BA1B || patient_ba_map.get(p_id).BA1B,
            BA1C: result[i].BA1C || patient_ba_map.get(p_id).BA1C,
            BA2: result[i].BA2 ||   patient_ba_map.get(p_id).BA2,
            BA3: result[i].BA3 ||   patient_ba_map.get(p_id).BA3,
            BA4A: result[i].BA4A || patient_ba_map.get(p_id).BA4A,
            BA4B: result[i].BA4B || patient_ba_map.get(p_id).BA4B,
            BA4C: result[i].BA4C || patient_ba_map.get(p_id).BA4C,
            BA5: result[i].BA5 ||   patient_ba_map.get(p_id).BA5,
            BA6A: result[i].BA6A || patient_ba_map.get(p_id).BA6A,
            BA6B: result[i].BA6B || patient_ba_map.get(p_id).BA6B,
            BA6C: result[i].BA6C || patient_ba_map.get(p_id).BA6C,
            BA7A: result[i].BA7A || patient_ba_map.get(p_id).BA7A,
            BA7B: result[i].BA7B || patient_ba_map.get(p_id).BA7B,
            BA8A: result[i].BA8A || patient_ba_map.get(p_id).BA8A,
            BA8B: result[i].BA8B || patient_ba_map.get(p_id).BA8B,
            BA8C: result[i].BA8C || patient_ba_map.get(p_id).BA8C,
            BA9: result[i].BA9 ||   patient_ba_map.get(p_id).BA9,
            BA10: result[i].BA10 || patient_ba_map.get(p_id).BA10,
            BA11: result[i].BA11 || patient_ba_map.get(p_id).BA11,
            BA12: result[i].BA12 || patient_ba_map.get(p_id).BA12,
            BA13: result[i].BA13 || patient_ba_map.get(p_id).BA13,
            BA14: result[i].BA14 || patient_ba_map.get(p_id).BA14,
            BA15: result[i].BA15 || patient_ba_map.get(p_id).BA15,
            BA16: result[i].BA16 || patient_ba_map.get(p_id).BA16,
            BA17: result[i].BA17 || patient_ba_map.get(p_id).BA17,
            BA18: result[i].BA18 || patient_ba_map.get(p_id).BA18,
            BA19: result[i].BA19 || patient_ba_map.get(p_id).BA19,
            BA20: result[i].BA20 || patient_ba_map.get(p_id).BA20,
            BA21: result[i].BA21 || patient_ba_map.get(p_id).BA21,
            BA22: result[i].BA22 || patient_ba_map.get(p_id).BA22,
            BA23: result[i].BA23 || patient_ba_map.get(p_id).BA23,
            DATE: p_date
            })
        }
    }


    // DATA CORRECT UP UNTIL HERE


    // calculate BA_total per patient, Sum(Max(a,b,c)...)
    ba_tot_map = new Map(); // [ID,nas_weight]
    patient_ba_map.forEach((value,key) => {
        ba_tot = 0;
        if (value.BA1C) ba_tot += nas_map.get("BA1C");
        else if (value.BA1B) ba_tot += nas_map.get("BA1B");
        else if (value.BA1A) ba_tot += nas_map.get("BA1A");

        if (value.BA2 ) ba_tot += nas_map.get("BA2") ;
        if (value.BA3 ) ba_tot += nas_map.get("BA3") ;

        if (value.BA4C) ba_tot += nas_map.get("BA4C");
        else if (value.BA4B) ba_tot += nas_map.get("BA4B");
        else if (value.BA4A) ba_tot += nas_map.get("BA4A");

        if (value.BA5 ) ba_tot += nas_map.get("BA5") ;

        if (value.BA6C) ba_tot += nas_map.get("BA6C");
        else if (value.BA6B) ba_tot += nas_map.get("BA6B");
        else if (value.BA6A) ba_tot += nas_map.get("BA6A");

        if (value.BA7B) ba_tot += nas_map.get("BA7B");
        else if (value.BA7A) ba_tot += nas_map.get("BA7A");

        if (value.BA8C) ba_tot += nas_map.get("BA8C");
        else if (value.BA8B) ba_tot += nas_map.get("BA8B");
        else if (value.BA8A) ba_tot += nas_map.get("BA8A");

        if (value.BA9 ) ba_tot += nas_map.get("BA9");
        if (value.BA10) ba_tot += nas_map.get("BA10");
        if (value.BA11) ba_tot += nas_map.get("BA11");
        if (value.BA12) ba_tot += nas_map.get("BA12");
        if (value.BA13) ba_tot += nas_map.get("BA13");
        if (value.BA14) ba_tot += nas_map.get("BA14");
        if (value.BA15) ba_tot += nas_map.get("BA15");
        if (value.BA16) ba_tot += nas_map.get("BA16");
        if (value.BA17) ba_tot += nas_map.get("BA17");
        if (value.BA18) ba_tot += nas_map.get("BA18");
        if (value.BA19) ba_tot += nas_map.get("BA19");
        if (value.BA20) ba_tot += nas_map.get("BA20");
        if (value.BA21) ba_tot += nas_map.get("BA21");
        if (value.BA22) ba_tot += nas_map.get("BA22");
        if (value.BA23) ba_tot += nas_map.get("BA23");

        ba_tot_map.set(key, [ba_tot, value.DATE])
    });


    //data struct check
    //console.log(ba_tot_map)
    //console.log(time_range_map)
    //console.log(time_map)
    //console.log("time_map is broken")



    // calculate Patient NAS
    patient_nas_payload = [];
    ba_tot_map.forEach((value,key) => {

    // nas weight for this patient
    var time_weight = hour_map.get(time_map.get(key))

    // calc nas
    patient_nas = value[0] * time_weight;
    //console.log(patient_nas)
    patient_nas_payload.push({"PATIENT_ID":key, "NAS":patient_nas, "DATE": value[1]})
    })
    // console.log(patient_nas_payload)

    return patient_nas_payload
}





// function result_date_to_daily_personnel_count(result){
//     // console.log(result)

//     for (const dataObj of json.data) {
//         apiID.push(dataObj.RANGE)
//         apiNAS.push(parseInt(dataObj.NAS_WEIGHT))
//     }


// }






//######################################################################
//########################### DATA ENDPOINTS ###########################
//######################################################################

exports.NAS = (req, res, next) => {
    STAGE_1.find({
        DATE: {
            "$gte":req.params.DATE1,    //greaterOrEqual
            "$lte":req.params.DATE2}   //lesserOrEqual
        },
        function(err, result){
        if(err){
            res.status(400).send({
                'success': false,
                'error': err.message
            });
            return; //break if error
        }


        // NAS / DAY
        //var result_data = result_date_to_daily_patient_nas_collection(result)




    }
);}



exports.PatientWeights_on_dates = (req, res, next) => {
    STAGE_1.find({
        DATE: {
            "$gte":req.params.DATE1,    //greaterOrEqual
            "$lte":req.params.DATE2}   //lesserOrEqual
        },
        function(err, result){
        if(err){
            res.status(400).send({
                'success': false,
                'error': err.message
            });
            return; //break if error
        }
        // console.log(req.params.DATE1)
        // console.log(req.params.DATE2)
        //console.log(result)

        // returns {id: weight} pairs btw DATE1 and DATE2
        var result_data = result_date_to_daily_patient_nas_collection(result)

        weight_map = new Map([
            ["lost", 0],
            ["<50", 0],
            ["50-80", 0],
            ["81-120", 0],
            ["121-140", 0],
            [">140", 0]
        ]);

        result_data.forEach((patientNas,key) => {
            if (patientNas.NAS > 140) weight_map.set(">140", weight_map.get(">140")+1);
            else if (patientNas.NAS > 120) weight_map.set("121-140", weight_map.get("121-140")+1);
            else if (patientNas.NAS > 80) weight_map.set("81-120", weight_map.get("81-120")+1);
            else if (patientNas.NAS > 50) weight_map.set("50-80", weight_map.get("50-80")+1);
            else if (patientNas.NAS > 0) weight_map.set("<50", weight_map.get("<50")+1);
            else if (patientNas.NAS < 0) weight_map.set("lost", weight_map.get("lost")+1);
         });

         // json formating
         const patient_nas_dates_payload = []

        weight_map.forEach((value,key) => {
            patient_nas_dates_payload.push({"RANGE":key, "NAS_WEIGHT":value})
        });

        // console.log(weight_map)
        // console.log(patient_nas_dates_payload)
        res.status(200).send({
            'success': true,
            'data': patient_nas_dates_payload
        })
    });
};



exports.PatientNAS_on_date = (req, res, next) => {
    STAGE_1.find({DATE: req.params.DATE } , function(err, result){
        if(err){
            res.status(400).send({
                'success': false,
                'error': err.message
            });
            return; //break if error
        }

        var patient_nas_payload = result_date_to_daily_patient_nas_collection(result)



        res.status(200).send({
            'success': true,
            'data': patient_nas_payload
        });
    });

}



exports.Personnel_count = (req, res, next) => {
    STAGE_2.find({DATE: req.params.DATE } , function(err, result){
        if(err){
            res.status(400).send({
                'success': false,
                'error': err.message
            });
            return; //break if error
        }

        // return personnel per shift per 1 day

        personnel_count_payload = []
        for (const dataObj of result) {
            personnel_count_payload.push({"Personnel_D":dataObj.Personnel_D, "Personnel_A":dataObj.Personnel_A, "Personnel_N":dataObj.Personnel_N})
        }
        // console.log(personnel_count_payload)


        res.status(200).send({
            'success': true,
            'data': personnel_count_payload
        });
    });

}


exports.ReportPatientPersonnelAvgPerShift = (req, res, next) => {

    // anonymous asyn method to aforce async behavior with multiple synchornious parts.
    (async () => {

    // save data struct
    var patient_map = new Map() // Keys are dates, values are avg patient NAS/shift
    var personnel_map = new Map()

    //data structs
    let patient_date_nas = []
    let personnel_date_nas = []

    // json payload
    var personnel_patient_avgnas_payload = []


    // code couses synchrounous behavior, we wait for it finish.
    const promiseEnd = await Promise.all([
        
        STAGE_1.find({
            DATE: {
                "$gte":req.params.DATE1,    //greaterOrEqual
                "$lte":req.params.DATE2}   //lesserOrEqual
            },
            function(err, result){
            if(err){
                res.status(400).send({
                    'success': false,
                    'error': err.message
                });
                console.log("error: broken DB call")
                return; //break if error
            }

            //get patient avg/day
            var patient_nas_payload = result_date_to_daily_patient_nas_collection(result)

            // get data -> map, merge on date
            // date objcet is uncomparable, turn them into integers.
            for (const dataObj of patient_nas_payload) {
                var date_int = +dataObj.DATE
                patient_map.set(date_int, ((patient_map.get(date_int)+dataObj.NAS) || dataObj.NAS)  )
            }

            // push as objects to array
            patient_map.forEach((value,key) => {
                patient_date_nas.push({"Pa_NAS":value, "DATE": new Date(key)})
            });

            // sort data
            sorted_patient_date_nas = patient_date_nas.sort((a, b) => a.DATE - b.DATE)
  
        }),


        STAGE_2.find({
            DATE: {
                "$gte":req.params.DATE1,    //greaterOrEqual
                "$lte":req.params.DATE2}   //lesserOrEqual
            },
            function(err, result){
            if(err){
                res.status(400).send({
                    'success': false,
                    'error': err.message
                });
                return; //break if error
            }

            // get data -> map, merge on date
            for (const dataObj of result) {
                //personnel_map[dataObj.DATE] = (dataObj.Personnel_D + dataObj.Personnel_A + dataObj.Personnel_N)
                personnel_map.set(dataObj.DATE,(dataObj.Personnel_D + dataObj.Personnel_A + dataObj.Personnel_N))
            }
            
            // push as objects to array
            personnel_map.forEach((value,key) => {
                personnel_date_nas.push({"Pe_NAS":(value*100/3), "DATE": key})
            });

            sorted_personnel_date_nas = personnel_date_nas.sort((a, b) => a.DATE - b.DATE)
        })


    ]);

    // summarize DB data as payload
    personnel_patient_avgnas_payload = [patient_date_nas,personnel_date_nas]


    //console.log(patient_date_nas,personnel_date_nas)

    // TODO: our map isnt sorted by dates:
    //dosent always log patient_data_nas in array, might be promise async issues.

    res.status(200).send({
        'success': true,
        'data': personnel_patient_avgnas_payload
    });

})(); // end async

}

//######################################################################
//############################## NOTES #################################
//######################################################################




/* add Date-range to query, format as: we can skip this if me multiQuery our api, not recommended
{
    "success": true,
    "data": [
        {
            "PATIENT_ID": "1",
            "DATE": "2021/01/19",
            "NAS": 5.5
        },
        {
            "PATIENT_ID": "2",
            "DATE": "2021/01/19",
            "NAS": 49.2
        }
    ]
}*/