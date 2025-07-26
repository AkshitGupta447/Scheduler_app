const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth.middleware')
const task = require('../models/tasks.model')
const User = require('../models/user.model'); 


router.get('/dashboard', auth, async (req, res) => {
    if (!req.user) {
        // User is not authenticated
        return res.status(401).send('Unauthorized');
    }
    // Now it's safe to access req.user.userId

        try{
          console.log("User in dashboard:", req.user);


          const tasks = await task.find({ userId: req.user._id });
          console.log("Tasks fetched:", tasks);


            res.render('dashboard', { username: req.user.username, tasks });
        } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');

    }
})

router.post('/dashboard', auth, async (req, res) => {
  const { action, taskId, title, description, deadline } = req.body;

  try {
    if (action === 'delete') {
      // Delete logic
      const deletedTask = await task.findOneAndDelete({ _id: taskId, userId: req.user._id });
      if (!deletedTask) return res.status(404).send("Task not found");
    }

    else if (action === 'update') {
      // Update logic
      const updatedTask = await task.findOneAndUpdate(
        { _id: taskId, userId: req.user._id },
        { title, description, deadline },
        { new: true }
      );
      if (!updatedTask) return res.status(404).send("Task not found");
    }

    else {
      // Default: Create task
      const newTask = new task({
        userId: req.user._id,
        title,
        description,
        deadline
      });
      await newTask.save();
    }

    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    res.status(500).send("Error handling task action");
  }
});

module.exports = router