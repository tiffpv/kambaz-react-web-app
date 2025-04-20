import { createSlice } from "@reduxjs/toolkit";
//import { assignments } from "../../Database";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  quizzes: [],
};
const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
    },
    addQuiz: (state, { payload: quizzes }) => {
      const newQuiz: any = {
        _id: uuidv4(),
        title: quizzes.title,
        course: quizzes.course,
        module: quizzes.module,
        availableDate: quizzes.availableDate,
        untilDate: quizzes.untilDate,
        points: quizzes.points,
        publish: false,
        type: quizzes.type,
        questions: quizzes.questions,
        description: quizzes.description,
        dueDate: quizzes.dueDate,
        shuffleAnswers: false,
        timeLimit: 20,
        multipleAttempts: false,
        showCorrectAnswers: "Immediately",
        accessCode: "",
        oneQuestionAtATime: true,
        webcamRequired: false,
        lockAfterAnswer: false,
      };
      state.quizzes = [...state.quizzes, newQuiz] as any;
    },

    deleteQuiz: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.filter(
        (q: any) => q._id !== quizId
      );
    },

    updateQuiz: (state, { payload: quiz }) => {
      state.quizzes = state.quizzes.map((q: any) => 
        q._id === quiz._id ? quiz : q
      ) as any;
    },
  },
});



export const { setQuizzes, addQuiz, deleteQuiz, updateQuiz } =
  quizzesSlice.actions;
export default quizzesSlice.reducer;