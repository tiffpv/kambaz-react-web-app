import { useState } from "react";
import { Container, Card, Form, Button, Row, Col } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function TrueFalseEditor({ question, onCancel, onSave, onChangeType }: any) {

    const [title, setTitle] = useState(question?.title || "");
    const [points, setPoints] = useState(question?.points || 1);
    const [questionText, setQuestionText] = useState(question?.question || "");
    const [correctAnswer, setCorrectAnswer] = useState(
        question?.correctAnswer ?? true
    );
    const [type] = useState("TRUE_FALSE");

    const handleSave = () => {
        const updatedQuestion = {
            ...question,
            title,
            points,
            question: questionText,
            type: "TRUE_FALSE",
            correctAnswer,
        };
        onSave(updatedQuestion);
    };

  return (
    <Container className="p-4">
        <Card className="mb-4 p-3">
            <Row className="align-items-centermb-3">
                <Col md={6}>
                    <Form.Control
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Question title"
                    />
                </Col>
                <Col md={4}>
                    <Form.Select
                        value={type}
                        onChange={(e) => {
                            const newType = e.target.value;
                            onChangeType(question, newType);
                        }}
                    >
                        <option value="MULTIPLE_CHOICE">Multiple Choice</option>
                        <option value="TRUE_FALSE">True / False</option>
                        <option value="FILL_BLANK">Fill in the Blank</option>
                    </Form.Select>
                </Col>
                <Col md={2}>
                    <Form.Control
                        type="number"
                        min={1}
                        value={points}
                        onChange={(e) => setPoints(Number(e.target.value))}
                    />
                    <Form.Label><strong>Points</strong></Form.Label>
                </Col>
            </Row>
            <Card className="p-4">
                <h6>Enter your question text, then select if True or False is the correct answer.</h6>
                <Form.Group className="mb-3">
                    <Form.Label><h5><strong>Question</strong></h5></Form.Label>
                    <ReactQuill value={questionText} onChange={setQuestionText} />
                </Form.Group>
                <div className="mb-4">
                    <h5><strong>Answers:</strong></h5>
                    {["true", "false"].map((val) => {
                        const isCorrect = correctAnswer === (val === "true");
                        return (
                            <div key={val} className="d-flex align-items-center mb-2">
                                <div style={{ width: "2rem" }}>
                                    {isCorrect && <FaCheck className="text-success" />}
                                </div>
                                <Form.Check
                                    type="radio"
                                    name="trueFalse"
                                    label={val.charAt(0).toUpperCase() + val.slice(1)}
                                    checked={isCorrect}
                                    onChange={() => setCorrectAnswer(val === "true")}
                                />
                            </div>
                        );
                    })}
                </div>
                <div className="text-end">
                    <Button variant="secondary" className="me-2" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleSave}>
                        Save Question
                    </Button>
                </div>
            </Card>
        </Card>
    </Container>
  );
}
