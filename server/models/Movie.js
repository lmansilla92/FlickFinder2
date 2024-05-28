// Import schema and model from mongoose
const { Schema, model } = require('mongoose');

const movieSchema = new Schema(
    {
        id: {
            type: Number,
            required: true,
            unique: true,
        },
        poster: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        cast: {
            type: [String],
            required: true,
        },
        year: {
            type: Number,
            required: true,
        }
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
)

const Movie = model('Movie', movieSchema);

module.exports = Movie;