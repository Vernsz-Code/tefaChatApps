const { default: mongoose } = require("mongoose");

const chatSchema = new mongoose.Schema(
    {
    messageContent: {
        type: String,
        required: true,
    },
    users: Array,
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("Chats", chatSchema);