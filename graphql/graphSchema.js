const { buildSchema } = require("graphql");

const schema = buildSchema(`
  type Employee {
    _id: ID!
    first_name: String!
    last_name: String!
    email: String!
    gender: String!
    designation: String!
    salary: Float!
    date_of_joining: String!
    employee_photo: String
    department: String!
    created_at: String
    updated_at: String
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    password: String! 
    created_at: String
    updated_at: String
  }
    

  type Query {
    login(email: String!, password: String!): User

    getAllEmployees: [Employee]

    getEmployeeById(id: ID!): Employee
    
    searchEmployeeByDesignationOrDepartment(designation: String, department: String): [Employee]
  }

  type Mutation {
    signup(username: String!, email: String!, password: String!): User

    addEmployee(
      first_name: String!,
      last_name: String!,
      email: String!,
      gender: String!,
      designation: String!,
      salary: Float!,
      date_of_joining: String!,
      employee_photo: String,
      department: String!
    ): Employee

    updateEmployee(
      id: ID!,
      first_name: String,
      last_name: String,
      email: String,
      gender: String,
      designation: String,
      salary: Float,
      date_of_joining: String,
      employee_photo: String,
      department: String
    ): Employee

    deleteEmployee(id: ID!): Employee
  }
`);

module.exports = schema;
