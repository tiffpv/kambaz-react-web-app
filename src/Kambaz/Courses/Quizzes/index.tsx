import QuizButtons from "./QuizButtons";
import { ListGroup } from "react-bootstrap"; 
import { BsGripVertical } from "react-icons/bs";
import { LuNotebookPen } from "react-icons/lu";
import { IoMdArrowDropdown } from "react-icons/io";
import QuizControl from "./QuizControl";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { findQuizzesForCourse } from "../Quizzes/client";
import { setQuizzes } from "./reducer";  


export default function Quizzes() {
    const { cid } = useParams();
    const { quizzes } = useSelector((state: any) => state.quizzesReducer);
    const dispatch = useDispatch();
    const fetchQuizzes = async () => {
        const data = await findQuizzesForCourse(cid!);
        dispatch(setQuizzes(data));
    };
    useEffect(() => {
      fetchQuizzes();
    }, [cid]);

  return (
    <div className="p-4">
      <QuizButtons /><br /><br /><br /><br />
      <ListGroup className="rounded-0" id="wd-quizzes">
        <ListGroup.Item className="wd-assignments p-0 mb-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center fw-bold">
              <BsGripVertical className="me-2 fs-3" />
              <IoMdArrowDropdown className="me-2 fs-4" />
              Assignment Quizzes
            </div>
          </div>
          {quizzes.map((quiz: any) => (
            
            <ListGroup.Item
              key={quiz._id}
              as={Link}
              to={`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}`}
              className="d-flex align-items-center p-3 border-bottom text-dark text-decoration-none"
              style={{ cursor: "pointer" }}
            >
              <BsGripVertical className="fs-4 text-muted me-3" />
              <LuNotebookPen className="fs-4 text-secondary me-3" />
              <div className="flex-grow-1">
                <h5 className="mb-1 fw-bold">{quiz.title}</h5>
                <p className="mb-0 text-muted small">
                  <span className="text-danger">{quiz.module}</span> | 
                  <span className="fw-bold"> Not available until </span> {quiz.untilDate} | <br />
                  <span className="fw-bold"> Due </span> {quiz.dueDate} | {quiz.points} pts
                </p>
              </div>
              <QuizControl 
                quizId={quiz._id}
                title={quiz.title}
                published={quiz.published}
              />
            </ListGroup.Item>
          ))}
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}