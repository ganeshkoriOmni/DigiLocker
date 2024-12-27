import { Outlet } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import  Navigation  from '../components/navigation/navigation';

const Layout = () => {
    return (
        <>
            <div className='main-wrapper'>
                <header>
                    <Navigation />
                </header>

                <main className="content">
                    <Outlet />
                </main>
            </div>
        </>
    );
};

export default Layout;