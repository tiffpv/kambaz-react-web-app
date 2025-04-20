import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { Container, Nav, Button, Card } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import * as quizzesClient from "./client";
import * as quizzesReducer from "./reducer";
import MultipleChoiceEditor from "./MultipleChoice";
import TrueFalseEditor from "./TrueFalse";
import FillBlankEditor from "./FillBlank";

export default function QuestionEditor() {
    const { cid, qid } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState<any>(null);
    
    const [questions, setQuestions] = useState(quiz?.questions || []);
    const [editingQuestion, setEditingQuestion] = useState<any>();

    const handleCancel = () => navigate(`/Kambaz/Courses/${cid}/Quizzes`);

    const handleSave = async () => {
        if (!quiz) return;
        const updatedQuiz = { ...quiz, questions};
        const updated = await quizzesClient.updateQuiz(updatedQuiz);
        dispatch(quizzesReducer.updateQuiz(updated));
        navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}`);
    };

    const handleSaveQuestion = (savedQuestion: any) => {
        let updatedQuestions;
        if (savedQuestion._id && questions.some((q: any) => q._id === savedQuestion._id)) {
          updatedQuestions = questions.map((q: any) => 
            q._id === savedQuestion._id ? savedQuestion : q);
        } else {
            if (!savedQuestion._id) {
                savedQuestion._id = uuidv4();
            }
            updatedQuestions = [...questions, savedQuestion];
        }
        setQuestions(updatedQuestions);
        setEditingQuestion(null);
         
    };

    const handleCancelQuestion = () => {
        setEditingQuestion(null);
    };

    const handleAddQuestion = () => {
        const newQuestion = {
          _id: uuidv4(),
          type: "MULTIPLE_CHOICE",
          question: "",
          points: 1,
          choices: ["", ""],
          correctAnswer: "",
        };
        setEditingQuestion(newQuestion);
    };
    const handleChangeQuestionType = (question: any, newType: string) => {
        const updatedQuestion = {
          ...question,
          type: newType,
        };
        setEditingQuestion(updatedQuestion);
    };

    const handleEditQuestion = (question: any) => {
        setEditingQuestion(question);
    };
    const handleDeleteQuestion = (questionId: string) => {
        const updated = questions.filter((q: any) => q._id !== questionId);
        setQuestions(updated);
    };

    useEffect(() => {
        const fetchQuizData = async () => {
            if (qid) {
                const quizData = await quizzesClient.getQuiz(qid);
                setQuestions(quizData.questions || []);
                setQuiz(quizData);
            }
          
        };
        fetchQuizData();
    }, [qid]);

    return (
        <Container className="p-4">
            <Nav variant="tabs" className="mb-4">
                <Nav.Item>
                    <Nav.Link onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/Edit`)}>
                        Details
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link active>Questions</Nav.Link>
                </Nav.Item>
            </Nav>
            
            {!editingQuestion && (
                <>
                    <div className="d-flex justify-content-center mb-4">
                        <Button variant="danger" onClick={handleAddQuestion}>+ New Question</Button>
                    </div>
                    {questions.length > 0 && (
                        <div className="mb-4">
                            <h5>Questions:</h5>
                            {questions.map((q: any, index: number) => (
                                <Card key={q._id} className="mb-2">
                                    <Card.Body>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>
                                                <strong>{index + 1}. {q.title || 'Untitled Question'}</strong> ({q.points} pt{q.points !== 1 ? 's' : ''})
                                            </div>
                                            <div className="d-flex gap-2">
                                                <Button 
                                                    variant="outline-secondary" 
                                                    size="sm"
                                                    onClick={() => handleEditQuestion(q)}
                                                >
                                                    Edit
                                                </Button>
                                                <Button 
                                                    variant="outline-secondary" 
                                                    size="sm"
                                                    onClick={() => handleDeleteQuestion(q._id)}
                                                >
                                                    Delete
                                                </Button>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            ))}
                        </div>
                    )}
                </>
            )}
            {editingQuestion?.type === "MULTIPLE_CHOICE" && (
                <MultipleChoiceEditor
                    question={editingQuestion}
                    onSave={handleSaveQuestion}
                    onCancel={handleCancelQuestion}
                    onChangeType={handleChangeQuestionType}
                />
            )}
            {editingQuestion?.type === "TRUE_FALSE" && (
                <TrueFalseEditor
                    question={editingQuestion}
                    onSave={handleSaveQuestion}
                    onCancel={handleCancelQuestion}
                    onChangeType={handleChangeQuestionType}
                />
            )}
            {editingQuestion?.type === "FILL_BLANK" && (
                <FillBlankEditor
                    question={editingQuestion}
                    onSave={handleSaveQuestion}
                    onCancel={handleCancelQuestion}
                    onChangeType={handleChangeQuestionType}
                />
            )}
            <hr />
            <div className="text-end mt-3">
                <Button variant="light" className="me-2" onClick={handleCancel}>Cancel</Button>
                <Button variant="danger" onClick={handleSave}>Save</Button>
            </div>
        </Container>
    );
}