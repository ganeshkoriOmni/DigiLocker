import React, { useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import './navigation.css'
import peopleIcon from "../../assets/images/people.svg";


const Navigation = () => {
    const navigate = useNavigate();
    let userEmail = sessionStorage.getItem("userEmail");
    let userName = sessionStorage.getItem("userName");
    let userLastName = sessionStorage.getItem("userLastName");

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
    <Link className="navbar-brand" to="./Dashboard">Omni-DigiLocker</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    {userEmail && (<div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
        <Link className="nav-link active" to="../Documents">Documents</Link>
        </li>
        <li className="nav-item">
        <Link className="nav-link" to="../Folder">Folder</Link>
        </li>
        <li className="nav-item">
        <Link className="nav-link" to="../Shares">Share</Link>
        </li>
      </ul>
      {/* <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form> */}
      <div className="text-end login-option">
        Welcome : {userName}
      </div>
      <div className="dropdown text-end login-option">
          <span className="d-block link-dark text-decoration-none dropdown-toggle" id="dropdownUser1">
            <img src={peopleIcon} alt="mdo" className="rounded-circle" />
          </span>
          <ul className="dropdown-menu text-small">
            <li><a className="dropdown-item" href="#">Settings</a></li>
            <li><a className="dropdown-item" href="#">Profile</a></li>
            <li><hr className="dropdown-divider" /></li>
            <li><button className="dropdown-item" onClick={logout}>Sign out</button></li>
          </ul>
        </div>
    </div>)}
  </div>
</nav>
        </>
    );
};

export default Navigation;