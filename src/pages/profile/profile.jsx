import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import './profile.css'
import editIcon from "../../assets/images/edit.svg";
import { getProfileApi, updateProfile } from '../../services/api';


const Profile = () => {
    let userId = sessionStorage.getItem("userId");
    const [profileEmail, setProfileEmail] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [profilePassword, setProfilePassword] = useState(null);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();

    useEffect(() => {
        const getProfileData = async () => {
          try {
            const result = await getProfileApi(userId)
            if (result.status === 200) {
              console.log('result', result.data[0].fieldEmail)
              setProfileEmail(result.data[0].fieldEmail)
              setFirstName(result.data[0].fieldName)
              setLastName(result.data[0].fieldLastName)
              setProfilePassword(result.data[0].fieldPassword)
            }
          } catch (error) {
            console.error(error)
          }
        }
        getProfileData();
      }, [])

      const saveProfile = async (e) => {
            e.preventDefault()
            const profileInfo = {
                userId,
                firstName,
                lastName,
                profileEmail,
                profilePassword
            };
    
            try {
                const profileApi = await updateProfile(profileInfo, userId);
                if(profileApi.status==200){
                  navigate('/Profile')
                  setShow(false);
                }
            } catch (error) {
                console.error(error);
            }
      };

  return (
    <>
      <div className='main-page'>
        <div className='profile-page'>
            <div className='page-title'>
                <h1 className='page-title'>Profile</h1>
                <button onClick={handleShow} className="btn btn-primary"><img src={editIcon} alt="Edit"/> Edit</button>
            </div>
            <div className='profile-data'>
                <p>{firstName} {lastName}</p>
                <p></p>
                {profileEmail}
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Profile Edit</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                <form>
                    <div className="mb-3">
                        <label htmlFor="firstName" className="form-label">First Name</label>
                        <input type="text" className="form-control" id="firstName" 
                            onChange={e => {
                                setFirstName(e.target.value);
                            }}
                            value={firstName} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lastName" className="form-label">Last Name</label>
                        <input type="text" className="form-control" id="lastName" 
                            onChange={e => {
                                setLastName(e.target.value);
                            }}
                            value={lastName} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="profileEmail" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="profileEmail" 
                            onChange={e => {
                                setProfileEmail(e.target.value);
                            }}
                            value={profileEmail} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="profilePassword" className="form-label">Password</label>
                        <input type="password" className="form-control" id="profilePassword"
                        onChange={e => {
                            setProfilePassword(e.target.value);
                        }}
                        value={profilePassword} />
                    </div>
                    <button onClick={saveProfile} className='btn btn-primary'>Save</button>
                </form>
            </Modal.Body>
        </Modal>
        </div>
      </div>
    </>
  )
}

export default Profile
