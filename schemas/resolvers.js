
const Tracking = require('../models/tracking.js')


// query and mutations

const resolvers = {
    Query: {
        me: (parent, args, context) => {
            const NewTracking = Tracking.find()
            return NewTracking
        }
    }, 

    Mutation: {
        addNewTracking: async (args) => {
            
        }
    }
}

module.exports = resolvers;