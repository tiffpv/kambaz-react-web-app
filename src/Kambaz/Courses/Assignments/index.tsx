import AssignmentButtons from "./AssignmentButtons";
import { ListGroup } from "react-bootstrap"; 
import { BsGripVertical } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import { Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import { LuNotebookPen } from "react-icons/lu";
import { IoMdArrowDropdown } from "react-icons/io";
import AssignmentsControl from "./AssignmentsControl";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import * as coursesClient from "../client";
import * as assignmentsClient from "./client";
import { setAssignments, deleteAssignment } from "./reducer";

export default function Assignments() {
  const { cid } = useParams();
  const assignments = useSelector((state: any) =>
    state.assignmentReducer.assignments.filter((assignment: any) => assignment.course === cid));
  const dispatch = useDispatch();
  const fetchAssignments = async () => {
    const assignments = await coursesClient.findAssignmentsForCourse(cid as string);
    dispatch(setAssignments(assignments));
  };
  useEffect(() => {
    fetchAssignments();
  }, []);
  const handleDelete = async (assignmentId: string) => {
    await assignmentsClient.deleteAssignment(assignmentId);
    dispatch(deleteAssignment(assignmentId));
  }
  

  return (
    <div className="p-4">
      <AssignmentButtons  />
      <br /><br /><br /><br />
      <ListGroup className="rounded-0" id="wd-assignments">
        <ListGroup.Item className="wd-assignments p-0 mb-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center fw-bold">
              <BsGripVertical className="me-2 fs-3" />
              <IoMdArrowDropdown className="me-2 fs-4" />
              ASSIGNMENTS
            </div>
            <div className="d-flex align-items-center gap-1">
              <Button variant="light" size="sm" className="border rounded-pill px-3 fw-bold">
                40% of Total
              </Button>
              <FaPlus className="fs-5" />
              <IoEllipsisVertical className="fs-4" />
            </div>
          </div>
        {assignments.map((assignment: any) => (
          <ListGroup.Item
            key={assignment._id}
            as={Link}
            to={`/Kambaz/Courses/${cid}/Assignments/${assignment._id}`}
            className="d-flex align-items-center p-3 border-bottom text-dark text-decoration-none"
            style={{ cursor: "pointer" }}
          >
            <BsGripVertical className="fs-4 text-muted me-3" />
            <LuNotebookPen className="fs-4 text-secondary me-3" />
            <div className="flex-grow-1">
              <h5 className="mb-1 fw-bold">{assignment.title}</h5>
              <p className="mb-0 text-muted small">
                <span className="text-danger"> {assignment.module} </span> | 
                <span className="fw-bold"> Not available until </span> {assignment.availableUntil} | <br />
                <span className="fw-bold"> Due </span> {assignment.due} | {assignment.points} pts
              </p>
            </div>
            <AssignmentsControl 
              assignmentId={assignment._id}
              title={assignment.title}
              deleteAssignment={handleDelete}/>
          </ListGroup.Item>
        ))}
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}

  