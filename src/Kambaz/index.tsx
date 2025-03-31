import { Routes, Route, Navigate } from "react-router";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KambazNavigation from "./Navigation";
import Courses from "./Courses";
import Labs from "../Labs";
import "./styles.css";
import ProtectedRoute from "./Account/ProtectedRoute";
import ProtectedCourseRoute from "./Courses/ProtectedCoursesRoute";
import { useSelector } from "react-redux";

export default function Kambaz() { 
    const courses = useSelector((state: any) => 
        state.courseReducer ? state.courseReducer.courses : []
    );
    return (
        <div id="wd-kambaz">
            <KambazNavigation />
            <div className="wd-main-content-offset p-3">
                <Routes>
                    <Route path="/" element={<Navigate to="Account" />} />
                    <Route path="/Account/*" element={<Account />} />
                    <Route path="/Dashboard" element={<ProtectedRoute>
                        <Dashboard/></ProtectedRoute>} />
                    <Route path="/Courses/:cid/*" element={<ProtectedCourseRoute><Courses courses={courses} /></ProtectedCourseRoute>} />
                    <Route path="/Calendar" element={<h1>Calendar</h1>} />
                    <Route path="Inbox" element={<h1>Inbox</h1>} />
                    <Route path="/Labs" element={<Labs />} />
                </Routes>
            </div>
        </div>
    );
}