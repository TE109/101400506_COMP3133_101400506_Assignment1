const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const schema = require("./graphql/graphSchema");
const resolvers = require("./graphql/Resolvers");

const app = express();

// Connect to MongoDB
mongoose.connect("mongodb+srv://admin:pass@comp3123cluster.arhm6.mongodb.net/comp3133_101400506_assigment1?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
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
  console.log("Server running on http://localhost:3000/");
});