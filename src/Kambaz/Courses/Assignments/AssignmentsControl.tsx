import GreenCheckmark from "../Modules/GreenCheckmark";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import { deleteAssignment } from "./reducer";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";

export default function AssignmentsControl(props: any) {
  const { assignmentId, title } = props;
  const [showDelete, setShowDelete] = useState(false);
  const dispatch = useDispatch();
  const currentUser = useSelector(
    (state: any) => state.accountReducer.currentUser
  );
  const isFaculty = currentUser.role === "FACULTY";

  const handleDelete = () => {
    dispatch(deleteAssignment(assignmentId));
    setShowDelete(false);
  };

  return (
    <div className="float-end d-flex align-items-center gap-2">
      {isFaculty && (
        <>
          <FaTrash
            className="me-2 fs-6"
            role="button"
            onClick={(e) => {
              e.preventDefault();
              setShowDelete(true);
            }}
            title="Delete Assignment"
          />
          {showDelete && (
            <div className="bg-light border p-2 mt-2 rounded">
              <p className="mb-2">
                Are you sure you want to delete this assignment?{" "}
                <strong>{title}</strong>
              </p>
              <Button
                variant="danger"
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  handleDelete();
                }}
              >
                Yes
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  setShowDelete(false);
                }}
              >
                Cancel
              </Button>
            </div>
          )}
        </>
      )}
      <GreenCheckmark />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}
