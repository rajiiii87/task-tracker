const express = require('express')
const { getTaskById, createTask, deleteTaskById, getAllTasks, updateSingleTask, resetTaskStatus } = require('../controller/taskController')

const taskRouter = express.Router()

taskRouter.post('/create-task',createTask)
taskRouter.get('/get-all-tasks',getAllTasks)
taskRouter.get('/get-task/:task_id',getTaskById)
taskRouter.post('/update-task/:task_id',updateSingleTask)
taskRouter.delete('/delete-task/:task_id',deleteTaskById)
taskRouter.post('/reset-task-status',resetTaskStatus)

module.exports = taskRouter