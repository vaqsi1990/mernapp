const mongoose = require('mongoose')

const { Schema } = mongoose;



const TravelSchema = new Schema({
  photos: {
        type: [String],
        
      },
      
      favourite: {
        type: Boolean,
        default: false,
      },
      continent: {
        type: String,
        required: true
      },
      cuisine: {
        type: String,
       
      },
      name: {
        type: String,
        required: true
      },
      dayOne: {
        type: String,
        required: true
      },
      dayTwo: {
        type: String,
        required: true
      },
      rating:{
        type:Number
      },
      location: {
        type: String,
        required: true
      },
      comments: [
        {
          user: {
            type: String
          },
          text: {
            type: String,
          
          },
          createdAt: {
            type: Date,
            default: Date.now,
          },
        }
      ]
}, { timestamps: true })

module.exports = mongoose.model('Travel', TravelSchema);