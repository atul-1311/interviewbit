import React, { useState } from 'react';
import styles from './MyStudentsCard.module.css';
import { updateMarks, removeStudent } from '../../../http';
import { useSelector, useDispatch } from 'react-redux';
import { setRemoved } from '../../../Store/mentorSlice';
import { useNavigate } from 'react-router-dom';


const MyStudentsCard = ({ student }) => {

  const studentId = student._id;
  const mentorId = useSelector((state)=> state.mentorSlice.mentor._id);
  let noOfStudents = useSelector((state)=> state.mentorSlice.mentor.studentIds);
  let submitted = false;
  submitted = useSelector((state)=> state.mentorSlice.mentor.submit);
  const [ideation, setIdeation] = useState(student.marks.Ideation);
  const [viva, setViva] = useState(student.marks.Viva);
  const [execution, setExecution] = useState(student.marks.Execution);
  const [presentation, setPresentation] = useState(student.marks.Presentation);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function update(){
    const { data } = await updateMarks({ studentId, ideation, viva, execution, presentation  })
    console.log(data);
  }

  let removed = useSelector((state)=> state.mentorSlice.removed);

  async function remove(){
    const { data } = await removeStudent({ studentId, mentorId });
    if(removed)
    removed=false;
    else
    removed=true;
    dispatch(setRemoved(removed));
    navigate('/')
    console.log(data);
  }

  

  return (
    <div className={styles.cardWrapper}>
        <div className={styles.card}>
            <div className={styles.avatar}>
                <img src="/images/student-icon.png" alt="student-icon" />
            </div>
            <div className={styles.info}>
                <div className={styles.infoWrap}>
                    <div className={styles.name}>
                      <h2 className={styles.text}>{student.studentId}</h2>
                      <h2 className={styles.text}>{student.studentName}</h2>
                    </div>
                    <h2 className={styles.text}>cgpa : {student.cgpa}</h2>
                    <div className={styles.form}>
                      <div className={styles.data}>
                        <h3 className={styles.text}>Ideation :</h3>
                        <input className={styles.input} type='number' value={ideation} onChange={(e)=> setIdeation(e.target.value)} />
                        <h3 className={styles.text}>Viva :</h3>
                        <input className={styles.input} type='number' value={viva} onChange={(e)=> setViva(e.target.value)} />
                      </div>
                      <div className={styles.data}>
                        <h3 className={styles.text}>Execution :</h3>
                        <input className={styles.input} type='number' value={execution} onChange={(e)=> setExecution(e.target.value)} />
                        <h3 className={styles.text}>Presentation :</h3>
                        <input className={styles.input} type='number' value={presentation} onChange={(e)=> setPresentation(e.target.value)} />
                      </div>
                    </div>
                    <h2 className={styles.text}>Total : &nbsp;
                        { parseInt(ideation) + parseInt(viva) + parseInt(presentation) + parseInt(execution)  }
                    </h2>
                    { 
                      !submitted && <button className={styles.update} onClick={update}> Update </button>
                    }
                    { 
                      noOfStudents.length===4 && !submitted && <button className={styles.update} onClick={remove}> Remove </button> 
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default MyStudentsCard