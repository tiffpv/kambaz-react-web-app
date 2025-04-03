import { useParams } from "react-router-dom";
import { Form, Container, Row, Col, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addAssignment, updateAssignment } from "./reducer";
import { Button } from "react-bootstrap";
import * as assignmentsClient from "./client";
import * as coursesClient from "../client";

export default function AssignmentsEditor() {
  const { cid, aid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const assignments = useSelector(
    (state: any) => state.assignmentReducer.assignments
  );
  const currentAssignment = assignments.find(
    (assignment: any) => assignment._id === aid
  );
  const currentUser = useSelector(
    (state: any) => state.accountReducer.currentUser
  );
  const isFaculty = currentUser.role === "FACULTY";

  const [assignment, setAssignment] = useState({
    title: "",
    course: cid || "",
    module: "",
    availableFrom: "",
    availableUntil: "",
    points: 0,
    description: "",
    due: "",
  });

  useEffect(() => {
    if (aid && currentAssignment) {
      setAssignment(currentAssignment);
    }
  }, [aid, currentAssignment]);

  const handleUpdate = (field: string, value: string | number) => {
    setAssignment({ ...assignment, [field]: value });
  };

  const handleSave = async () => {
    if (aid) {
      const updated = await assignmentsClient.updateAssignment({ ...assignment, _id: aid });
      dispatch(updateAssignment(updated))
    } else {
      const created = await coursesClient.createAssignmentForCourse(cid!, assignment);
      dispatch(addAssignment(created));
    }
    navigate(`/Kambaz/Courses/${cid}/Assignments`);
  }

  const handleCancel = () => {
    navigate(`/Kambaz/Courses/${cid}/Assignments`);
  };

  if (!isFaculty) {
    return (
      <Container className="p-4">
        <h3>Denied!</h3>
        <p>Only FACULTY can add or edit assignments</p>
      </Container>
    );
  }

  return (
    <Container className="p-4">
      <Form.Group className="mb-3">
        <Form.Label>
          <strong>Assignment Name</strong>
        </Form.Label>
        <Form.Control
          type="text"
          value={assignment.title}
          onChange={(e) => handleUpdate("title", e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>
          <strong>Description</strong>
        </Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          value={assignment.description || ""}
          onChange={(e) => handleUpdate("description", e.target.value)}
        />
      </Form.Group>

      <Row className="mb-3">
        <Col md={3} className="text-end align-top">
          Points
        </Col>
        <Col md={9}>
          <Form.Control
            type="number"
            value={assignment.points}
            onChange={(e) => handleUpdate("points", Number(e.target.value))}
          />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={3} className="text-end align-top">
          Assignment Group
        </Col>
        <Col md={9}>
          <Form.Select defaultValue="ASSIGNMENTS">
            <option value="Percentage">Assignments</option>
          </Form.Select>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={3} className="text-end align-top">
          Display Grade as
        </Col>
        <Col md={9}>
          <Form.Select defaultValue="Percentage">
            <option value="Percentage">Percentage</option>
            <option value="Complete/Incomplete">Complete/Incomplete</option>
            <option value="Letter Grade">Letter Grade</option>
            <option value="GPA Scale">GPA Scale</option>
          </Form.Select>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={3} className="text-end align-top">
          Submission Type
        </Col>
        <Col md={9}>
          <Form.Select defaultValue="Online">
            <option value="Online">Online</option>
          </Form.Select>
          <br />
          <strong>Online Entry Options</strong>
          <br />
          <Form.Check type="checkbox" label="Text Entry" />
          <Form.Check type="checkbox" label="Website URL" />
          <Form.Check type="checkbox" label="Media Recordings" />
          <Form.Check type="checkbox" label="Student Annotation" />
          <Form.Check type="checkbox" label="File Uploads" />
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
                  value={assignment.due}
                  onChange={(e) => handleUpdate("due", e.target.value)}
                />
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Label>
                  <strong>Available from</strong>
                </Form.Label>
                <Form.Control
                  type="date"
                  value={assignment.availableFrom}
                  onChange={(e) =>
                    handleUpdate("availableFrom", e.target.value)
                  }
                />
              </Col>
              <Col md={6}>
                <Form.Label>
                  <strong>Until</strong>
                </Form.Label>
                <Form.Control
                  type="date"
                  value={assignment.availableUntil}
                  onChange={(e) =>
                    handleUpdate("availableUntil", e.target.value)
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
        <Button variant="danger" onClick={handleSave}>
          Save
        </Button>
      </div>
    </Container>
  );
}
