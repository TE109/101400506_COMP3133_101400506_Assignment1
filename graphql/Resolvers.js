const User = require("../Schemas/User");
const Employee = require("../Schemas/Employee");
const crypto = require('crypto');

const resolvers = {
    // Resolver for Signup and Login 
    // TODO Revice Clarification on Return and Purpose of Login & Signup 
    signup: async ({ username, email, password }) => {
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
    Query
    Returns an array of Employees 
    */
    getAllEmployees: async () => {
        try {
            const employees = await Employee.find()
            return employees
        } catch (error) {
            return Error("Coudnt Retrive Employees " + error.message)
        }
    },

    /*
    Resolver Function for Adding an Employes
    Mutation 
    Returns True if the Employee is created 
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
            return true
        } catch (error) {
            return Error("Couldnt Add the Employee " + error.message)
        }
    },

    /*
    Reslover Function For Finding an employee by their ID
    Query
    Returns the Employee
    */

    getEmployeeById: async({id}) => {
        try {
            const employee = Employee.findById(id)
            return employee
        } catch (error) {
            return Error("Couldnt Retrive the Employee " + error.message)  
        }
    },

    /*
    Reslover Function For Updating an employee by their ID
    Mutation
    Returns True if update was succseful 
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
            return true
        } catch (error) {
            return Error("Couldnt Update the Employee " + error.message)  
        }
    },
    
    /*
    Reslover Function For Delting an employee by their ID
    Mutation
    Returns True if Delation was succseful 
    */
    deleteEmployee: async({id
    }) => {
    try {
        const employee = Employee.findByIdAndRemove(id)
        return true
    } catch (error) {
        return Error("Couldnt Delete the Employee " + error.message)  
    }
},

/*
    Reslover Function For Finding an employee by their designation or department
    Query
    Returns Employee if succseful 
    */
    getEmployeeDesignationOrDepartment: async ({ designation, department }) => {
        try {
          let employees;  
          if (designation != null) {
            employees = await Employee.find(designation);
          }  
          if (department != null) {
            employees = await Employee.find(department);
          }
          
          return employees;
        } catch (error) {
          throw new Error("Error fetching employees: " + error.message);
        }
    }
}

module.exports = resolvers;