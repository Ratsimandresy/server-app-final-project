const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    name: String,
    description: String,
    mainImageUrl: {
        type: String,
        default:"https://static.vecteezy.com/system/resources/thumbnails/000/246/312/original/mountain-lake-sunset-landscape-first-person-view.jpg",
    },
    images: [String],
    tags:[{
        type: Schema.Types.ObjectId,
        ref: "Tag"
    }],
    category: {
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
    noteAverage : Number,
    isWithPeople: Boolean
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
