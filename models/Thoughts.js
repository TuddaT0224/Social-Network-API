const { Schema, model, Types } = require('mongoose');
const moment = require('moment');


// Schema to create Thoughts model
const thoughtSchema = new Schema (
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280 
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            getter: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
        },
        username: {
            type: String,
            required: true,
        },
        // This would be an ID
        reactions: [reactionSchema]
        },
    {
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
    }
)

// Total count of reations
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});



