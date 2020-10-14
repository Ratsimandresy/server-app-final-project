const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    name: String,
    description: String,
    mainImageUrl: {
        type: String,
        default:"images/event_ default.png",
    },
    images: [String],
    tags:[{
        type: Schema.Types.ObjectId,
        ref: "Tag"
    }],
    catergory: {
        type: Schema.Types.ObjectId,
        ref: "Category"
    },
    location: {
        type: {
          type: String,
          enum: ["Point"],
        },
        coordinates: {
          type: [Number],
        },
        formattedAddress: String,
    },
    infos: {
        date: Date,
        hour: Number,
        min: Number,
    },
    city: String,
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: "User",
        default: []
    }],
    rate:[{
        note: Number,
    }], 

    isWithPeople: Boolean
});

module.exports = Event;
