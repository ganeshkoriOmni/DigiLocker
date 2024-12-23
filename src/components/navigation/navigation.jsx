import React, { useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";


const Navigation = () => {
    const navigate = useNavigate();
    let userEmail = sessionStorage.getItem("userEmail");

    const logout = () => {
        sessionStorage.clear();
        navigate('/Login')
    }

    useEffect(() => {
        if(!userEmail){
            navigate('/Login')
        }
      }, [userEmail]);
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link className="navbar-brand" to="../">Omni-DigiLocker</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    {userEmail && (<div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
        <Link className="nav-link active" to="../Documents">Documents</Link>
        </li>
        <li className="nav-item">
        <Link className="nav-link" to="../Files">Files</Link>
        </li>
        <li className="nav-item">
        <button onClick={logout}>Logout</button>
        </li>
      </ul>
      <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>)}
  </div>
</nav>
        </>
    );
};

export default Navigation;