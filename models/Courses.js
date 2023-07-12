const mongoose = require('mongoose');

const CoursesSchema = new mongoose.Schema({
    title:{
        type: String,
        trim: true,
        required: [true, 'Please add a course title.']
    },
    description:{
        type: String,
        required: [true,'Please add a description.']
    },
    weeks:{
        type: String,
        required: [true,'Please add number of weeks.']
    },
    tuition:{
        type: Number,
        required: [true,'Please add tution costs.']
    },
    minimumSkill:{
        type: String,
        required:[true, 'Please add a minimum skill'],
        enum:['beginner','intermediate','advanced']
    },
    ScholershipAvailable:{
        type: Boolean,
        default: false
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

// Static method to get avg of course tuitions
CoursesSchema.statics.getAverageCost = async function(bootcampId){
    const obj = await this.aggregate([{
        $match: {bootcamp: bootcampId}
    },
    {
        $group:{
            _id: '$bootcamp',
            averageCost: {$avg: '$tuition'}
        }
    }]);
    try {
        await this.model('Bootcamp').findByIdAndUpdate(bootcampId,{
            averageCost: obj[0]?Math.ceil(obj[0].averageCost / 10) * 10: undefined
        })
    } catch (error) {
        console.error(error)
    }

}

//Call averageCost after save
CoursesSchema.post('save', async function(){
    this.constructor.getAverageCost(this.bootcamp)
})

//Call averageCost before remove
CoursesSchema.post('remove',async function(){
    this.constructor.getAverageCost(this.bootcamp)
})

// Call getAverageCost after tuition update
CoursesSchema.post("findOneAndUpdate", async function (doc) {
    if (this.tuition != doc.tuition) {
      await doc.constructor.getAverageCost(doc.bootcamp);
    }
  });

module.exports = mongoose.model('Courses', CoursesSchema)