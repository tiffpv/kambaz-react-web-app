import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "./Courses/Modules/reducer";
import accountReducer from "./Account/reducer";
import assignmentReducer from "./Courses/Assignments/reducer";
import coursesReducer from "./Courses/reducer"
import enrollmentReducer from "./Enrollments/reducer";
import quizzesReducer from "./Courses/Quizzes/reducer"


const store = configureStore({
  reducer: {
    modulesReducer,
    accountReducer,
    assignmentReducer,
    coursesReducer,
    enrollmentReducer,
    quizzesReducer,

  },
});
export default store;