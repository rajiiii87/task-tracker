const taskModel = require("../model/taskModel");

const createTask = async (req, res) => {
    try {
        const { task_name, description, status } = req.body;
        if (!task_name) {
            return res.status(417).json({
                success: false,
                error: "task_name is Required",
                error_description: "task_name Field Must not be empty",
            });
        }
        if (!status) {
            return res.status(417).json({
                success: false,
                error: "status is Required",
                error_description: "status Field Must not be empty",
            });
        }
        const task = new taskModel({
            task_name,
            status,
            description
        });
        await task.save()
            .then((response) => {
                res.status(200).json({
                    success: true,
                    message: "task created Successfully",
                    data: response,
                });
            });
    } catch (err) {
        res.status(500).json({ success: false, error: err });
    }
};

const getAllTasks = async (req, res) => {
    try {
        const taskResult = await taskModel.find({});
        if (taskResult) {
            return res.status(200).json({
                success: true,
                data: taskResult,
            });
        }
        return res.status(400).json({
            success: false,
            error: "something went wrong",
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err });
    }
};

const updateSingleTask = async (req, res) => {
    try {
        const { task_id } = req.params;
        const { task_name, description, status } = req.body;
        if (!task_id) {
            return res.status(417).json({
                success: false,
                message: "Task id is not must be empty"
            });
        }
        const taskResult = await taskModel.findById(task_id);
        if (!taskResult) {
            return res.status(400).json({
                success: false,
                message: "Task id is invalid"
            });
        }
        if (task_name) taskResult.task_name = task_name;
        if (description) taskResult.description = description;
        if (status) taskResult.status = status;
        const result = await taskResult.save();
        if (!result) {
            return res.status(400).json({
                success: false,
                message: "something went wrong"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Task results are updated"
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err });
    }
};

const getTaskById = async (req, res) => {
    try {
        const { task_id } = req.params;
        if (!task_id) {
            return res.status(417).json({
                success: false,
                message: "Task id is not must be empty"
            });
        }
        const taskResult = await taskModel.findById(task_id);
        if (taskResult) {
            return res.status(200).json({
                success: true,
                data: taskResult,
            });
        }
        return res.status(400).json({
            success: false,
            error: "something went wrong",
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err });
    }
};

const deleteTaskById = async (req, res) => {
    try {
        const { task_id } = req.params;
        if (!task_id) {
            return res.status(417).json({
                success: false,
                message: "Task id is not must be empty"
            });
        }
        const deletedTask = await taskModel.findByIdAndDelete(task_id);
        if (deletedTask) {
            return res.status(200).json({
                success: true,
                message: "task deleted Successfully",
                data: deletedTask,
            });
        }
        return res.status(404).json({
            success: false,
            error: "Cant Find Task",
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err });
    }
};

const resetTaskStatus = async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) {
            return res.status(417).json({
                success: false,
                error: "userId is Required",
                error_description: "userId Field Must not be empty",
            });
        }
        const tasks = await taskModel.updateMany({ assignedTo: userId }, { status: 'todo' });
        if (tasks.nModified > 0) {
            return res.status(200).json({
                success: true,
                message: "Task statuses reset successfully",
                data: tasks,
            });
        } else {
            return res.status(404).json({
                success: false,
                error: "No tasks found for the user",
            });
        }
    } catch (err) {
        res.status(500).json({ success: false, error: err });
    }
};

module.exports = { createTask, getAllTasks, getTaskById, deleteTaskById, updateSingleTask, resetTaskStatus };
