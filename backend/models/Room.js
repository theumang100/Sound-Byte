const mongoose = require('mongoose')

const RoomSchema = new mongoose.Schema({
    id: String,
    name: String
})
const RoomModel = mongoose.model("rooms", RoomSchema)
module.exports = RoomModel
