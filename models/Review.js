const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    title:{
        type: String,
        trim: true,
        required: [true, 'Please add a title for the review.'],
        maxlength: 100
    },
    text:{
        type: String,
        required: [true,'Please add some text.']
    },
    rating:{
        type: Number,
        min:1,
        max:10,
        required: [true,'Please add a rating between 1 and 10.']
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    bootcamp:{
        type: mongoose.Schema.ObjectId,
        ref: 'Bootcamp',
        required:true
    },
    user:{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required:true
    }
})

//prevent user to add more than 1 review per bootcamp
ReviewSchema.index({bootcamp: 1, user: 1}, {unique: true})

//static method to the get the average rating and save
ReviewSchema.statics.getAverageRating = async function(bootcampId){
    const obj = await this.aggregate([{
        $match: {bootcamp: bootcampId}
    },
    {
        $group:{
            _id: '$bootcamp',
            averageRating: {$avg: '$rating'}
        }
    }]);
    try {
        if (obj[0]) {
          await this.model("Bootcamp").findByIdAndUpdate(bootcampId, {
            averageRating: obj[0].averageRating.toFixed(1),
          });
        } else {
          await this.model("Bootcamp").findByIdAndUpdate(bootcampId, {
            averageRating: undefined,
          });
        }
      }  catch (err) {
        console.error(err);
      }

}

//Call averageRating after save
ReviewSchema.post('save',function(){
    this.constructor.getAverageRating(this.bootcamp)
})

//Call averageRating before remove
ReviewSchema.post('remove',function(){
    this.constructor.getAverageRating(this.bootcamp)
})

module.exports = mongoose.model('Review', ReviewSchema)