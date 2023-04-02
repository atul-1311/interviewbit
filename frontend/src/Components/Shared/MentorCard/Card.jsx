import React from 'react';
import styles from './Card.module.css';
import { useDispatch } from 'react-redux';
import { setMentor } from '../../../Store/mentorSlice';
import { useNavigate } from 'react-router-dom';

const Card = ({mentor}) => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    function clicked(){
        dispatch(setMentor(mentor));
        navigate('/mystudents');
    }

     return (
        <div className={styles.cardWrapper}>
            <div className={styles.card} onClick={clicked}>
                <div className={styles.avatar}>
                    <img src="/images/mentor-icon.png" alt="mentor-icon" />
                </div>
                <div className={styles.info}>
                    <div className={styles.id}>
                        <h2 className={styles.text}>{mentor.mentorId}</h2>
                        <h2 className={styles.text}>{mentor.mentorName}</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card