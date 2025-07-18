const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
const { typeDefs, resolvers } = require("./graphql");

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS globally
app.use(cors());

// Create Apollo Server instance
async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await server.start();

  server.applyMiddleware({ app });

  app.get("/", (req, res) => {
    res.send(`
      <h1>GraphQL Server is running!</h1>
      <p>GraphQL endpoint: <a href="/graphql">/graphql</a></p>
      <p>Try these queries:</p>
      <ul>
        <li><strong>Get all users:</strong> query { users { id name email } }</li>
        <li><strong>Get user by ID:</strong> query { user(id: "1") { id name email } }</li>
        <li><strong>Get all comments:</strong> query { comments { id name body } }</li>
        <li><strong>Get comment by ID:</strong> query { comment(id: "1") { id name body } }</li>
        <li><strong>Get all posts:</strong> query { posts { id title body user { name } } }</li>
        <li><strong>Get post by ID:</strong> query { post(id: "1") { id title body user { name } } }</li>
        <li><strong>Add post:</strong> mutation { addPost(userId: "1", title: "New Post", body: "Post body") { id title body userId } }</li>
        <li><strong>Update post:</strong> mutation { updatePost(id: "1", title: "Updated Title", body: "Updated body") { id title body userId } }</li>
        <li><strong>Delete post:</strong> mutation { deletePost(id: "1") }</li>
        <li><strong>Update comment:</strong> mutation { updateComment(id: "1", name: "Updated Name", email: "updated@email.com", body: "Updated body") { id name email body } }</li>
        <li><strong>Delete comment:</strong> mutation { deleteComment(id: "1") }</li>
      </ul>
    `);
  });

  app.listen(port, () => {
    console.log(`🚀 Server ready at http://localhost:${port}`);
    console.log(`📊 GraphQL endpoint: http://localhost:${port}/graphql`);
  });
}

startServer().catch((err) => {
  console.error("Error starting server:", err);
});
