import React, { useState, useEffect } from 'react';
import styles from './Students.module.css';
import Card from '../../Components/Shared/StudentCard/Card';
import { getStudents } from '../../http';
import { useDispatch } from 'react-redux';
import { setMentorStudents } from '../../Store/studentSlice';

const Students = () => {

    const [students, setStudents] = useState([]);
    const [status, setStatus] = useState(0);

    function stAssigned(){
        setStatus(1);
    }
    
    function stNotAssigned(){
        setStatus(2);
    }

    function stAll(){
        setStatus(0);
    }

    useEffect(() => {
        async function allStudents(){
            const { data } = await getStudents();
            console.log(data);
            setStudents(data);
        }

        allStudents();
      }, [status]);

    const dispatch = useDispatch();
    dispatch(setMentorStudents(students))

    return (
        <>
            <div className={styles.filters}>
                <div className={styles.filter}>
                    <div className={styles.assigned}>
                        <button onClick={stAssigned} className={styles.status}>Assigned</button>
                    </div>
                    <div className={styles.assigned}>
                        <button onClick={stAll} className={styles.status}>All Students</button>
                    </div>
                    <div className={styles.assigned}>
                        <button onClick={stNotAssigned} className={styles.status}>NotAssigned</button>
                    </div>
                </div>
            </div>
            <div className={styles.hero}>
                <div className={styles.wrapper}>
                    {
                        students.map(student => <Card key={student._id} student={student} status={status} />)
                    }
                </div>
            </div>
        </>
    )
}

export default Students