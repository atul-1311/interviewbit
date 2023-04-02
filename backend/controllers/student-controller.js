const studentService = require('../services/student-service');

class StudentController{

    async createStudent(req, res){
        
        // destructure the data from the body
        const { studentId, studentName, cgpa } = req.body;

        // If student ID or student Name is not present, send a message to require all data
        if(!studentId || !studentName){
            res.status(404).send("All fields are required");
        }

        // create a student
        let student;

        // check if the student is already present, then return student.
        // Else create new student in database and return it.
        try{
            student = await studentService.findStudent({studentId})
            if(!student){
                student = await studentService.createStudent({studentId, studentName, cgpa});
            }
        }catch(err){
            console.log(err);
            res.status(500).json({message: "DB error"});
        }

        // return status 200 if everything is ok.
        res.status(200).send(student);
    }

    async updateMarks(req, res){

        // destructure data from the body
        const { studentId, ideation, execution, viva, presentation } = req.body;

        // declare student
        let student;
        try{

            // call the update function from student-service
            student = await studentService.update({ studentId, ideation, execution, viva, presentation });

        }catch(err){
            console.log(err);
            res.status(500).json({message: "DB error"});
        }

        res.status(200).send(student)
    }

    async getStudents(req, res){
        let students;

        try{
            students = await studentService.students();
        }catch(err){
            console.log(err);
            res.status(500).send("DB Error");
        }

        res.status(200).send(students);
    }
}

module.exports = new StudentController();