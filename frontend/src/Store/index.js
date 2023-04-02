import { configureStore } from '@reduxjs/toolkit';
import mentorSlice from './mentorSlice';
import studentSlice from './studentSlice';

export const store = configureStore({
  reducer: {
    mentorSlice,
    studentSlice
  },
})