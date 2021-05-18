const { gql } = require('apollo-server');

const typeDefs = gql `
    type Map {
        _id: String!
        name: String!
        owner: String!
    }
    extend type Query {
        getAllMaps: [Map]
        getMapById(_id: String!): Map 
    }
    extend type Mutation {
        addMap(map: MapInput!): Map
        updateMapField(_id: String!, field: String!, value: String!): String
        deleteMap(_id: String!): Boolean
    }
    input FieldInput {
        _id: String
        field: String
        value: String
    }
    input MapInput {
        _id: String
        name: String
        owner: String
    }
`;

module.exports = { typeDefs: typeDefs }


// regions: [RegionInput]



// //     regions: [Region]
// // }
// // type Region {
// //     _id: String!
// //     id: Int!
// //     parent: String!
// //     name: String!
// //     capital: String!
// //     leader: String!
// //     flag: String!
// //     landmarks: [Landmark]
// // }
// // type Landmark {
// //     _id: String!
// //     id: Int!
// //     parent: String!
// //     name: String!
// // }




// input RegionInput {
//     _id: String
//     id: Int
//     parent: String
//     name: String
//     capital: String
//     leader: String
//     flag: String
//     landmarks: [LandmarkInput]

// }
// input LandmarkInput {
//     _id: String
//     id: Int
//     parent: String
//     name: String
// }


// // // regions: [RegionInput]



// //         //         subregions: [Region]
// //         // regions: [Region]

// //                 // deleteRegion(regionId: String!, _id: String!): [Region]     
// //         // deleteLandmark(landmarkId: String!, _id: String!): [Landmark]


// //         // updateRegionField(regionId: String!, _id: String!, field: String!, value: String!): [Region]
// //         // updateLandmarkField(landmarkId: String!, _id: String!, field: String!, value: String!): [Landmark]
// //         // sortTable(mapId: String!, _id: String!): [Region]

// //         // addRegion(region: RegionInput!, _id: String!, index: Int!): String
// //         // addLandmark(landmark: LandmarkInput!, _id: String!, index: Int!): String