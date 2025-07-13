# GraphQL Express API

This project is a Node.js API using Express and Apollo Server to provide a GraphQL endpoint for user and comment data from [JSONPlaceholder](https://jsonplaceholder.typicode.com/).

## Features
- Query users and comments
- Update and delete comments
- Modular GraphQL schema and resolvers
- Ready for deployment on Vercel

## Getting Started

### Install dependencies
```bash
npm install
```

### Run locally
```bash
npm run dev
```
Visit [http://localhost:3000/graphql](http://localhost:3000/graphql) for the GraphQL Playground.

## Example Queries

**Get all users:**
```graphql
query {
  users {
    id
    name
    email
  }
}
```

**Get user by ID:**
```graphql
query {
  user(id: "1") {
    id
    name
    email
    address {
      city
      street
    }
  }
}
```

**Get all comments:**
```graphql
query {
  comments {
    id
    name
    body
  }
}
```

**Update a comment:**
```graphql
mutation {
  updateComment(id: "1", name: "Updated Name", email: "updated@email.com", body: "Updated body") {
    id
    name
    email
    body
  }
}
```

**Delete a comment:**
```graphql
mutation {
  deleteComment(id: "1")
}
```

## Deployment

This project is ready to deploy on [Vercel](https://vercel.com/). See `vercel.json` for configuration.

## License
MIT
