const { projects, clientsList } = require('../sampleData')
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLList, GraphQLID } = require('graphql');
// Project Type
const ProjectType = new GraphQLObjectType({
  name: 'project',
  fields: () =>
  ({

    id: { type: GraphQLID },
    pid: { type: GraphQLString },
    category: { type: GraphQLString },
    price: { type: GraphQLString },
    title: { type: GraphQLString },
  })
});

// Client Type
const ClientType = new GraphQLObjectType({
  name: 'Client',
  fields: () =>
  ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  })
});
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        return projects;
      },
    },
    project: {
      type: ProjectType,
      args:
      {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {

        return projects.find(project => project.id === args.id);
      },
    },
    clients: {
      type: new GraphQLList(ClientType),
      resolve(parent, args) {
        return clients;
      },
    },
    client: {
      type: ClientType,
      args:
      {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return clientsList.find(client => client.id === args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery
})
