const { set } = require('mongoose');
const STAGE_1 = require('../models/stage1nas.model');



exports.PatientNAS_on_date = (req, res, next) => {
    STAGE_1.find({DATE: req.params.DATE } , function(err, result){
        if(err){
            res.status(400).send({
                'success': false,
                'error': err.message
            });
            return; //break if error
        }

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
                BA23: result[i].BA23
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
                BA23: result[i].BA23 || patient_ba_map.get(p_id).BA23
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

            ba_tot_map.set(key, ba_tot)
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
        patient_nas = value * time_weight;
        console.log(patient_nas)
        patient_nas_payload.push({"PATIENT_ID":key, "NAS":patient_nas})
        })

        
        // ##TODO##

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
        }

        */
        res.status(200).send({
            'success': true,
            'data': patient_nas_payload
        });
    });
}