import { Outlet } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

const Layout = () => {
    return (
        <div className='main-wrapper'>
                <main className="content">
                    <Outlet />
                    <ul>
                        <li className="nav-item"> <Link to="Login">Login</Link></li>
                        <li className="nav-item"> <Link to="Register">Register</Link></li>
                    </ul>
                </main>
        </div>
    );
};

export default Layout;