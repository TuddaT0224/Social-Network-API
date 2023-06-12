const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

const reactionSchema = new Schema ({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now,
        get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a') 
    }
},
{
    toJSON: {
        getters: true
    }
}
);





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
            get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
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
// create Thoughts model using the Thoughts schema
const Thoughts = model('Thoughts', thoughtSchema);

// Export Thoughts module
module.exports = Thoughts;



