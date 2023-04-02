const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    studentId: { type:String, required:true },
    studentName: { type:String, required:true },
    cgpa: { type:String, required:false },
    marks: {
        Ideation: { type:Number, required:false, default:0 },
        Execution: { type:Number, required:false, default:0 },
        Viva: { type:Number, required:false, default:0 },
        Presentation: { type:Number, required:false, default:0 },
    },
    assigned: { type:Boolean, required:false, default:false  },
    email: { type:String, required:false, default:"" },
    phone: { type:String,  required:false, default:""},
    Submitted: { type:Boolean, required:false, default:false }
})

module.exports = mongoose.model('Student', studentSchema, "students");