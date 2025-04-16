import { FormControl, Button } from "react-bootstrap";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";
//import * as db from "../Database";
import * as client from "./client";

export default function Signin() {
    const [credentials, setCredentials] = useState<any>({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const signin = async () => {
        const user = await client.signin(credentials);
            if (!user) return;
            dispatch(setCurrentUser(user));
            navigate("/Kambaz/Dashboard");
  };
    return (
        <div id="wd-signin-screen">
            <h1>Sign in</h1>
            <FormControl value={credentials.username || ""}
             onChange={(e) => setCredentials({ ...credentials, username: e.target.value.trim() })}
                id="wd-username" placeholder="username" className="mb-2" />
            <FormControl value={credentials.password || ""}
             onChange={(e) => setCredentials({ ...credentials, password: e.target.value.trim() })}
                id="wd-password" placeholder="password" className="mb-2" />
            <Button onClick={signin} id="wd-signin-btn" className="w-100" > Sign in </Button>
            <Link id="wd-signup-link" to="/Kambaz/Account/Signup"> Sign up </Link>
        </div>
    );
}