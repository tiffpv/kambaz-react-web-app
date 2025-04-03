import { useState } from "react";
import { FormControl } from "react-bootstrap";
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;

export default function WorkingWithObjects() {
    const [assignment, setAssignment] = useState({
        id: 1, title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-10-10", completed: false, score: 0,
    });
    const [module, setModule] = useState({
        id: 1, name: "Module 1",
        description: "Welcome to Module 1",
        course: "RS102",
    });
    const ASSIGNMENT_API_URL = `${REMOTE_SERVER}/lab5/assignment`
    const MODULE_API_URL = `${REMOTE_SERVER}/lab5/module`
    return (
        <div id="wd-working-with-objects">
            <h3>Working With Objects</h3>
            <h4>Retrieving Objects</h4>
            <a id="wd-retrieve-assignments" className="btn btn-primary"
                href={`${REMOTE_SERVER}/lab5/assignment`}>
                Get Assignment
            </a><hr/>
            <h4>Retrieving Properties</h4>
            <a id="wd-retrieve-assignment-title" className="btn btn-primary"
                href={`${REMOTE_SERVER}/lab5/assignment/title`}>
                    Get Title
            </a><hr/>
            <h4>Modifying Properties</h4>
            <a id="wd-update-assignment-title"
                className="btn btn-primary float-end"
                href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`} >
                    Update Title
            </a>
            <FormControl className="w-75" id="wd-assignment-title"
                defaultValue={assignment.title} onChange={(e) =>
                    setAssignment({ ...assignment, title: e.target.value })} />
            <hr />
            <h4>Retrieving Assignment Score</h4>
            <a id="wd-retrieve-assignment-score" className="btn btn-primary"
                href={`${REMOTE_SERVER}/lab5/assignment/score`}>
                    Get Score
            </a><hr/>
            <h4>Modifying Assignment Score</h4>
            <a id="wd-update-assignment-score"
                className="btn btn-primary float-end"
                href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`} >
                    Update Assignment Score
            </a>
            <FormControl className="w-75" id="wd-assignment-score"
                defaultValue={assignment.score} onChange={(e) =>
                    setAssignment({ ...assignment, score: Number(e.target.value) })} />
            <hr />
            <h4>Retrieving Assignment Completion Status</h4>
            <a id="wd-retrieve-assignment-completed" className="btn btn-primary"
                href={`${REMOTE_SERVER}/lab5/assignment/completed`}>
                    Get Completion Status
            </a><hr/>
            <h4>Modifying Assignment Completion</h4>
            <input id="wd-assignment-completed" type="checkbox"
                    checked={assignment.completed} onChange={(e) =>
                        setAssignment({ ...assignment, completed: e.target.checked })} />
            <a id="wd-update-assignment-completed"
                className="btn btn-primary float-end"
                href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`} >
                    Update Assignment Completion
            </a>
            <hr />

            <h4>Retrieving Module</h4>
            <a id="wd-retrieve-module" className="btn btn-primary"
                href={`${REMOTE_SERVER}/lab5/module`}>
                Get Module
            </a><hr/>
            <h4>Retrieving Module Name</h4>
            <a id="wd-retrieve-module-name" className="btn btn-primary"
                href={`${REMOTE_SERVER}/lab5/module/name`}>
                Get Name
            </a><hr/>
            <h4>Modifying Module</h4>
            <a id="wd-update-module-name"
                className="btn btn-primary float-end"
                href={`${MODULE_API_URL}/name/${module.name}`} >
                    Update Module Name
            </a>
            <FormControl className="w-75" id="wd-module-name"
                defaultValue={module.name} onChange={(e) =>
                    setModule({ ...module, name: e.target.value })} />
            <hr />
            <h4>Retrieving Module Description</h4>
            <a id="wd-retrieve-module-description" className="btn btn-primary"
                href={`${REMOTE_SERVER}/lab5/module/description`}>
                Get Module Description
            </a><hr/>
            <h4>Modifying Module Description</h4>
            <a id="wd-update-module-description"
                className="btn btn-primary float-end"
                href={`${MODULE_API_URL}/description/${module.description}`} >
                    Update Module Description
            </a>
            <FormControl className="w-75" id="wd-module-description"
                defaultValue={module.description} onChange={(e) =>
                    setModule({ ...module, description: e.target.value })} />
            <hr />
        </div>
    );
}
