import { createSlice } from "@reduxjs/toolkit";
import { enrollments } from "../Database"; 
import { v4 as uuidv4 } from "uuid";

const initialState = {
  enrollments: enrollments,
};

const enrollmentSlice = createSlice({
    name: "enrollments",
    initialState,
    reducers: {
        addEnrollment: (state, { payload: enrollment }) => {
            const newEnrollment: any = {
                _id: uuidv4(),
                user: enrollment.user,
                course: enrollment.course,
            };
            state.enrollments = [...state.enrollments, newEnrollment] as any;
        },
        removeEnrollment: (state, { payload }) => {
            state.enrollments = state.enrollments.filter(
                (e) => !(e.user === payload.user && e.course === payload.course));
        }
    },
});

export const {addEnrollment, removeEnrollment} = enrollmentSlice.actions;
export default enrollmentSlice.reducer;



