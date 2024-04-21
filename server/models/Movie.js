// Import schema and model from mongoose
const { Schema, model } = require('mongoose');

const movieSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        year: {
            type: Number,
            required: true,
        },
        plot: {
            type: String,
            required: true
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