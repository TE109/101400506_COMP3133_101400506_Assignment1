const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const schema = require("./graphql/graphSchema");
const resolvers = require("./graphql/Resolvers");

const app = express();

// Connect to MongoDB
mongoose.connect("mongodb+srv://admin:pass@comp3123cluster.arhm6.mongodb.net/comp3133_101400506_assigment1?retryWrites=true&w=majority", function(err, db) {
  var dbo = db.db("mydb");
  var myobj = {username: "User", email: "test@test.com", password: "123"}
  dbo.collection("users").insertOne(myobj)
});
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: true,
  })
);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000/graphql");
});