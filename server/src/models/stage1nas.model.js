// Post.model.js

/*
TODO
x change schema to accommodate stage 1 NAS's 23 fields

*/

// Import the mongoose package
const mongoose = require('mongoose');

// Define the schema
const postSchema = new mongoose.Schema({

    //turn as many as possible to Scroll-lists / radials
    PATIENT_ID: {
        type: String,
        required: true
    },
    ROOM_NR: {
        type: String,
        required: true
    },
    WORK_SHIFT: {
        type: String,
        required: true
    },
    HOSPITAL: {
        type: String,
        required: true
    },
    TIME_IN: {
        type: String,
        required: true
    },
    TIME_OUT: {
        type: String,
        required: true
    },
    DATE: {
        type: Date,
        required: true
    },

    // BA = Basic Activities
    BA1A: Boolean,
    BA1B: Boolean,
    BA1C: Boolean,
    BA2: Boolean,
    BA3: Boolean,
    BA4A: Boolean,
    BA4B: Boolean,
    BA4C: Boolean,
    BA5: Boolean,
    BA6A: Boolean,
    BA6B: Boolean,
    BA6C: Boolean,
    BA7A: Boolean,
    BA7B: Boolean,
    BA8A: Boolean,
    BA8B: Boolean,
    BA8C: Boolean,
    BA9: Boolean,
    BA10: Boolean,
    BA11: Boolean,
    BA12: Boolean,
    BA13: Boolean,
    BA14: Boolean,
    BA15: Boolean,
    BA16: Boolean,
    BA17: Boolean,
    BA18: Boolean,
    BA19: Boolean,
    BA20: Boolean,
    BA21: Boolean,
    BA22: Boolean,
    BA23: Boolean
}, {
    timestamps: true, // adds timestamps for the post
});

// create the schema
// 1: "stage1" is the name of the collection that will contain the documents
// 2: second is the schema name/type
const STAGE_1 = mongoose.model("stage1", postSchema);

// export model so we can use it elsewhere
module.exports = STAGE_1;
