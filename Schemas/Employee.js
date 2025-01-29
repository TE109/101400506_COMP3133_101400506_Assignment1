const mongoose = require('mongoose');


const EmployeeSchema = mongoose.Schema(
    {
        "first_name":  {
            type: String,
            required: true
        },
        "last_name":  {
            type: String,
            required: true
        },
        "email" : {
            type: String,
            unique: true
        },
        "gender": { 
            type: String, 
            enum: ['Male', 'Female', 'Other'], 
            required: true 
        },
        "designation": { type: String, required: true },
        salary: { 
            type: Number, 
            required: true, 
            min: [1000] 
        },
        date_of_joining: { type: Date, required: true },
        "employee_photo": String,
        "department": { type: String, required: true },
        "created_at": Date,
        "updated_at": Date
       }       
)


const Employee = mongoose.model("Employee",EmployeeSchema);
module.exports = Employee;