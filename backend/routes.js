const router = require('express').Router();
const mentorController = require('./controllers/mentor-controller');
const studentController = require('./controllers/student-controller');

// home route
router.get('/', (req, res)=> {
    res.send("Hello from server");
})

// get routes

router.get('/mentors', mentorController.getMentors);
router.get('/students', studentController.getStudents);
router.post('/mystudents', mentorController.getMyStudents)

// post routes
router.post('/api/create-mentor', mentorController.createMentor);
router.post('/api/create-student', studentController.createStudent);
router.post('/api/add-student', mentorController.addStudent);
router.post('/api/remove-student', mentorController.removeStudent);
router.post('/api/submit', mentorController.submit);
router.post('/api/update', studentController.updateMarks);

module.exports = router;