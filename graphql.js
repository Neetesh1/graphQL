const axios = require("axios");

const typeDefs = `
  type User {
    id: ID!
    name: String!
    username: String!
    email: String!
    address: Address!
    phone: String!
    website: String!
    company: Company!
  }

  type Address {
    street: String!
    suite: String!
    city: String!
    zipcode: String!
    geo: Geo!
  }

  type Geo {
    lat: String!
    lng: String!
  }

  type Company {
    name: String!
    catchPhrase: String!
    bs: String!
  }

  type Comment {
    postId: ID!
    id: ID!
    name: String!
    email: String!
    body: String!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
    comments: [Comment!]!
    comment(id: ID!): Comment
  }

  type Mutation {
    updateComment(id: ID!, name: String, email: String, body: String): Comment
    deleteComment(id: ID!): Boolean
  }
`;

const resolvers = {
  Query: {
    users: async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        return response.data;
      } catch (error) {
        console.error("Error fetching users:", error);
        throw new Error("Failed to fetch users");
      }
    },
    user: async (_, { id }) => {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${id}`
        );
        return response.data;
      } catch (error) {
        console.error(`Error fetching user with id ${id}:`, error);
        throw new Error(`Failed to fetch user with id ${id}`);
      }
    },
    comments: async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/comments"
        );
        return response.data;
      } catch (error) {
        console.error("Error fetching comments:", error);
        throw new Error("Failed to fetch comments");
      }
    },
    comment: async (_, { id }) => {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/comments/${id}`
        );
        return response.data;
      } catch (error) {
        console.error(`Error fetching comment with id ${id}:`, error);
        throw new Error(`Failed to fetch comment with id ${id}`);
      }
    },
  },
  Mutation: {
    updateComment: async (_, { id, name, email, body }) => {
      try {
        const response = await axios.put(
          `https://jsonplaceholder.typicode.com/comments/${id}`,
          { name, email, body }
        );
        return response.data;
      } catch (error) {
        console.error(`Error updating comment with id ${id}:`, error);
        throw new Error(`Failed to update comment with id ${id}`);
      }
    },
    deleteComment: async (_, { id }) => {
      try {
        await axios.delete(`https://jsonplaceholder.typicode.com/comments/${id}`);
        return true;
      } catch (error) {
        console.error(`Error deleting comment with id ${id}:`, error);
        return false;
      }
    }
  }
};

module.exports = { typeDefs, resolvers };
