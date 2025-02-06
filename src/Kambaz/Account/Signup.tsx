import { Link } from "react-router-dom";
import { Form, Container } from "react-bootstrap";

export default function Signup() {
    return (
        <Container id="wd-signup-screen" className="mt-4">
            <h3 className="mb-4">Sign up</h3>
            <Form>
                <Form.Control type="text" placeholder="username" className="mb-2" />
                <Form.Control type="password" placeholder="password" className="mb-2" />
                <Form.Control type="password" placeholder="verify password" className="mb-3" />
                <div className="text-center">
                    <Link to="/Kambaz/Account/Profile" className="btn btn-danger w-100 mb-2">
                        Sign Up
                    </Link>
                </div>
                <div className="text-center mt-2">
                    <Link to="/Kambaz/Account/SignIn" className="btn btn-danger w-100 mb-2">
                        Sign In
                    </Link>
                </div>
            </Form>
        </Container>
    );
}