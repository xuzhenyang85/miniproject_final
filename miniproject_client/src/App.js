import React, { Component } from 'react';
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
  //uri: "https://591ffffa.ngrok.io"
  uri: "http://localhost:3000/graphQL"
});

// React component, react like playing lego 
const Users = () => (
  <Query
    query={gql`
      {
         getAllUsers{
          firstName
          lastName
          userName
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return data.getAllUsers.map(({ firstName,lastName, userName }) => (
        <p>{`${firstName} ${lastName} ${userName}`}</p>
      ));
    }}
  </Query>
);

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
      <div>
        <Users/>
      </div>
    </ApolloProvider>
    );
  }
}

export default App;
