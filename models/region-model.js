// const { model, Schema, ObjectId } = require('mongoose');
// const Landmark = require('./landmark-model').schema;

// const regionSchema = new Schema(
//     {
//         _id: {
//             type: ObjectId,
//             required: true
//         },
//         id: {
//             type: Number,
//             required: true
//         },
//         parent: {
//             type: String,
//             required: true
//         },
//         name: {
//             type: String,
//             required: true
//         },
//         capital: {
//             type: String,
//             required: true
//         },
//         leader: {
//             type: String,
//             required: true
//         },
//         flag: {
//             type: String,
//             required: true
//         },
//         landmarks: [Landmark],
//         // subregions: [Region]
//     }
// );


// const Region = model('Region', regionSchema);
// module.exports = Region