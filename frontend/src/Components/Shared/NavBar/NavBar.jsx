import React from 'react';
import styles from './NavBar.module.css';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div className={styles.navbar}>
        <div className={styles.logo}>
            <h1 className={styles.text}>Mentoring</h1>
        </div>
        <div className={styles.links}>
            <Link className={styles.link} to='/'>Mentors</Link>
            <Link className={styles.link} to='/students'>Students</Link>
            <Link className={styles.link} to='/mystudents'>My Students</Link>
        </div>
    </div>
  )
}

export default NavBar;