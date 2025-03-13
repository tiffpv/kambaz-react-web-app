import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
export default function AccountNavigation() {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    return (
        <div id="wd-account-navigation">
            {!currentUser && (
                <>
                    <Link to={`/Kambaz/Account/Signin`} className="wd-account-link" > Signin </Link> <br/>
                </>
            )}
            {!currentUser && (
                <>
                    <Link to={`/Kambaz/Account/Signup`} className="wd-account-link" > Signup </Link> <br/>
                </>
            )}
            {currentUser && (
                <>
                    <Link to={`/Kambaz/Account/Profile`} className="wd-account-link" > Profile </Link> <br/>
                </>
            )}
        </div>
    );
}