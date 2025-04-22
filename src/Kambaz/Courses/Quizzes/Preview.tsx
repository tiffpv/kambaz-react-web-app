import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Card, Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import * as quizzesClient from "./client";

export default function QuizPreview() {
  const { cid, qid } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<any>(null);
  const [answers, setAnswers] = useState<Record<string, string | boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const currentUser = useSelector((state: any) => state.accountReducer.currentUser);
  const isFaculty = currentUser?.role === "FACULTY";

  useEffect(() => {
    const loadQuiz = async () => {
      if (!qid) return;
      const data = await quizzesClient.getQuiz(qid);
      setQuiz(data);
      const initialAnswers = Object.fromEntries(
        data.questions.map((q: any) => [q._id, ""])
      );
      setAnswers(initialAnswers);
    };
    loadQuiz();
  }, [qid]);

  if (!quiz) return <div>Loading quiz...</div>;

  if (!quiz.questions?.length) {
    return (
      <Container className="p-4">
        <Card className="p-4 text-center">
          <h3>This quiz has no questions yet.</h3>
          <Button className="mt-3" onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/Questions`)}>
            Add Questions
          </Button>
        </Card>
      </Container>
    );
  }

  const handleChange = (id: string, value: string | boolean) => {
    setAnswers({ ...answers, [id]: value });
  };

  const calculateScore = () => {
    let total = 0;
    quiz.questions.forEach((q: any) => {
      const correctAnswer = String(q.correctAnswer).trim().toLowerCase();
      const userAnswer = String(answers[q._id]).trim().toLowerCase();
      if (userAnswer === correctAnswer) {
        total += q.points || 1;
      }
    });
  
    return { totalPoints: total };
  };

  const handleSubmit = async () => {
    const result = calculateScore();
    setScore(result.totalPoints);
    setSubmitted(true);
  }

  return (
    <Container className="p-4">
      <h2 className="mb-4">{quiz.title} - Preview</h2>

      {!submitted ? (
        <>
          {quiz.questions.map((q: any, i: number) => (
            <Card key={q._id} className="mb-3 p-3">
              <strong>{i + 1}. {q.title || "Untitled Question"}</strong>
              <div className="mt-2 mb-2" dangerouslySetInnerHTML={{ __html: q.question }} />
              <Form>
                {q.type === "MULTIPLE_CHOICE" &&
                  q.choices.map((choice: string, idx: number) => (
                    <Form.Check
                      key={idx}
                      type="radio"
                      name={q._id}
                      label={choice}
                      checked={answers[q._id] === choice}
                      onChange={() => handleChange(q._id, choice)}
                    />
                  ))}

                {q.type === "TRUE_FALSE" && (
                  <>
                    <Form.Check
                      type="radio"
                      name={q._id}
                      label="True"
                      checked={answers[q._id] === true}
                      onChange={() => handleChange(q._id, true)}
                    />
                    <Form.Check
                      type="radio"
                      name={q._id}
                      label="False"
                      checked={answers[q._id] === false}
                      onChange={() => handleChange(q._id, false)}
                    />
                  </>
                )}

                {q.type === "FILL_BLANK" && (
                  <Form.Control
                    type="text"
                    value={answers[q._id] as string}
                    onChange={(e) => handleChange(q._id, e.target.value)}
                  />
                )}
              </Form>
            </Card>
          ))}

          <div className="text-end mt-4">
            <Button variant="success" onClick={handleSubmit}>Submit Quiz</Button>
          </div>
          <div className="text-center mt-3">
            <Button variant="outline-secondary" onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}`)}>
              Cancel Preview
            </Button>
          </div>
        </>
      ) : (
        <>
          <h4>Score: {score} points</h4>
          <h5 className="mb-3">Your Answers:</h5>
          {quiz.questions.map((q: any, i: number) => {
            const userAnswer = answers[q._id];
            const isCorrect = String(userAnswer).trim().toLowerCase() === String(q.correctAnswer).trim().toLowerCase();
            return (
              <div
                key={q._id}
                className={`mb-3 p-3 rounded border ${
                  isCorrect ? "border-success text-success bg-light" : "border-danger text-danger bg-light"
                }`}
              >
                <strong>{i + 1}. {q.title || "Untitled Question"}</strong>
                <div className="mt-1" dangerouslySetInnerHTML={{ __html: q.question }} />
                <div className="mt-2">
                  <strong>Your Answer:</strong> {String(answers[q._id])}
                </div>
                {!isCorrect && (
                  <div><strong>Correct Answer:</strong> {String(q.correctAnswer)}</div>
                )}
              </div>
            );
          })}

          <div className="d-flex justify-content-between mt-4">
            <Button onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}`)}>
              Back to Quiz
            </Button>
            {isFaculty && (
              <Button
                variant="danger"
                onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/Questions`)}
              >
                Edit Questions
              </Button>
            )}
          </div>
        </>
      )}
    </Container>
  );
}
