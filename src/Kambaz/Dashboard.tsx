import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";

export default function Dashboard() {
    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
            <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
            <div id="wd-dashboard-courses">
                <Row xs={1} md={5} className="g-4">
                    <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                        <Card>
                            <Link to="/Kambaz/Courses/1234/Home"
                                  className="wd-dashboard-course-link text-decoration-none text-dark">
                                  <Card.Img variant="top" src="/images/reactjs.jpg" width="100%" height={160}/>
                                  <Card.Body>
                                    <Card.Title className="wd-dashboard-course-title">CS1234 React JS</Card.Title>
                                    <Card.Text  className="wd-dashboard-course-description">
                                                Full Stack software developer</Card.Text>
                                    <Button variant="primary">Go</Button>
                                  </Card.Body>
                            </Link>
                        </Card>
                    </Col>
                    <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                        <Card>
                            <Link to="/Kambaz/Courses/1234/Home"
                                  className="wd-dashboard-course-link text-decoration-none text-dark">
                                  <Card.Img variant="top" src="/images/reactjs.jpg" width="100%" height={160}/>
                                  <Card.Body>
                                    <Card.Title className="wd-dashboard-course-title">CS5001 Comp Sci</Card.Title>
                                    <Card.Text  className="wd-dashboard-course-description">
                                                Computer Science</Card.Text>
                                    <Button variant="primary">Go</Button>
                                  </Card.Body>
                            </Link>
                        </Card>
                    </Col>
                    <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                        <Card>
                            <Link to="/Kambaz/Courses/1234/Home"
                                  className="wd-dashboard-course-link text-decoration-none text-dark">
                                  <Card.Img variant="top" src="/images/reactjs.jpg" width="100%" height={160}/>
                                  <Card.Body>
                                    <Card.Title className="wd-dashboard-course-title">CS5002 Math</Card.Title>
                                    <Card.Text  className="wd-dashboard-course-description">
                                                Discrete Mathematics</Card.Text>
                                    <Button variant="primary">Go</Button>
                                  </Card.Body>
                            </Link>
                        </Card>
                    </Col>
                    <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                        <Card>
                            <Link to="/Kambaz/Courses/1234/Home"
                                  className="wd-dashboard-course-link text-decoration-none text-dark">
                                  <Card.Img variant="top" src="/images/reactjs.jpg" width="100%" height={160}/>
                                  <Card.Body>
                                    <Card.Title className="wd-dashboard-course-title">CS5004 Java</Card.Title>
                                    <Card.Text  className="wd-dashboard-course-description">
                                                Object Oriented Programming</Card.Text>
                                    <Button variant="primary">Go</Button>
                                  </Card.Body>
                            </Link>
                        </Card>
                    </Col>
                    <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                        <Card>
                            <Link to="/Kambaz/Courses/1234/Home"
                                  className="wd-dashboard-course-link text-decoration-none text-dark">
                                  <Card.Img variant="top" src="/images/reactjs.jpg" width="100%" height={160}/>
                                  <Card.Body>
                                    <Card.Title className="wd-dashboard-course-title">CS5008</Card.Title>
                                    <Card.Text  className="wd-dashboard-course-description">
                                                Algorithms</Card.Text>
                                    <Button variant="primary">Go</Button>
                                  </Card.Body>
                            </Link>
                        </Card>
                    </Col>
                    <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                        <Card>
                            <Link to="/Kambaz/Courses/1234/Home"
                                  className="wd-dashboard-course-link text-decoration-none text-dark">
                                  <Card.Img variant="top" src="/images/reactjs.jpg" width="100%" height={160}/>
                                  <Card.Body>
                                    <Card.Title className="wd-dashboard-course-title">CY5210</Card.Title>
                                    <Card.Text  className="wd-dashboard-course-description">
                                                Information System Forensics</Card.Text>
                                    <Button variant="primary">Go</Button>
                                  </Card.Body>
                            </Link>
                        </Card>
                    </Col>
                    <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                        <Card>
                            <Link to="/Kambaz/Courses/1234/Home"
                                  className="wd-dashboard-course-link text-decoration-none text-dark">
                                  <Card.Img variant="top" src="/images/reactjs.jpg" width="100%" height={160}/>
                                  <Card.Body>
                                    <Card.Title className="wd-dashboard-course-title">CS5610</Card.Title>
                                    <Card.Text  className="wd-dashboard-course-description">
                                                Web Development</Card.Text>
                                    <Button variant="primary">Go</Button>
                                  </Card.Body>
                            </Link>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
}