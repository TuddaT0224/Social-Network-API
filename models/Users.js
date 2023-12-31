const { Schema, model } = require('mongoose');

//Schema to create User model
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trimmed: true

        },
        email: {
            type: String,
            required: true,
            unique: true,
            // Here we will use Regex to help validate email
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/]
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thoughts'
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'Users'
        }]
    },
    {toJSON: {
        virtuals: true,
        getters: true,
    },
    id: false
}
)

userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
})

// Create the Users model using userSchema
const Users = model('Users', userSchema);

// Export Users module
module.exports = Users;
