const mongoose = require('mongoose')

const { Schema } = mongoose;

const savedSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },
    items: [
        {
            travels: {
                type: Schema.Types.ObjectId,
                ref: 'Travel',
                required: true,
            },
            photos: {
                type: [String],
                
              },
            name: { type: String, required: true },  
            location: { type: String, required: true }
        },
    ],
})

module.exports = mongoose.model('Saved', savedSchema);