const express = require('express');
const router = express.Router();

const TaskController = require('../controller/tasks.controller');

router.route('/:userId')
      .get(TaskController.getAllTasks);

router.route('/:userId/complete')
     .get(TaskController.getCompletedTasks);
     
router.route('/:userId/incomplete')
     .get(TaskController.getIncompleteTasks);

router.route('/:userId/add')
     .post(TaskController.createTask);

router.route('/:userId/update/:taskId')
        .put(TaskController.updateTask);

router.route('/:userId/delete/:taskId')
        .delete(TaskController.deleteTask);

module.exports = router;
