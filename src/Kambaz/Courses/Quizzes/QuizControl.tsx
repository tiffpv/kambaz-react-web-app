import { IoEllipsisVertical } from "react-icons/io5";
import { FaBan, FaCheckCircle } from "react-icons/fa";
//import { deleteAssignment } from "./reducer";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import { publishQuiz } from "./client";
import { updateQuiz, deleteQuiz } from "./reducer";

export default function QuizControl(props: any) {
  
    const { quizId, title, published } = props;
    const navigate = useNavigate();
    const { cid } = useParams();
    const dispatch = useDispatch();
    const [showDelete, setShowDelete] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const currentUser = useSelector(
        (state: any) => state.accountReducer.currentUser
    );
    const isFaculty = currentUser.role === "FACULTY";
    const handleDelete = async () => {
        console.log("🗑️ Deleting quiz with ID:", quizId)
        dispatch(deleteQuiz(quizId));
        setShowDelete(false);
        setShowMenu(false);
    };

    const handleEdit = () => {
        navigate(`/Kambaz/Courses/${cid}/Quizzes/${quizId}`);
        setShowMenu(false);
    };
    const handlePublish = async () => {
        const updatedQuiz = await publishQuiz(quizId);
        dispatch(updateQuiz(updatedQuiz));
        setShowMenu(false);
    };

    return (
        <div className="float-end d-flex align-items-center gap-2 position-relative">
          {published ? (
            <FaCheckCircle className="text-success fs-5" title="Published" />
          ) : (
            <FaBan className="text-danger fs-5" title="Unpublished" />
          )}
          {isFaculty && (
            <>
              <IoEllipsisVertical
                className="fs-4"
                role="button"
                title="Quiz Options"
                onClick={(e) => {
                  e.preventDefault();
                  setShowMenu(!showMenu);
                }}
              />
              {showMenu && (
                <div className="position-absolute bg-white border rounded shadow-sm p-2" style={{ right: 0, zIndex: 10 }}>
                  <div className="dropdown-item" role="button" onClick={handleEdit}>
                    Edit
                  </div>
                  <div className="dropdown-item" role="button" onClick={handlePublish}>
                    {published ? "Unpublish" : "Publish"}
                  </div>
                  {!showDelete ? (
                    <div className="dropdown-item text-danger"
                         role="button"
                         onClick={(e) => {
                            e.preventDefault();
                            setShowDelete(true)
                         }}
                        >
                        Delete
                    </div> 
                  ) : (
                    <div className="p-2 border bg-light rounded text-center">
                        <p className="mb-2 small">
                            Delete <strong>{title}</strong>?
                        </p>
                        <Button
                            variant="danger"
                            size="sm"
                            className="me-2"
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
                            setShowMenu(false);
                            }}
                        >
                            Cancel
                        </Button>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      );
}
