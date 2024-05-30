// Import necessary modules from mongoose and bcrypt
const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// Define the user schema with mongoose
const userSchema = new Schema({
    // Username field: must be unique and required
    username: {
        type: String,
        required: true,
        unique: true,
    },
    // Email field: must be unique, required, and match a specific pattern
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    // Password field: required
    password: {
        type: String,
        required: true,
    },
    // Favorites field: an array of ObjectIds that reference the Movie model
    favorites: [{
        type: Schema.Types.ObjectId,
        ref: 'Movie'
    }]
}, {
    // Configure schema to include virtual properties when converted to JSON
    toJSON: {
        virtuals: true,
    },
});

// Middleware to hash the password before saving a new or modified user document
userSchema.pre('save', async function(next) {
    // Check if the document is new or the password field is modified
    if (this.isNew || this.isModified('password')) {
        // Define the number of salt rounds for hashing
        const saltRounds = 10;
        // Hash the password with bcrypt
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    // Move to the next middleware or save the document
    next();
});

// Method to compare a given password with the hashed password stored in the database
userSchema.methods.isCorrectPassword = async function (password) {
    // Use bcrypt to compare the provided password with the stored hash
    return bcrypt.compare(password, this.password);
};

// Create the User model from the schema
const User = model('User', userSchema);

// Export the User model for use in other parts of the application
module.exports = User;