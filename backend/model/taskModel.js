var mongoose = require('mongoose')

var taskSchema = new mongoose.Schema({
    task_name : {type:String},
    start_date:{type:Date},
    end_date :{type:Date},
    description:{type:String},
    status: { type:String }
})

const taskModel = mongoose.model('Task',taskSchema,'Task')
module.exports = taskModel