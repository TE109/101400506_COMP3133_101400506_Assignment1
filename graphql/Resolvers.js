const User = require("../Schemas/User");
const Employee = require("../Schemas/Employee");
const crypto = require('crypto');
const {validationResult } = require('express-validator');

const resolvers = {
    signup: async ({ username, email, password }) => {
        const errors = validationResult({ body: { username, email, password } });
        if (errors.isEmpty() == false) throw new Error(JSON.stringify(errors.array()));
        if (!username) throw new Error("Username is required");
        if (!email) throw new Error("Email is required");
        if (!password) throw new Error("Password is required");

        try {
            const hashedPassword = crypto.createHash('md5').update(password).digest('hex');
    
            const newUser = new User({
                username,
                email,
                password: hashedPassword,
                created_at: new Date(),
                updated_at: new Date(),
            });
    
            await newUser.save(); 
            return {
                message: "User Created"
            }
        } catch (error) {
            throw new Error(error.message); 
        }
    },
    

    login: async ({ email, password }) => {
        const errors = validationResult({ body: { email, password } });
        if (errors.isEmpty() == false) throw new Error(JSON.stringify(errors.array()));
        if (!email) throw new Error("Email is required");
        if (!password) throw new Error("Password is required");

        try {
            const user = await User.findOne({ email });     
            if (user == null) {
                throw new Error("User not found");
            }    
            const hashedPassword = crypto.createHash('md5').update(password).digest('hex');
            if (hashedPassword !== user.password) {
                throw new Error("Invalid credentials");
            }    
            return {
                message: "Login successful"
            };
        } catch (error) {
            throw new Error(error.message); 
        }
    },
    

    /*
    Resolver Function for Getting all Employes
    */
    getAllEmployees: async () => {
        try {
            const employees = await Employee.find()
            return employees
        } catch (error) {
            throw new Error("Coudnt Retrive Employees " + error.message)
        }
    },

    /*
    Resolver Function for Adding an Employes
    */
    addEmployee: async (
        {
            first_name,
            last_name,
            email,
            gender,
            designation,
            salary,
            date_of_joining,
            employee_photo,
            department
        }) => {            
        try {
            const newEmp = Employee({
                first_name,
                last_name,
                email,
                gender,
                designation,
                salary,
                date_of_joining,
                employee_photo,
                department,
                created_at: new Date(),
                updated_at: new Date(),
            })
            
            newEmp.save()
            return newEmp
        } catch (error) {
            throw new Error("Couldnt Add the Employee " + error.message)
        }
    },

    /*
    Reslover Function For Finding an employee by their ID
    */

    getEmployeeById: async({id}) => {
        try {
            const employee = Employee.findById(id)
            return employee
        } catch (error) {
            throw new Error("Couldnt Retrive the Employee " + error.message)  
        }
    },

    /*
    Reslover Function For Updating an employee by their ID
    */

    updateEmployee: async({id, 
            first_name,
            last_name,
            email,
            gender,
            designation,
            salary,
            date_of_joining,
            employee_photo,
            department
        }) => {
            try {
            const employee = Employee.findByIdAndUpdate(id,{
                first_name,
                last_name,
                email,
                gender,
                designation,
                salary,
                date_of_joining,
                employee_photo,
                department,
                updated_at: new Date(),
            }
            )
            return employee
        } catch (error) {
            throw new Error("Couldnt Update the Employee " + error.message)  
        }
    },
    
    /*
    Reslover Function For Delting an employee by their ID 
    */
    deleteEmployee: async({id
    }) => {
        try {
            const employee = Employee.findByIdAndDelete(id)
            return employee
        } catch (error) {
            return Error("Couldnt Delete the Employee " + error.message)  
    }
},

/*
    Reslover Function For Finding an employee by their designation or department
    */
    getEmployeeDesignationOrDepartment: async ({ designation, department }) => {
        try {
          let employees = await Employee.find(designation, department);            
          return employees;
        } catch (error) {
          throw new Error("Error fetching employees: " + error.message);
        }
    }
}

module.exports = resolvers;