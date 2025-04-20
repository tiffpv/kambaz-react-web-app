import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;
const QUIZ_ATTEMPTS_API = `${REMOTE_SERVER}/api/attempts`;

export const removeQuiz = async (quizId: string) => {
    const response = await axiosWithCredentials.delete(`${QUIZZES_API}/${quizId}`);
    return response.data;
};
export const updateQuiz = async (quiz: any) => {
    const { data } = await axiosWithCredentials.put(`${QUIZZES_API}/${quiz._id}`, quiz);
    return data;
};
export const getQuiz = async (quizId: string) => {
    const { data } = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}`);
    return data;
};
export const publishQuiz = async (quizId: string) => {
    const { data } = await axiosWithCredentials.put(`${QUIZZES_API}/${quizId}/publish`);
    return data;
};
export const findQuizzesForCourse = async (courseId: string) => {
    const { data } = await axiosWithCredentials.get(
      `${REMOTE_SERVER}/api/courses/${courseId}/quizzes`
    );
    return data;
};
export const createQuizForCourse = async (courseId: string, quiz: any) => {
    const { data } = await axiosWithCredentials.post(
      `${REMOTE_SERVER}/api/courses/${courseId}/quizzes`,
      quiz
    );
    return data;
};
export const createAttempt = async (attempt: any) => {
    const { data } = await axiosWithCredentials.post(`${QUIZ_ATTEMPTS_API}`, attempt);
    return data;
};
export const getLastAttempt = async (userId: string, quizId: string) => {
    const { data } = await axiosWithCredentials.get(`${QUIZ_ATTEMPTS_API}/${userId}/${quizId}/last`);
    return data;
};
export const getAttemptCount = async (userId: string, quizId: string) => {
    const { data } = await axiosWithCredentials.get(`${QUIZ_ATTEMPTS_API}/${userId}/${quizId}/count`);
    return data;
};


