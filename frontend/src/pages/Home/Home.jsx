import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css'
import Card from '../../Components/Shared/MentorCard/Card'
import { getMentors } from '../../http';

const Home = () => {

    const [mentors, setMentors] = useState([]);
    
    useEffect(() => {
        async function allMentors(){
            const { data } = await getMentors();
            setMentors(data);
        }
    
        allMentors();
      }, []);

  return (
        <>
            <div className={styles.hero}>
                <div className={styles.wrapper}>
                    {
                        mentors.map(mentor => <Card key={mentor._id} mentor={mentor} />)
                    }
                </div>
            </div>
        </>
  )
}

export default Home
