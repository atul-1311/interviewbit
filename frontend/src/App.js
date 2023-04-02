import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import NavBar from './Components/Shared/NavBar/NavBar';
import Students from './pages/Students/Students';
import MyStudents from './pages/MyStudents/MyStudents';


// All routes

function App() {
    return <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path='/' exact element={<Home />} />
                    <Route path='/students' element={<Students />} />
                    <Route path='/mystudents' element={<MyStudents />} />
                </Routes>
            </BrowserRouter>
}

export default App;
