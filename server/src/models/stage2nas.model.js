const mongoose = require('mongoose');

// Define the schema
const postSchema = new mongoose.Schema({
    PERSONNEL_COUNT: {
        type: Number,
        required: true
    },
    DATE: {
        type: Date,
        required: true
    }
}, {
    timestamps: true, // adds timestamps for the post
});

// create the schema
// 1: "stage2" is the name of the collection that will contain the documents
// 2: second is the schema name/type
const STAGE_2 = mongoose.model("stage2", postSchema);

// export model so we can use it elsewhere
module.exports = STAGE_2;
