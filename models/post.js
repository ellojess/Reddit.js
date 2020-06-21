const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Populate = require("../utils/autopopulate");

const postSchema = new Schema({
    createdAt: { type: Date },
    updatedAt: { type: Date },
    title: {type: String, require: true},
    url: {type: String, require: true},
    summary: {type: String, require: true},
    subreddit: {type: String, required: true},
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }], 
    upVotes : [{ type: Schema.Types.ObjectId, ref: "User"}],
    downVotes : [{ type: Schema.Types.ObjectId, ref: "User"}],
    voteScore : {type: Number}
})

postSchema.pre('save', function(next){
    // SET createdAt and updatedAt
    const now = new Date()
    this.updatedAt = now 

    if (!this.createdAt) {
        this.createdAt = now 
    }
    
    next()
})

postSchema
    .pre('findOne', Populate('author'))
    .pre('find', Populate('author'))

module.exports = mongoose.model("Post", postSchema)