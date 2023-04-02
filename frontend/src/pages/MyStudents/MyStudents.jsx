import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getMyStudents, submit } from '../../http';
import Card from '../../Components/Shared/MyStudentsCard/MyStudentsCard';
import styles from './MyStudents.module.css';
import { useNavigate } from 'react-router-dom';


const MyStudents = () => {

    // Get Students
    const [students, setStudents] = useState([]);
    let id, removed; 
    let submitted=false;

    // Get state values
    id = useSelector((state)=> state.mentorSlice.mentor._id)
    submitted = useSelector((state)=> state.mentorSlice.mentor.submit)
    removed = useSelector((state)=> state.mentorSlice.removed);


    const navigate = useNavigate();

    useEffect(() => {

        // Api Call
        async function myStudents(){
            const { data } = await getMyStudents({id:id})
            setStudents(data);
        }

        myStudents();
      }, [removed]);

    async function submitClicked(){

        // Api Call
        const { data } = await submit({mentorId: id});
        console.log(data);
        navigate('/');
    }

    return (
        <>
            {
                // If mentor has not submitted then show submit button
                !submitted && <div className={styles.myButton}>
                                <button className={styles.submit} onClick={submitClicked}>Submit</button>
                                </div>
            } 
            <div className={styles.hero}>
                <div className={styles.wrapper}>
                    {
                        students.map(student => <Card key={student._id} student={student} />)
                    }
                </div>
                
            </div>
            
        </>
    )
}

export default MyStudents