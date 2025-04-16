import Session from "./Account/Session";
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
//import * as client from "./Courses/client";
import * as courseClient from "./Courses/client";
import * as userClient from "./Account/client";
import { useEffect, useState} from "react";

export default function Kambaz() { 
    const [courses, setCourses] = useState<any[]>([]);
    const [enrolling, setEnrolling] = useState<boolean>(false);
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const [course, setCourse] = useState<any>({
        _id: "0",
        name: "New Course",
        number: "New Number",
        startDate: "2023-09-10",
        endDate: "2023-12-15",
        image: "/images/reactjs.jpg",
        description: "New Description",
    });
    const addNewCourse = async () => {
        const newCourse = await courseClient.createCourse(course);
        setCourses([ ...courses, {...course, newCourse}]);
    };
    const deleteCourse = async (courseId: string) => {
        const status = await courseClient.deleteCourse(courseId);
        setCourses(courses.filter((course) => course._id !== courseId))
        console.log(status)
    }
    const updateCourse = async () => {
        await courseClient.updateCourse(course);
        setCourses(courses.map((c) => {
            if (c._id === course._id) { return course; }
            else { return c;}
        }));
    }
    const findCoursesForUser = async () => {
        try {
            const courses = await userClient.findCoursesForUser(currentUser._id);
            setCourses(courses);
        } catch (error) {
            console.error(error);
        }
    };
    const updateEnrollment = async (courseId: string, enrolled: boolean) => {
        if (enrolled) {
            await userClient.enrollIntoCourse(currentUser._id, courseId);
        } else {
            await userClient.unenrollFromCourse(currentUser._id, courseId);
        }
        setCourses(
            courses.map((course) => {
                if (course._id === courseId) {
                    return { ...course, enrolled: enrolled };
                } else {
                    return course;
                }
            })
        );
    };
     

    const fetchCourses = async () => {
        try {
            const allCourses = await courseClient.fetchAllCourses();
            const enrolledCourses = await userClient.findCoursesForUser(
                currentUser._id
            );
            const courses = allCourses.map((course: any) => {
                if (enrolledCourses.find((c: any) => c._id === course._id)) {
                    return { ...course, enrolled: true };
                } else {
                    return course;
                }
            });
            setCourses(courses);
        }   catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        if (enrolling) {
            fetchCourses();
        } else {
            findCoursesForUser();
        }
    }, [currentUser, enrolling]);
    

    return (
        <Session>
            <div id="wd-kambaz">
                <KambazNavigation />
                <div className="wd-main-content-offset p-3">
                    <Routes>
                        <Route path="/" element={<Navigate to="Account" />} />
                        <Route path="/Account/*" element={<Account />} />
                        <Route path="/Dashboard" element={<ProtectedRoute>
                            <Dashboard courses={courses} addNewCourse={addNewCourse} course={course} setCourse={setCourse} 
                            deleteCourse={deleteCourse} updateCourse={updateCourse} enrolling={enrolling} setEnrolling={setEnrolling} 
                            updateEnrollment={updateEnrollment} /></ProtectedRoute>} />
                        <Route path="/Courses/:cid/*" element={<ProtectedCourseRoute><Courses courses={courses} /></ProtectedCourseRoute>} />
                        <Route path="/Calendar" element={<h1>Calendar</h1>} />
                        <Route path="Inbox" element={<h1>Inbox</h1>} />
                        <Route path="/Labs" element={<Labs />} />
                    </Routes>
                </div>
            </div>
        </Session>
    );
}