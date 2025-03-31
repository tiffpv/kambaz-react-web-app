import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addCourse, updateCourse, deleteCourse } from "./Courses/reducer";
import { useState } from "react";
import { addEnrollment, removeEnrollment } from "./Enrollments/reducer";

export default function Dashboard() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const enrollments = useSelector(
    (state: any) => state.enrollmentReducer.enrollments
  );
  const dispatch = useDispatch();
  const isFaculty = currentUser.role === "FACULTY";
  const [courseView, setCourseView] = useState(true);
  const userEnrollments = enrollments.filter(
    (e: any) => e.user === currentUser._id
  );
  const isEnrolled = (courseId: string) =>
    userEnrollments.some((e: any) => e.course === courseId);
  const { courses } = useSelector((state: any) => state.coursesReducer);
  console.log("currentUser:", currentUser);
  console.log("courses from Redux:", courses);
  console.log("enrollments from Redux:", enrollments);
  console.log("userEnrollments:", userEnrollments);
  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });

  const handleAdd = () => {
    dispatch(addCourse(course));
    setCourse({ ...course, _id: "", name: "", description: "" });
  };

  const handleUpdate = () => {
    if (course._id) {
      dispatch(updateCourse(course));
      setCourse({
        ...course,
        _id: "",
        name: "",
        number: "",
        startDate: "",
        endDate: "",
        image: "",
        description: "",
      });
    }
  };

  const handleDelete = (id: string) => {
    dispatch(deleteCourse(id));
  };

  const handleEdit = (courseEdit: any) => {
    setCourse(courseEdit);
  };

  const allCourses = courseView
    ? courses
    : courses.filter((course: any) =>
        userEnrollments.some((e: any) => e.course === course._id)
      );

  return (
    <div className="p-4" id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h5>
        {isFaculty && (
          <>
            <Button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={handleAdd}
            >
              Add
            </Button>
            <Button
              className="float-end me-2 btn btn-warning"
              onClick={handleUpdate}
            >
              Update
            </Button>
          </>
        )}
        <Button
          className="float-end btn btn-info me-2"
          onClick={() => setCourseView(!courseView)}
        >
          Enrollments
        </Button>
      </h5>
      <br />
      {isFaculty && (
        <>
          <input
            value={course.name}
            className="form-control mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <textarea
            value={course.description}
            className="form-control"
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          />
        </>
      )}
      <hr />
      <h2 id="wd-dashboard-published">
        Published Courses ({allCourses.length})
      </h2>
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {allCourses.map((course: any) => (
            <Col
              className="wd-dashboard-course"
              style={{ width: "300px" }}
              key={course._id}
            >
              <Card>
                <Card.Img
                  variant="top"
                  src="/images/reactjs.jpg"
                  width="100%"
                  height={160}
                />
                <Card.Body>
                  <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                    {course.name}
                  </Card.Title>
                  <Card.Text
                    className="wd-dashboard-course-description overflow-hidden"
                    style={{ height: "100px" }}
                  >
                    {course.description}
                  </Card.Text>
                  <Link
                    to={
                      isEnrolled(course._id)
                        ? `/Kambaz/Courses/${course._id}/Home`
                        : "#"
                    }
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                  >
                    <Button
                      variant="primary"
                      disabled={!isEnrolled(course._id)}
                    >
                      Go
                    </Button>
                  </Link>
                  <Button
                    className="float-end ms-2"
                    variant={isEnrolled(course._id) ? "danger" : "success"}
                    onClick={(e) => {
                      e.preventDefault();
                      if (isEnrolled(course._id)) {
                        dispatch(
                          removeEnrollment({
                            user: currentUser._id,
                            course: course._id,
                          })
                        );
                      } else {
                        dispatch(
                          addEnrollment({
                            user: currentUser._id,
                            course: course._id,
                          })
                        );
                      }
                    }}
                  >
                    {isEnrolled(course._id) ? "Unenroll" : "Enroll"}
                  </Button>
                  {isFaculty && (
                    <>
                      <Button
                        onClick={(event) => {
                          event.preventDefault();
                          handleDelete(course._id);
                        }}
                        className="float-end btn btn-danger"
                      >
                        Delete
                      </Button>
                      <Button
                        id="wd-edit-course-click"
                        onClick={(event) => {
                          event.preventDefault();
                          handleEdit(course);
                        }}
                        className="me-2 float-end btn btn-warning"
                      >
                        Edit
                      </Button>
                    </>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
