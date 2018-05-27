const {makeExecutableSchema} = require("graphql-tools");
const resolvers = require("./resolvers");

const typeDefs = `
type Job {
  type: String
  company: String
  companyUrl : String
}
scalar DateTime
type User {
  _id: ID
  firstName: String
  lastName: String
  userName : String
  password : String
  job: [Job]
  created : DateTime
  lastUpdated : DateTime
}

input UserInput {
  firstName: String
  lastName: String
  userName : String
  password : String
}

input UserName {
  userName : String
}

type Query {
  getAllUsers : [User]
  findbyusername(input: UserName) : User
}

type Mutation {
  addUser(input: UserInput): User
}

`
const schema = makeExecutableSchema({typeDefs,resolvers});
module.exports =  {schema};