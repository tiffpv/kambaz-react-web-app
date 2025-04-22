import { useParams } from "react-router-dom";
import { Form, Container, Row, Col, Card, Nav } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import * as quizzesClient from "./client";
import { addQuiz, updateQuiz } from "./reducer";
import ReactQuill from "react-quill";

export default function QuizEditor() {
    const { cid, qid } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUser = useSelector(
        (state: any) => state.accountReducer.currentUser
    );
    const isFaculty = currentUser.role === "FACULTY";
    const [quiz, setQuiz] = useState({
        title: "",
        course: "",
        points: 0,
        type: "Graded Quiz",
        group: "QUIZZES",
        shuffleAnswers: false,
        timeLimit: 20,
        multipleAttempts: false,
        howManyAttempts: 1,
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
    });
    useEffect(() => {
        const fetchQuiz = async () => {
            if (qid) {
                const currentQuiz = await quizzesClient.getQuiz(qid);
                setQuiz(currentQuiz);
            }
        };
        fetchQuiz();
    }, [qid]);

    if (!isFaculty) {
        return (
          <Container className="p-4">
            <h3>Denied!</h3>
            <p>Only FACULTY can edit quizzes</p>
          </Container>
        );
    }
    const handleUpdate = (field: string, value: string | number | Boolean) => {
        setQuiz({ ...quiz, [field]: value });
    };

    const handleSave = async () => {
        if (qid) {
          const updated = await quizzesClient.updateQuiz({ ...quiz, _id: qid });
          dispatch(updateQuiz(updated))
          navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}`);
        } else {
          const created = await quizzesClient.createQuizForCourse(cid!, quiz);
          dispatch(addQuiz(created));
          navigate(`/Kambaz/Courses/${cid}/Quizzes/${created._id}`);
        }
    }
    const handlePublishSave = async () => {
        if (qid) {
            const updatedQuiz = await quizzesClient.publishQuiz(qid);
            dispatch(updateQuiz(updatedQuiz));
            navigate(`/Kambaz/Courses/${cid}/Quizzes`);
            return;
        }
        const newQuiz = await quizzesClient.createQuizForCourse(cid!, { ...quiz, published: true});
        dispatch(addQuiz(newQuiz));
        navigate(`/Kambaz/Courses/${cid}/Quizzes`);

    };

    const handleCancel = () => {
        navigate(`/Kambaz/Courses/${cid}/Quizzes`);
    };
    return(
        <Container className="p-4">
            <Nav variant="tabs" defaultActiveKey={"details"} className="mb-4">
                <Nav.Item>
                    <Nav.Link active>Details</Nav.Link>    
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/Questions`)}>
                        Questions 
                    </Nav.Link>
                </Nav.Item>
            </Nav>
            <Form.Group className="mb-3">
                <Form.Label><strong>Quiz Title</strong></Form.Label>
                <Form.Control
                    type="text"
                    value={quiz.title}
                    onChange={(e) => handleUpdate("title", e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label><strong>Quiz Description</strong></Form.Label>
                <ReactQuill
                    value={quiz.description || ""}
                    onChange={(value) => handleUpdate("description", value)}
                    theme="snow"
                />
            </Form.Group>
            <Row className="mb-3">
                <Col md={3} className="text-end align-top">
                    Quiz Type
                </Col>
                <Col md={5}>
                    <Form.Select
                        value={quiz.type}
                        onChange={(e) => handleUpdate("type", e.target.value)}>
                        <option>Graded Quiz</option>
                        <option>Practice Quiz</option>
                        <option>Graded Survey</option>
                        <option>Ungraded Survey</option>
                    </Form.Select>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col md={3} className="text-end align-top">
                    Points
                </Col>
                <Col md={5}>
                    <Form.Control
                        type="number"
                        value={quiz.points}
                        onChange={(e) => handleUpdate("points", Number(e.target.value))}
                    />
                </Col>
            </Row>
            <Row className="mb-3">
                <Col md={3} className="text-end align-top">
                    Assignment Group
                </Col>
                <Col md={5}>
                    <Form.Select
                        value={quiz.group}
                        onChange={(e) => handleUpdate("group", e.target.value)}>
                        <option>Quizzes</option>
                        <option>Exams</option>
                        <option>Assignments</option>
                        <option>Project</option>
                    </Form.Select>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col md={3} className="text-end align-top">
                    Show Correct Answers
                </Col>
                <Col md={5}>
                    <Form.Select
                        value={quiz.showCorrectAnswers}
                        onChange={(e) => handleUpdate("showCorrectAnswers", e.target.value)}>
                        <option>Immediately</option>
                    </Form.Select>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col md={3} className="text-end align-top">
                    Time Limit
                </Col>
                <Col md={5}>
                    <Form.Control
                        type="number"
                        value={quiz.timeLimit}
                        onChange={(e) => handleUpdate("timeLimit", Number(e.target.value))}
                    />
                </Col>
            </Row>
            <Row className="mb-3">
                <Col md={3} className="text-end align-top">
                    Access Code
                </Col>
                <Col md={5}>
                    <Form.Control
                        type="text"
                        value={quiz.accessCode || ""}
                        onChange={(e) => handleUpdate("accessCode", String(e.target.value))}
                    />
                </Col>
            </Row>
            <Row className="mb-3">
                <Col md={3} className="text-end align-top">
                    <strong>Options</strong>
                </Col>
                <br />
                <Col md={9}>
                    <Form.Check 
                        type="checkbox" 
                        label="Shuffle Answers" 
                        checked={quiz.shuffleAnswers}
                        onChange={(e) => handleUpdate("shuffleAnswers", e.target.checked)} 
                    />
                    <Form.Check 
                        type="checkbox" 
                        label="Allow Multiple Attempts" 
                        checked={quiz.multipleAttempts}
                        onChange={(e) => handleUpdate("multipleAttempts", e.target.checked)} 
                    />
                    {quiz.multipleAttempts && (
                        <Form.Group className="ms-4 mt-2">
                            <Form.Label>Allowed Attempts</Form.Label>
                            <Form.Control
                                type="number"
                                min={1}
                                value={quiz.howManyAttempts || 1}
                                onChange={(e) => handleUpdate("howManyAttempts", Number(e.target.value))}
                            />
                        </Form.Group>
                    )}
                    <Form.Check 
                        type="checkbox" 
                        label="One Question at a Time" 
                        checked={quiz.oneQuestionAtATime}
                        onChange={(e) => handleUpdate("oneQuestionAtATime", e.target.checked)} 
                    />
                    <Form.Check 
                        type="checkbox" 
                        label="Webcam Required" 
                        checked={quiz.webcamRequired}
                        onChange={(e) => handleUpdate("webcamRequired", e.target.checked)} 
                    />
                    <Form.Check 
                        type="checkbox" 
                        label="Lock Questions After Answering" 
                        checked={quiz.lockAfterAnswer}
                        onChange={(e) => handleUpdate("lockAfterAnswer", e.target.checked)} 
                    />
                </Col>
            </Row>
            <Row>
                <Col md={2} className="text-end align-top">
                    Assign
                </Col>
                <Col md={10}>
                    <Card className="p-3 rounded">
                        <Row className="mb-3">
                            <Col md={12}>
                                <Form.Label>
                                    <strong>Assign to</strong>
                                </Form.Label>
                                <Form.Control type="text" defaultValue="Everyone" />
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col md={12}>
                                <Form.Label>
                                    <strong>Due</strong>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    value={quiz.dueDate}
                                    onChange={(e) => handleUpdate("dueDate", e.target.value)}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Form.Label>
                                    <strong>Available from</strong>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    value={quiz.untilDate}
                                    onChange={(e) =>
                                    handleUpdate("untilDate", e.target.value)
                                }
                                />
                            </Col>
                            <Col md={6}>
                                <Form.Label>
                                    <strong>Until</strong>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    value={quiz.availableDate}
                                    onChange={(e) =>
                                    handleUpdate("availableDate", e.target.value)
                                }
                                />
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
            <div className="mt-4 text-end">
                <hr />
                <Button variant="light" className="me-2" onClick={handleCancel}>
                    Cancel
                </Button>
                <Button variant="danger" className="me-2" onClick={handlePublishSave}>
                    Save and Publish
                </Button>
                <Button variant="danger" onClick={handleSave}>
                    Save
                </Button>
            </div>
        </Container>

    )

}