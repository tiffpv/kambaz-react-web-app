import { FaPlus } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import * as quizzesClient from "./client"

export default function QuizButtons() {
  const { cid } = useParams();
  const navigate = useNavigate();
  const currentUser = useSelector(
    (state: any) => state.accountReducer.currentUser
  );
  const isFaculty = currentUser.role === "FACULTY";
  const handleAdd = async () => {
    const newQuiz = await quizzesClient.createQuizForCourse(cid!, {
      title: "New Quiz",
      course: cid,
      points: 0,
      type: "Graded Quiz",
      group: "QUIZZES",
      shuffleAnswers: false,
      timeLimit: 20,
      multipleAttempts: false,
      showCorrectAnswers: "Immediately",
      accessCode: "",
      oneQuestionAtATime: true,
      webcamRequired: false,
      lockAfterAnswer: false,
      description: "",
      published: false,
      availableDate: "",
      dueDate: "",
      untilDate: "",
      questions: [],
    });
    navigate(`/Kambaz/Courses/${cid}/Quizzes/${newQuiz._id}`);
  };
  return (
    <div
      id="wd-quizzes-control"
      className="d-flex justify-content-between align-items-center mb-3"
    >
      <div className="flex-grow-1 me-3">
        <InputGroup>
          <InputGroup.Text>
            <CiSearch />
          </InputGroup.Text>
          <FormControl placeholder="Search Quizzes..." id="wd-search-quiz" />
        </InputGroup>
      </div>
      <div className="d-flex justify-content-end">
        {isFaculty && (
          <Button
            variant="danger"
            size="lg"
            id="wd-add-quiz"
            onClick={handleAdd}
          >
            <FaPlus className="me-2" /> Quiz
          </Button>
        )}
      </div>
    </div>
  );
}
