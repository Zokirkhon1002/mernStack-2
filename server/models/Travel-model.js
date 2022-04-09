const {Schema, model} = require("mongoose");


let schemaForTravel = {
    title: {
        type: String,
        required: true,
        minLength: 3
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}

const travelModel = new Schema(schemaForTravel)

module.exports = model("Travel",travelModel)