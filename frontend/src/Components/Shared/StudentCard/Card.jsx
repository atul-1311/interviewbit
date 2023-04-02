import React from 'react';
import styles from './Card.module.css';
import { addStudent } from '../../../http';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

const Card = ({student, status}) => {

    const navigate = useNavigate();
    const assigned = student.assigned;
    const studentId = student._id;
    const mentorId = useSelector((state)=> state.mentorSlice.mentor._id);
    let numberOfStudents = useSelector((state)=> state.mentorSlice.mentor.studentIds);
    let submitted = false;
    submitted = useSelector((state)=> state.mentorSlice.mentor.submit);

    async function add(){
        const { data } = await addStudent({ studentId, mentorId })
        console.log(data);
        navigate('/')
    }

     return (
        <>
        {
            status===0 && <div className={styles.cardWrapper}>
            <div className={styles.card}>
                <div className={styles.avatar}>
                    <img src="/images/student-icon.png" alt="student-icon" />
                </div>
                <div className={styles.info}>
                    <div className={styles.id}>
                        <h2 className={styles.text}>{student.studentId}</h2>
                        <h2 className={styles.text}>{student.studentName}</h2>
                        <h2 className={styles.text}>cgpa : {student.cgpa}</h2>
                        <h2 className={styles.text}>Total : &nbsp;
                            {student.marks.Ideation + student.marks.Viva + student.marks.Execution + student.marks.Presentation}
                        </h2>
                        {
                            !assigned && numberOfStudents.length<=3 && !submitted && <button className={styles.add} onClick={add}> Add </button>
                        }
                    </div>
                </div>
            </div>
            </div>
        }
        {
            status===1 && student.assigned && <div className={styles.cardWrapper}>
            <div className={styles.card}>
                <div className={styles.avatar}>
                    <img src="/images/student-icon.png" alt="student-icon" />
                </div>
                <div className={styles.info}>
                    <div className={styles.id}>
                        <h2 className={styles.text}>{student.studentId}</h2>
                        <h2 className={styles.text}>{student.studentName}</h2>
                        <h2 className={styles.text}>cgpa : {student.cgpa}</h2>
                        <h2 className={styles.text}>Total : &nbsp;
                            {student.marks.Ideation + student.marks.Viva + student.marks.Execution + student.marks.Presentation}
                        </h2>
                        {
                            !assigned && numberOfStudents.length<=3 && !submitted && <button className={styles.add} onClick={add}> Add </button>
                        }
                    </div>
                </div>
            </div>
            </div>
        }
        {
            status===2 && !student.assigned && <div className={styles.cardWrapper}>
            <div className={styles.card}>
                <div className={styles.avatar}>
                    <img src="/images/student-icon.png" alt="student-icon" />
                </div>
                <div className={styles.info}>
                    <div className={styles.id}>
                        <h2 className={styles.text}>{student.studentId}</h2>
                        <h2 className={styles.text}>{student.studentName}</h2>
                        <h2 className={styles.text}>cgpa : {student.cgpa}</h2>
                        <h2 className={styles.text}>Total : &nbsp;
                            {student.marks.Ideation + student.marks.Viva + student.marks.Execution + student.marks.Presentation}
                        </h2>
                        {
                            !assigned && numberOfStudents.length<=3 && !submitted && <button className={styles.add} onClick={add}> Add </button>
                        }
                    </div>
                </div>
            </div>
            </div>
        }
        </>
    )
}

export default Card