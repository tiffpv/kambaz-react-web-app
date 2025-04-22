import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, Card, Form, Button } from "react-bootstrap";
import * as quizzesClient from "./client";

export default function Quiz() {
  const { cid, qid } = useParams();
  const navigate = useNavigate();
  const currentUser = useSelector((state: any) => state.accountReducer.currentUser);
  const [quiz, setQuiz] = useState<any>(null);
  const [answers, setAnswers] = useState<any>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [attemptsCount, setAttemptsCount] = useState(0);
  const [canTakeQuiz, setCanTakeQuiz] = useState(false);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    const loadQuiz = async () => {
      if (!qid || !currentUser) return;
      const data = await quizzesClient.getQuiz(qid);
      const count = await quizzesClient.getAttemptCount(currentUser._id, qid);

      const maxAttempts = data.multipleAttempts ? data.howManyAttempts || 1 : 1;
      const canTake = count.count < maxAttempts;
      setQuiz(data);
      setAttemptsCount(count.count);
      setCanTakeQuiz(canTake);
      if (!canTake) {
        const latestAttempt = await quizzesClient.getLastAttempt(currentUser._id, qid);
        if (latestAttempt) {
          setAnswers(latestAttempt.answers);
          setIsSubmitted(true);
          setResult({
            submittedAt: latestAttempt.submittedAt,
            totalPoints: latestAttempt.score,
          });
        }
      } else {
        const initialAnswers: any = {};
        data.questions.forEach((q: any) => (initialAnswers[q._id] = ""));
        setAnswers(initialAnswers);
        setIsSubmitted(false);
        setResult(null);
      }
    };
    loadQuiz();
  }, [qid, currentUser]);

  const handleAnswerChange = (qid: string, value: any) => {
    setAnswers({ ...answers, [qid]: value });
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
    setResult(result);
    setIsSubmitted(true);

    await quizzesClient.createAttempt({
      user: currentUser._id,
      quiz: qid,
      answers,
      score: result.totalPoints,
    });

    setAttemptsCount(attemptsCount + 1);
  };

  if (!quiz) return <div>Loading quiz...</div>;

  return (
    <Container className="p-4">
      <h2 className="mb-4">{quiz.title}</h2>

      {!canTakeQuiz && (
        <div className="alert alert-warning">
          You have used all your allowed attempts for this quiz.
        </div>
      )}

      {canTakeQuiz && !isSubmitted && (
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
                      onChange={() => handleAnswerChange(q._id, choice)}
                    />
                  ))}

                {q.type === "TRUE_FALSE" && (
                  <>
                    <Form.Check
                      type="radio"
                      name={q._id}
                      label="True"
                      checked={answers[q._id] === true}
                      onChange={() => handleAnswerChange(q._id, true)}
                    />
                    <Form.Check
                      type="radio"
                      name={q._id}
                      label="False"
                      checked={answers[q._id] === false}
                      onChange={() => handleAnswerChange(q._id, false)}
                    />
                  </>
                )}

                {q.type === "FILL_BLANK" && (
                  <Form.Control
                    type="text"
                    value={answers[q._id] || ""}
                    onChange={(e) => handleAnswerChange(q._id, e.target.value)}
                  />
                )}
              </Form>
            </Card>
          ))}

          <div className="text-end mt-4">
            <Button variant="success" onClick={handleSubmit}>
              Submit Quiz
            </Button>
          </div>
        </>
      )}
      {isSubmitted && result && (
        <>
          {result.submittedAt && (
            <div className=" text-center text-muted mb-2">
              Submitted on{" "}
              {new Date(result.submittedAt).toLocaleString(undefined, {dateStyle: "long", timeStyle: "short",})}
            </div>
          )}
          <h4>Score: {result.totalPoints} points</h4>
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
                <div className="mt-2 mb-2" dangerouslySetInnerHTML={{ __html: q.question }} />
                <div className="mt-2">
                  <strong>Your Answer:</strong> {String(userAnswer)}
                </div>
                {!isCorrect && (
                  <div><strong>Correct Answer:</strong> {String(q.correctAnswer)}</div>
                )}
              </div>
            );
          })}

          <div className="text-end mt-4">
            <Button variant="secondary" onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}`)}>
              Back to Quiz Details
            </Button>
          </div>
        </>
      )}
    </Container>
  );
}
