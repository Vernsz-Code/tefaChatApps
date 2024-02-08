const ChatModel = require('../model/chatModel');

module.exports.sendMessage = async (req, res, next) => {
    try{
        const {messageContent, from, to} = req.body;
        const data = await ChatModel.create({
            messageContent: messageContent,
            users: [from, to],
            sender: from,
        })
        if(data) return res.json("successfully to create");
    
        return res.json("Failed to create")
    }
    catch(err){
        next(err)
    }
}

module.exports.getMessages = async (req, res, next) => {
    try{
        const {from, to} = req.body;
        const messageContent = await ChatModel.find({
            users: {
                $all: [from, to],
            },
        })
        .sort({updatedAt : 1})
        const messageData = messageContent.map((msg)=> {
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.messageContent
            }
        })
        res.json(messageData)
    }
    catch(err){
        next(err)
    }
}