const Mentor = require("../models/mentor-model");
const studentService = require("../services/student-service");

class MentorService{

    async findMentor(filter){

        // Find the mentor with filter in database
        const mentor = await Mentor.findOne(filter);
        return mentor;
    }



    async createMentor(data){

        // Create a mentor in database with the data
        const mentor = await Mentor.create(data);
        return mentor;
    }



    async addStudent(data){
        
        // Find mentor with the id
        const mentor = await Mentor.findOne({ _id: data.mentorId });
        // const numberOfStudents = mentor.studentIds.length;

        try{

            // update the mentor 
            await Mentor.updateOne({ _id: mentor._id }, {
                $push: { studentIds: data.studentId }
            })
        }catch(err){
            console.log(err);
            return mentor;
        }

        const status = true;
        const id = data.studentId;

        // set the status of the student
        studentService.setStatus({ id, status });
        return mentor;

    }



    async removeStudent(data){
        
        const mentor = await Mentor.findOne({ _id: data.mentorId });
        // const numberOfStudents = mentor.studentIds.length;

        try{
            // update mentor
            await Mentor.updateOne({ _id: mentor._id }, {
                $pull: { studentIds: data.studentId }
            })
        }catch(err){
            console.log(err);
            updated = false;
            return mentor;
        }

        const status = false;
        const id = data.studentId;

        // update student
        studentService.setStatus({ id, status});

        return mentor;
    }



    async submit(id){
        
        // update mentor
        await Mentor.updateOne({ _id: id }, {
            submit : true
        });

        const mentor = await Mentor.findOne({_id: id});
        const students = mentor.studentIds;
        let updatedStudents;
        try{

            // update students
            updatedStudents = studentService.submit(students);
        }catch(err){
            console.log(err);
        }

        return updatedStudents;
    }


    async mentors(){
        const mentors = await Mentor.find();
        return mentors;
    }


    async getMyStudents(id){
        const mentor = await Mentor.findOne({ _id:id });
        const ids = mentor.studentIds;

        const allStudents = studentService.getStudents(ids);

        return allStudents;
    }
}


module.exports = new MentorService();