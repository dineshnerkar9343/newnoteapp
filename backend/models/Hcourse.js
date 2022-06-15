const mongoose = require('mongoose')
const { Schema } = mongoose;


const HcoursesSchema = new Schema ({


    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

    image : {
        type: String,
        required : true
    },


    title : {
        type: String,
        required : true
    },

    description : {
        type: String,
        required : true,
     
    },

    tag : {
        type: String,
        default: "general"
        
    },

    date : {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('hcourses',HcoursesSchema);