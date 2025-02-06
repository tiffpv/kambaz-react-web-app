import AssignmentButtons from "./AssignmentButtons";
import { ListGroup } from "react-bootstrap"; 
import { BsGripVertical } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import { Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import { LuNotebookPen } from "react-icons/lu";
import { IoMdArrowDropdown } from "react-icons/io";
import AssignmentsControl from "./AssignmentsControl";

export default function Assignments() {
  return (
    <div className="p-4">
      <AssignmentButtons /><br /><br /><br /><br />
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
          <ListGroup className="wd-assignments-list rounded-0">
            <ListGroup.Item className="wd-assignment p-3 ps-2 d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <BsGripVertical className="fs-3 text-muted" />
                <LuNotebookPen className="fs-4 text-secondary ms-2" />
                <div>
                  <a href="#/Kambaz/Courses/1234/Assignments/123" className="fw-bold text-dark text-decoration-none ms-3">
                    A1
                  </a>
                  <br />
                  <span className="text-muted small ms-3">
                    <span className="text-danger">Multiple Modules</span> | 
                    <strong>Not available until</strong> May 6 at 12:00am | <br />
                    <strong className="ms-3">Due</strong> May 13 at 11:59pm | 100 pts
                  </span>
                </div>
              </div>
              <AssignmentsControl />
            </ListGroup.Item>
          </ListGroup>
          <ListGroup className="wd-assignments-list rounded-0">
            <ListGroup.Item className="wd-assignment p-3 ps-2 d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <BsGripVertical className="fs-3 text-muted" />
                <LuNotebookPen className="fs-4 text-secondary ms-2" />
                <div>
                  <a href="#/Kambaz/Courses/1234/Assignments/123" className="fw-bold text-dark text-decoration-none ms-3">
                    A2
                  </a>
                  <br />
                  <span className="text-muted small ms-3">
                    <span className="text-danger">Multiple Modules</span> | <strong>Not available until</strong> May 6 at 12:00am | <br />
                    <strong className="ms-3">Due</strong> May 13 at 11:59pm | 100 pts
                  </span>
                </div>
              </div>
              <AssignmentsControl />
            </ListGroup.Item>
          </ListGroup>
          <ListGroup className="wd-assignments-list rounded-0">
            <ListGroup.Item className="wd-assignment p-3 ps-2 d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <BsGripVertical className="fs-3 text-muted" />
                <LuNotebookPen className="fs-4 text-secondary ms-2" />
                <div>
                  <a href="#/Kambaz/Courses/1234/Assignments/123" className="fw-bold text-dark text-decoration-none ms-3">
                    A3
                  </a>
                  <br />
                  <span className="text-muted small ms-3">
                    <span className="text-danger">Multiple Modules</span> | <strong>Not available until</strong> May 6 at 12:00am | <br />
                    <strong className="ms-3">Due</strong> May 13 at 11:59pm | 100 pts
                  </span>
                </div>
              </div>
              <AssignmentsControl />
            </ListGroup.Item>
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}
