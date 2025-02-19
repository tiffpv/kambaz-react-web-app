import { useParams, Link } from "react-router-dom";
import { Form, Container, Row, Col, Card } from "react-bootstrap";
import * as db from "../../Database"; // Import assignments data

export default function AssignmentsEditor() {
  const { cid, aid } = useParams(); 
  const assignment = db.assignments.find((a) => a._id === aid);

  if (!assignment) {
  return <h3 className="text-danger">Assignment not found!</h3>;
}

  return (
    <Container className="p-4">
      <Form.Group className="mb-3">
        <Form.Label><strong>Assignment Name</strong></Form.Label>
        <Form.Control type="text" value={assignment.title} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label><strong>Description</strong></Form.Label>
        <Form.Control as="textarea" rows={6} value={assignment.description || ""}/>
      </Form.Group>

      <Row className="mb-3">
        <Col md={3} className="text-end align-top">
          Points
        </Col>
        <Col md={9}>
          <Form.Control type="number" value={assignment.points} />
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
                <Form.Control type="text" value={assignment.due} />
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Label><strong>Available from</strong></Form.Label>
                <Form.Control type="date" value="2021-05-06" />
              </Col>
              <Col md={6}>
                <Form.Label><strong>Until</strong></Form.Label>
                <Form.Control type="date" value="2021-05-20" />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <div className="mt-4 text-end">
        <hr />
        <Link to={`/Kambaz/Courses/${cid}/Assignments`} className="btn btn-light me-2">
          Cancel
        </Link>
        <Link to={`/Kambaz/Courses/${cid}/Assignments`} className="btn btn-danger">
          Save
        </Link>
      </div>
    </Container>
  );
}