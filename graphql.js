const axios = require("axios");

const BASE_URL = "https://jsonplaceholder.typicode.com";

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

  type Post {
    userId: ID!
    id: ID!
    title: String!
    body: String!
    user: User
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
    comments: [Comment!]!
    comment(id: ID!): Comment
    posts: [Post!]!
    post(id: ID!): Post
  }

  type Mutation {
    updateComment(id: ID!, name: String, email: String, body: String): Comment
    deleteComment(id: ID!): Boolean
    addPost(userId: ID!, title: String!, body: String!): Post
    updatePost(id: ID!, title: String, body: String): Post
    deletePost(id: ID!): Boolean
  }
`;

const resolvers = {
  Query: {
    users: async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/users`
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
          `${BASE_URL}/users/${id}`
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
          `${BASE_URL}/comments`
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
          `${BASE_URL}/comments/${id}`
        );
        return response.data;
      } catch (error) {
        console.error(`Error fetching comment with id ${id}:`, error);
        throw new Error(`Failed to fetch comment with id ${id}`);
      }
    },
    posts: async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/posts`
        );
        return response.data;
      } catch (error) {
        console.error("Error fetching posts:", error);
        throw new Error("Failed to fetch posts");
      }
    },
    post: async (_, { id }) => {
      try {
        const response = await axios.get(
          `${BASE_URL}/posts/${id}`
        );
        return response.data;
      } catch (error) {
        console.error(`Error fetching post with id ${id}:`, error);
        throw new Error(`Failed to fetch post with id ${id}`);
      }
    },
  },
  Post: {
    user: async (parent) => {
      try {
        const response = await axios.get(
          `${BASE_URL}/users/${parent.userId}`
        );
        return response.data;
      } catch (error) {
        console.error(`Error fetching user for post with userId ${parent.userId}:`, error);
        return null;
      }
    }
  },
  Mutation: {
    addPost: async (_, { userId, title, body }) => {
      try {
        const response = await axios.post(
          `${BASE_URL}/posts`,
          { userId, title, body }
        );
        return response.data;
      } catch (error) {
        console.error("Error adding post:", error);
        throw new Error("Failed to add post");
      }
    },
    updatePost: async (_, { id, title, body }) => {
      try {
        const response = await axios.put(
          `${BASE_URL}/posts/${id}`,
          { title, body }
        );
        return response.data;
      } catch (error) {
        console.error(`Error updating post with id ${id}:`, error);
        throw new Error(`Failed to update post with id ${id}`);
      }
    },
    deletePost: async (_, { id }) => {
      try {
        await axios.delete(`${BASE_URL}/posts/${id}`);
        return true;
      } catch (error) {
        console.error(`Error deleting post with id ${id}:`, error);
        return false;
      }
    },
    updateComment: async (_, { id, name, email, body }) => {
      try {
        const response = await axios.put(
          `${BASE_URL}/comments/${id}`,
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
        await axios.delete(`${BASE_URL}/comments/${id}`);
        return true;
      } catch (error) {
        console.error(`Error deleting comment with id ${id}:`, error);
        return false;
      }
    }
  }
};

module.exports = { typeDefs, resolvers };
