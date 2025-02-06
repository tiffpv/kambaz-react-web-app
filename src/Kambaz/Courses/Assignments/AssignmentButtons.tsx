import { FaPlus } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { Button, FormControl, InputGroup } from "react-bootstrap";

export default function AssignmentButtons() {
    return (
        <div id="wd-assignments-control" className="d-flex justify-content-between align-items-center mb-3">
            <div className="flex-grow-1 me-3">
                <InputGroup>
                    <InputGroup.Text><CiSearch /></InputGroup.Text>
                    <FormControl placeholder="Search..." id="wd-search-assignment" />
                </InputGroup>
            </div>
            <div className="d-flex justify-content-end">
                <Button variant="secondary" size="lg" className="me-2" id="wd-add-assignment-group">
                    <FaPlus className="me-2"/> Group
                </Button>
                <Button variant="danger" size="lg" id="wd-add-assignment">
                    <FaPlus className="me-2"/> Assignment
                </Button>
            </div>
        </div>
    );
}