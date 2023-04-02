const Student = require("../models/student-model");
// const mailService = require('../services/email-service');

class StudentService{

    async findStudent(filter){

        // Find the student matcing the filter:id
        const student = await Student.findOne(filter);
        return student;
    }



    async createStudent(data){

        // Create a student in database using data
        const student = await Student.create(data);
        return student;
    }



    async setStatus(data){
        try{
            // Update the student having _id as id, and the status from data
            await Student.updateOne({ _id: data.id }, { assigned: data.status });

        }catch(err){
            console.log(err);
        }
    }



    async submit(data){

        // get the student ids from the array
        const students = data;
        let updatedStudents = [];
        // Traverse each student id and update it's submit field
        for(let i=0; i<students.length; i++){
            try{
                await Student.updateOne({ _id: students[i] }, { Submitted: true });
                const student = await Student.findOne( { _id: students[i] })
                updatedStudents.push(student);
                let total = 0;
                total = student.marks.Viva + student.marks.Ideation + student.marks.Execution + student.marks.Presentation;
                console.log(total);

                // email sending service
                // const response = mailService.sendEmail({
                //     from: 'atulranjan.1311@gmail.com',
                //     sendername: "atul",
                //     to: student.email,
                //     subject: "Total Marks",
                //     text: `Your total evaluation marks is ${total}`
                // })

                // res.status(200).json({success: true});
                // console.log(response);

                console.log("success");

            }catch(err){
                console.log(err);
            }
        }

        return updatedStudents;
    }



    async update(data){

        // get the data from the parameters
        const id = data.studentId;
        const Ideation = data.ideation;
        const Execution = data.execution;
        const Viva = data.viva;
        const Presentation = data.presentation;

        // create student variable
        let student;
        try{

            // update the student
            await Student.updateOne({_id: id}, {
                
                    "marks.Ideation": Ideation,
                    "marks.Execution": Execution,
                    "marks.Viva": Viva,
                    "marks.Presentation": Presentation

            })

            // get the student
            student = await Student.findOne({_id: id});
        }catch(err){
            console.log(err);
        }

        return student;
    }


    async students(){
        const students = await Student.find();
        return students;
    }

    async getStudents(ids){
        let allStudents = [];

        for(let i=0; i<ids.length; i++){
            const student = await Student.findOne({ _id: ids[i] });
            allStudents.push(student);
        }

        return allStudents;
    }
}


module.exports = new StudentService();