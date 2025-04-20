import { useState } from "react";
import { Container, Card, Form, Button, Row, Col } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function FillBlankEditor({ question, onCancel, onSave, onChangeType }: any) {
    const [title, setTitle] = useState(question?.title || "");
    const [points, setPoints] = useState(question?.points || 1);
    const [questionText, setQuestionText] = useState(question?.question || "");
    const [correctAnswer, setCorrectAnswer] = useState(question?.correctAnswer || "");
    const [choices, setChoices] = useState(question?.choices || ["", ""]);
    const [type, setType] = useState("FILL_BLANK");

    const handleSave = () => {
        const updatedQuestion = {
            ...question,
            title,
            points,
            question: questionText,
            type: "FILL_BLANK",
            choices,
            correctAnswer,
        }
        onSave(updatedQuestion);
    };
    const handleChoiceChange = (index: number, value: string) => {
        const updated = [...choices];
        const oldAnswer = choices[index] === correctAnswer;
        updated[index] = value;
        setChoices(updated);
        if (oldAnswer) {
            setCorrectAnswer(value);
        }
    };

    const handleAddChoice = () => setChoices([...choices, ""]);
    const handleRemoveChoice = (index: number) => {
        const updated = choices.filter((_: string, i: number) => i !== index);
        setChoices(updated);
        if (correctAnswer === choices[index]) {
            setCorrectAnswer("");
        }
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
                    <p>
                        Enter your question text, then define all possible correct answers for the blank.
                        Students will see the question followed by a small text box to type their answer.
                    </p>
                    <Form.Group className="mb-3">
                        <Form.Label><h5><strong>Question</strong></h5></Form.Label>
                        <ReactQuill value={questionText} onChange={setQuestionText} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label><strong>Answers</strong></Form.Label>
                        {choices.map((choice: string, index: number) => (
                            <div className="d-flex align-items-center mb-2" key={index}>
                                <div style={{ width: "2rem" }}>
                                    {correctAnswer === choice && choice.trim() !== "" && (
                                        <FaCheck className="text-success" />
                                    )}
                                </div>
                                <Form.Check
                                    type="radio"
                                    name="correctChoice"
                                    checked={correctAnswer === choice}
                                    onChange={() => setCorrectAnswer(choice)}
                                    className="me-2"
                                />
                                <Form.Control
                                    type="text"
                                    value={choice}
                                    onChange={(e) => handleChoiceChange(index, e.target.value)}
                                    className="me-2"
                                />
                                {choices.length > 2 && (
                                    <Button
                                        variant="outline-danger"
                                        size="sm"
                                        onClick={() => handleRemoveChoice(index)}
                                    >
                                        Remove
                                    </Button>
                                )}
                            </div>
                        ))}
                        <Button variant="outline-secondary" size="sm" onClick={handleAddChoice}>
                            + Add Choice
                        </Button>
                    </Form.Group>
                    <div className="text-end">
                        <Button variant="light" className="me-2" onClick={onCancel}>
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
