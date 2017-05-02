var mongoose   = require("mongoose");

// schema setup
var commentsScehma = new mongoose.Schema({
    text: String,
    author: {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
        username: String
    }
});

// export the comments schema
module.exports = mongoose.model("Comment", commentsScehma);