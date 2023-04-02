import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    mentor: null,
    removed: false
}

export const mentorSlice = createSlice({
    name: 'mentor',
    initialState,
    reducers: {

        setMentor: (state, action) => {
            const mentor = action.payload;
            state.mentor = mentor;
        },

        setRemoved: (state, action) => {
            const removed = action.payload;
            state.removed = removed
        }
    },
})

// Action creators are generated for each case reducer function
export const { setMentor, setRemoved } = mentorSlice.actions

export default mentorSlice.reducer