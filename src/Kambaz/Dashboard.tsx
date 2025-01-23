import { Link } from "react-router-dom";
export default function Dashboard() {
    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
            <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
            <div id="wd-dashboard-courses">
                <div className="wd-dashboard-course">
                    <img src="/images/reactjs.jpg" width={200} />
                    <div>
                        <Link className="wd-dashboard-course-link"
                              to="/Kambaz/Courses/1234/Home"> CS1234 React JS </Link>
                        <p className="wd-dashboard-course-title">
                            Full Stack software developer </p>
                        <Link to="/Kambaz/Courses/1234/Home"> Go </Link>
                    </div>
                </div>
                <div className="wd-dashboard-course">
                    <img src="/images/reactjs.jpg" width={200} />
                    <div>
                        <Link className="wd-dashboard-course-link"
                              to="/Kambaz/Courses/1234/Home"> CS5001 Comp Sci </Link>
                        <p className="wd-dashboard-course-title">
                            Fundamentals of Computer Science </p>
                        <Link to="/Kambaz/Courses/1234/Home"> Go </Link>
                    </div>
                </div>
                <div className="wd-dashboard-course">
                    <img src="/images/reactjs.jpg" width={200} />
                    <div>
                        <Link className="wd-dashboard-course-link"
                              to="/Kambaz/Courses/1234/Home"> CS5002 Math </Link>
                        <p className="wd-dashboard-course-title">
                            Discrete Mathematics </p>
                        <Link to="/Kambaz/Courses/1234/Home"> Go </Link>
                    </div>
                </div>
                <div className="wd-dashboard-course">
                    <img src="/images/reactjs.jpg" width={200} />
                    <div>
                        <Link className="wd-dashboard-course-link"
                              to="/Kambaz/Courses/1234/Home"> CS5004 Java </Link>
                        <p className="wd-dashboard-course-title">
                            Object Oriented Programming </p>
                        <Link to="/Kambaz/Courses/1234/Home"> Go </Link>
                    </div>
                </div>
                <div id="wd-dashboard-course">
                    <img src="/images/reactjs.jpg" width={200} />
                    <div>
                        <Link className="wd-dashboard-course-link"
                              to="/Kambaz/Courses/1234/Home"> CS5008 </Link>
                        <p className="wd-dashboard-course-title">
                            Algorithms </p>
                        <Link to="/Kambaz/Courses/1234/Home"> Go </Link>
                    </div>
                </div>
                <div className="wd-dashboard-course">
                    <img src="/images/reactjs.jpg" width={200} />
                    <div>
                        <Link className="wd-dashboard-course-link"
                              to="/Kambaz/Courses/1234/Home"> CY5210 </Link>
                        <p className="wd-dashboard-course-title">
                            Information System Forensics </p>
                        <Link to="/Kambaz/Courses/1234/Home"> Go </Link>
                    </div>
                </div>
                <div className="wd-dashboard-course">
                    <img src="/images/reactjs.jpg" width={200} />
                    <div>
                        <Link className="wd-dashboard-course-link"
                              to="/Kambaz/Courses/1234/Home"> CS5610 </Link>
                        <p className="wd-dashboard-course-title">
                            Web Development </p>
                        <Link to="/Kambaz/Courses/1234/Home"> Go </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}