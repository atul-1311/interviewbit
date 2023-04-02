import axios from 'axios';

// api creation
const api = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
        'Content-type': 'application/json',
        Accept: 'application/json'
    }
});


// list of all the end points

export const getMentors = ()=> api.get('/mentors');
export const getStudents = ()=> api.get('/students');
export const getMyStudents = (data)=> api.post('/mystudents', data);
export const updateMarks = (data)=> api.post('/api/update', data);
export const removeStudent = (data)=> api.post('/api/remove-student', data);
export const addStudent = (data)=> api.post('/api/add-student', data);
export const submit = (data)=> api.post('/api/submit', data);

export default api;