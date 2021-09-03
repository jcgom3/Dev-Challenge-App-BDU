const { gql } = require('apollo-server-express');

// allows to specify what type of data and how will it be structured.
const typeDefs = gql `
    type Tracking {
        _id: ID!
        ship_date: String
        tracking_number: String
        shipping_carrier: String
        shipping_method: String
        tracking_url: String
    }

    type Query {
        me: Tracking
    }

    type Mutation {
        addNewTracking(ship_date: String!, tracking_number: String!, shipping_carrier: String, shipping_method: String, tracking_url: String!)
    }
`;

module.exports = typeDefs;