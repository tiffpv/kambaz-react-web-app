import { useParams } from "react-router-dom";
import { Form, Container, Row, Col, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addAssignment, updateAssignment } from "./reducer";
import { Button } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";


export default function AssignmentsEditor() {
  const { cid } = useParams();
  const { aid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const assignments = useSelector((state: any) => state.assignmentReducer.assignments);
  const currentAssignment = assignments.find((assignment: any) => assignment._id === aid);

  const [assignment, setAssignment] = useState({
    title: "",
    course: cid,
    module: "",
    availableUntil: "",
    due: "",
    points: 0,
    description: "",
  });

  useEffect(() => {
    if (currentAssignment) {
      setAssignment(currentAssignment); 
    } else if (!aid) {
      setAssignment({
        ...assignment,
        course: cid || "",  
      });
    } else {
      navigate(`/Kambaz/Courses/${cid}/Assignments`);  
    }
  }, [currentAssignment, aid, cid, navigate]);

    const handleSave = () => {
      console.log("Saving assignment:", assignment);
      if (aid) {
        dispatch(updateAssignment(assignment));
      } else {
        const newAssignment = {
          _id: uuidv4(),
          ...assignment 
        };
        console.log("New assignment being added:", newAssignment);
        dispatch(addAssignment(newAssignment));
      }
      navigate(`/Kambaz/Courses/${cid}/Assignments`);
    };

    const handleCancel = () => {
      navigate(`/Kambaz/Courses/${cid}/Assignments`);
    };


  if (!assignment) {
  return <h3 className="text-danger">Assignment not found!</h3>;
}

  return (
    <Container className="p-4">
      <Form.Group className="mb-3">
        <Form.Label><strong>Assignment Name</strong></Form.Label>
        <Form.Control type="text" value={assignment.title} 
                onChange={(e) => setAssignment({...assignment, title: e.target.value})} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label><strong>Description</strong></Form.Label>
        <Form.Control as="textarea" rows={6} value={assignment.description || ""}
            onChange={(e) => setAssignment({ ...assignment, description: e.target.value })}/>
      </Form.Group>

      <Row className="mb-3">
        <Col md={3} className="text-end align-top">
          Points
        </Col>
        <Col md={9}>
          <Form.Control type="number" value={assignment.points} 
            onChange={(e) => setAssignment({ ...assignment, points: Number(e.target.value) || 0 })}/>
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
          <strong>Online Entry Options</strong><br />
          <Form.Check type="checkbox" label="Text Entry"  />
          <Form.Check type="checkbox" label="Website URL"  />
          <Form.Check type="checkbox" label="Media Recordings"  />
          <Form.Check type="checkbox" label="Student Annotation"  />
          <Form.Check type="checkbox" label="File Uploads"  />
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
                <Form.Label><strong>Assign to</strong></Form.Label>
                <Form.Control type="text" defaultValue="Everyone" />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={12}>
                <Form.Label><strong>Due</strong></Form.Label>
                <Form.Control type="text" value={assignment.due}
                  onChange={(e) => setAssignment({ ...assignment, due: e.target.value })} />
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Label><strong>Available from</strong></Form.Label>
                <Form.Control type="date" value="2021-05-06" />
              </Col>
              <Col md={6}>
                <Form.Label><strong>Until</strong></Form.Label>
                <Form.Control type="date" value="2021-05-20" 
                  onChange={(e) => setAssignment({ ...assignment, availableUntil: e.target.value })}/>
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