const mentorService = require('../services/mentor-service');
const { jsPDF } = require("jspdf"); // will automatically load the node version
const path = require('path');
const crypto = require('crypto')

class MentorController{

    async createMentor(req, res){
        
        // Get data from the frontend
        const { mentorId, mentorName, studentIds } = req.body;

        // If mentor ID or mentor Name is not present, send a message to require all data
        if(!mentorId || !mentorName){
            res.status(404).send("All fields are required");
        }

        // create a mentor
        let mentor;

        // check if the mentor is already present, then return mentor.
        // Else create new mentor in database and return it.
        try{
            mentor = await mentorService.findMentor({mentorId});
            if(!mentor){
                mentor = await mentorService.createMentor({mentorId, mentorName, studentIds});
            }
        }catch(err){
            console.log(err);
            res.status(500).json({message: "DB error"});
        }

        // return status 200 if everything is ok.
        res.status(200).send(mentor);
    }

    async addStudent(req, res){
        
        // destructure the data from the body
        const { studentId, mentorId } = req.body;

        // if data is missing, send the message
        if(!studentId || !mentorId){
            res.status(404).send("ID is missing");
        }

        // create mentor variable
        let mentor;
        try{
            
            // call the addStudent method from the mentor-service file
            mentor = await mentorService.addStudent({studentId, mentorId});

            if(!mentor){
                res.status(500).json({message: "Can't add student"});
            }

        }catch(err){
            console.log(err);
            res.status(500).json({message: "DB error"});
        }
        res.status(200).send(mentor);
    }

    async removeStudent(req, res){

        const { studentId, mentorId } = req.body;
        if(!studentId || !mentorId){
            res.status(404).send("ID is missing");
        }

        let mentor;
        try{

            // call the removeStudent method from the mentor-service
            mentor = await mentorService.removeStudent({studentId, mentorId});

        }catch(err){
            console.log(err);
            res.status(500).json({message: "DB error"});
        }

        res.status(200).send(mentor);
    }

    async submit(req, res){
        const { mentorId } = req.body;
        
        let updatedStudents;
        
        try{

            // call the submit function from the mentor-service file
            updatedStudents = await mentorService.submit(mentorId);
            
        }catch(err){
            console.log(err);
            res.status(500).json({message: "DB error"});
        }

        const doc = new jsPDF();
        // doc.text("Hello world!", 10, 10);
        for(let i=0; i<updatedStudents.length; i++){
            const name = updatedStudents[i].studentName;
            const ideation = updatedStudents[i].marks.Ideation;
            const viva = updatedStudents[i].marks.Viva;
            const execution = updatedStudents[i].marks.Execution;
            const presentation = updatedStudents[i].marks.Presentation;

            doc.text(`Name: ${name}`, 10, 20*(i+1)+10);
            doc.text(`Ideation: ${ideation}, Viva: ${viva}, Execution: ${execution}, Presentation: ${presentation}`, 10, 20*(i+2));
        }
        const fileName = crypto.randomBytes(4).toString('hex');
        doc.save(`${fileName}.pdf`); // will save the file in the current working directory
        res.status(200).send(updatedStudents);
    }

    async getMentors(req, res){
        let mentors;

        try{
            mentors = await mentorService.mentors();
        }catch(err){
            console.log(err);
            res.status(500).send("DB error")
        }
        res.status(200).send(mentors);
    }

    async getMyStudents(req, res){
        const { id } = req.body;
        const allStudents = await mentorService.getMyStudents(id)
        res.status(200).send(allStudents);
    }
}

module.exports = new MentorController();