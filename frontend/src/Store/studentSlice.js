import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    students: null
}

export const studentSlice = createSlice({
    name: 'students',
    initialState,
    reducers: {

        setMentorStudents: (state, action) => {
            const students = action.payload;
            state.students = students;
        }
    },
})

// Action creators are generated for each case reducer function
export const { setMentorStudents } = studentSlice.actions

export default studentSlice.reducer