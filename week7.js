// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');

// Initialize Express app
const app = express();

// Set up middleware
app.use(express.json());

// MongoDB connection URI
const mongoURI = 'mongodb://localhost:27017/student_tasks';

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Define schema for course
const courseSchema = new mongoose.Schema({
  courseId: { type: String, required: true },
  courseName: String
});

// Create course model
const Course = mongoose.model('Course', courseSchema);

// Define schema for task
const taskSchema = new mongoose.Schema({
  courseId: { type: String, required: true },
  taskName: { type: String, required: true },
  dueDate: { type: Date, required: true },
  additionalDetails: String
});

// Create task model
const Task = mongoose.model('Task', taskSchema);

// Frontend interface (HTML, CSS, JavaScript)
// HTML and CSS code for frontend interface
const frontendHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Task Management</title>
<style>
  /* Your CSS styles here */
</style>
</head>
<body>
  <h1>Task Management</h1>
  <form id="taskForm">
    <label for="courseId">Course ID:</label>
    <input type="text" id="courseId" name="courseId" required><br><br>
    <label for="taskName">Task Name:</label>
    <input type="text" id="taskName" name="taskName" required><br><br>
    <label for="dueDate">Due Date:</label>
    <input type="date" id="dueDate" name="dueDate" required><br><br>
    <label for="additionalDetails">Additional Details:</label><br>
    <textarea id="additionalDetails" name="additionalDetails"></textarea><br><br>
    <button type="submit">Submit</button>
  </form>
  <div id="taskList"></div>

  <script>
    // JavaScript functions to handle form submission and send task data to backend
    document.getElementById('taskForm').addEventListener('submit', async (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const taskData = {
        courseId: formData.get('courseId'),
        taskName: formData.get('taskName'),
        dueDate: formData.get('dueDate'),
        additionalDetails: formData.get('additionalDetails')
      };

      try {
        const response = await fetch('/courses/' + taskData.courseId + '/tasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(taskData)
        });
        const result = await response.json();
        console.log(result);
        document.getElementById('taskList').innerText = JSON.stringify(result);
      } catch (error) {
        console.error('Error:', error);
      }
    });
  </script>
</body>
</html>
`;

// Express.js Backend Implementation
// Define route to serve frontend interface
app.get('/', (req, res) => {
  res.send(frontendHTML);
});

// Define route to handle POST request to create a new task
app.post('/courses/:courseId/tasks', async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const { taskName, dueDate, additionalDetails } = req.body;

    // Save task to MongoDB
    const newTask = await Task.create({ courseId, taskName, dueDate, additionalDetails });
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Define route to retrieve tasks for a specific course
app.get('/courses/:courseId/tasks', async (req, res) => {
  try {
    const courseId = req.params.courseId;

    // Find tasks associated with the provided courseId
    const tasks = await Task.find({ courseId });
    if (tasks.length === 0) {
      return res.status(404).json({ message: 'No tasks found for the specified course ID' });
    }
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
