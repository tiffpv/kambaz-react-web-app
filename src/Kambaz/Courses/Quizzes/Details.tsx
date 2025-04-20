import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaPencilAlt } from "react-icons/fa";
import * as quizzesClient from "./client"
import * as quizzesReducer from "./reducer"
//import { getQuiz, publishQuiz } from "./client";
//import { updateQuiz } from "./reducer";

export default function QuizDetails() {
    const { cid, qid } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUser = useSelector((state: any) => state.accountReducer.currentUser);
    const isFaculty = currentUser.role === "FACULTY";
    const [quiz, setQuiz] = useState<any>();

    useEffect(() => {
      const fetchQuiz = async () => {
        const latest = await quizzesClient.getQuiz(qid!);
        setQuiz(latest);
      };
      fetchQuiz();
    }, [qid]);

    if (!quiz) return <div>Quiz not found</div>;
  
    const handleEdit = () => navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/Edit`);
    const handlePreview = () => navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/Preview`);
    
    const handlePublishQuiz = async () => {
      if (!quiz) return;
      const updated = await quizzesClient.publishQuiz(quiz._id);
      dispatch(quizzesReducer.updateQuiz(updated));
      setQuiz(updated);
    }
  
    return (
      <Container className="p-4">
        <div className="d-flex justify-content-center gap-2 mb-3">
          {isFaculty ? (
            <>
              <Button variant="secondary" onClick={handlePreview}>Preview</Button>
              <Button variant="danger" onClick={handleEdit}>
                <FaPencilAlt className="me-2"/>
                  Edit
              </Button>
              <Button variant={quiz.published ? "secondary" : "success"}
                      onClick={handlePublishQuiz}
                      className="ms-2"
              >
                {quiz.published ? "Unpublish" : "Publish"}
              </Button>
            </>
          ) : (
            <Button 
                variant="primary"
                onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/Start`)}
                disabled={!quiz.published}
              >
                Start Quiz
            </Button>
          )}
        </div>
        <Card className="p-4">
          <Row>
            <Col md={4} className="d-flex align-items-start">
                <h2 className="mb-0">{quiz.title}</h2>
            </Col>
          </Row>
          <br /><br />
          <Col md={8}>
            <Row className="mb-2 text-end">
                <Col md={5}><strong>Quiz Type</strong></Col>
                <Col md={2}>{quiz.type}</Col>
            </Row>
          </Col>
          <Col md={8}>
            <Row className="mb-2 text-end">
                <Col md={5}><strong>Points</strong></Col>
                <Col md={2}>{quiz.points}</Col>
            </Row>
          </Col>
          <Col md={8}>
            <Row className="mb-2 text-end">
                <Col md={5}><strong>Assignment Group</strong></Col>
                <Col md={2}>{quiz.group}</Col>
            </Row>
          </Col>
          <Col md={8}>
            <Row className="mb-2 text-end">
                <Col md={5}><strong>Shuffle Answers</strong></Col>
                <Col md={2}>{quiz.shuffleAnswers ? "Yes" : "No"}</Col>
            </Row>
          </Col>
          <Col md={8}>
            <Row className="mb-2 text-end">
                <Col md={5}><strong>Time Limit</strong></Col>
                <Col md={2}>{quiz.timeLimit}</Col>
            </Row>
          </Col>
          <Col md={8}>
            <Row className="mb-2 text-end">
                <Col md={5}><strong>Multiple Attempts</strong></Col>
                <Col md={2}>{quiz.multipleAttempts ? "Yes" : "No"}</Col>
            </Row>
          </Col>
          {quiz.multipleAttempts && (
            <Col md={8}>
                <Row className="mb-2 text-end">
                    <Col md={5}><strong>How Many Attempts</strong></Col>
                    <Col md={2}>{quiz.howManyAttempts || 1}</Col>
                </Row>
            </Col>
            )}
          <Col md={8}>
            <Row className="mb-2 text-end">
                <Col md={5}><strong>Show Correct Answers</strong></Col>
                <Col md={2}>{quiz.showCorrectAnswers}</Col>
            </Row>
          </Col>
          <Col md={8}>
            <Row className="mb-2 text-end">
                <Col md={5}><strong>Access Code</strong></Col>
                <Col md={2}>{quiz.accessCode || "None"}</Col>
            </Row>
          </Col>
          <Col md={8}>
            <Row className="mb-2 text-end">
                <Col md={5}><strong>One Question at a Time</strong></Col>
                <Col md={2}>{quiz.oneQuestionAtATime ? "Yes" : "No"}</Col>
            </Row>
          </Col>
          <Col md={8}>
            <Row className="mb-2 text-end">
                <Col md={5}><strong>Webcam Required</strong></Col>
                <Col md={2}>{quiz.webcamRequired ? "Yes" : "No"}</Col>
            </Row>
          </Col>
          <Col md={8}>
            <Row className="mb-2 text-end">
                <Col md={5}><strong>Lock Questions After Answering</strong></Col>
                <Col md={2}>{quiz.lockAfterAnswer ? "Yes" : "No"}</Col>
            </Row>
          </Col>
          <br /><br /><br />
          <>
            <Row className="d-flex align-items-start fw-bold">
                <Col>Due</Col>
                <Col>For</Col>
                <Col>Available From</Col>
                <Col>Until</Col>
            </Row>
            <hr className="my-2" />
            <Row className="d-flex align-items-start my-3 mb-1">
                <Col>{quiz.dueDate || "-"}</Col>
                <Col>Everyone</Col>
                <Col>{quiz.untilDate || "-"}</Col>
                <Col>{quiz.availableDate || "-"}</Col>
            </Row>
          </>
          <hr />
        </Card>
      </Container>
    );
}
  