const typeDefs = gql `
    type Map {
        _id: String!
        id: Int!
        name: String!
        owner: String!
        regions: [Region]
    }
    type Region {
        _id: String!
        id: Int!
        parent: String!
        name: String!
        capital: String!
        leader: String!
        flag: String!
        landmarks: [Landmark]
        subregions: [Region]
    }
    type Landmark {
        _id: String!
        id: Int!
        parent: String!
        name: String!
    }
    extend type Query {
        getAllMaps: [Map]
        getMapById(_id: String!): Map 
    }
    extend type Mutation {
        addRegion(region: RegionInput!, _id: String!, index: Int!): String
        addLandmark(landmark: LandmarkInput!, _id: String!, index: Int!): String
        addMap(map: MapInput!): String
        deleteRegion(regionId: String!, _id: String!): [Region]     
        deleteLandmark(landmarkId: String!, _id: String!): [Landmark]
        deleteMap(_id: String!): Boolean
        updateMapField(_id: String!, field: String!, value: String!): String
        updateRegionField(regionId: String!, _id: String!, field: String!, value: String!): [Region]
        updateLandmarkField(landmarkId: String!, _id: String!, field: String!, value: String!): [Landmark]
        sortTable(mapId: String!, _id: String!): [Region]
    }
    input FieldInput {
        _id: String
        field: String
        value: String
    }
    input MapInput {
        _id: String
        id: Int
        name: String
        owner: String
        regions: [RegionInput]
    }
    input RegionInput {
        _id: String
        id: Int
        parent: String
        name: String
        capital: String
        leader: String
        flag: String
        landmarks: [Landmark]
        subregions: [Region]
    }
    input LandmarkInput {
        _id: String
        id: Int
        parent: String
        name: String
    }
`;
