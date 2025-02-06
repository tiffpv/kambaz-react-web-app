import { Link } from "react-router-dom";
import { FormControl } from "react-bootstrap";

export default function Signin() {
    return (
        <div id="wd-signin-screen">

            <h1>Sign in</h1>
            <FormControl id="wd-username" 
                          placeholder="username" 
                          className="mb-2" />
            <FormControl id="wd-password"
                         placeholder="password"
                         className="mb-2" />
            <Link id="wd-signin-btn" 
                  to="/Kambaz/Account/Profile"
                  className="btn btn-primary w-100 mb-2">
                  Sign in
            </Link>
            <Link id="wd-signup-link" to="/Kambaz/Account/Signup">
                Sign up
            </Link>
        </div>
    );
}