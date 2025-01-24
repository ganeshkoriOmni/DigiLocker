import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './folder.css'
import editIcon from "../../assets/images/edit.svg";
import folderIcon from "../../assets/images/folder-black.svg";
import deleteIcon from "../../assets/images/delete.svg";
import { getFoldersApi } from '../../services/api';


const Folder = () => {
    let userId = sessionStorage.getItem("userId");
    const [documentsData, setDocumentsData] = useState(null);
    const [show, setShow] = useState(false);
    const [folderName, setFolderName] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    useEffect(() => {
        const getDocumentsData = async () => {
          try {
            const result = await getFoldersApi(userId)
            if (result.status === 200) {
              console.log('result', result)
              setDocumentsData(result.data)
            }
          } catch (error) {
            console.error(error)
          }
        }
        getDocumentsData()
      }, [])

      const documentDelete = (documentId) => {
        alert(documentId)
      }

      const saveFolder = () => {

      }

  return (
    <>
      <div className='main-page'>
        <div className='documents-page'>
            <div className='page-title'>
                <h1 className='page-title'>Documents</h1>
                <button onClick={handleShow} className="btn btn-icon">Add New</button>
            </div>
            <div className='documents-lists'>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Folder</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">Folder : </span>
                  <input type="text" className="form-control" 
                  onChange={e => {
                    setFolderName(e.target.value);
                  }}
                  value={folderName} placeholder="Folder Name" />
                  <button onClick={saveFolder} className='btn btn-primary'>Save</button>
                </div>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      </Modal>
                {documentsData && documentsData.length > 0 && documentsData.map((list) => (
                <div className='documents-list' key={list.fieldId}>
                    <div className="card">
                        <img src={folderIcon} className="card-img-top" alt="File" />
                        <div className="card-body">
                        <Link to={`../DocumentsView/${list.fieldId}`}><h5 className="card-title">{list.fieldName}</h5></Link>
                            <p className="card-text">Date : {list.fieldDate}</p>
                            <p className="card-text">Created by : {list.fieldUserId}</p>
                            {/* <p className="card-option">
                                <Link to={`../DocumentsEdit/${list.fieldId}`} className="btn btn-primary"><img src={editIcon} alt="Edit"/> Edit</Link>
                                <button onClick={documentDelete} className="btn btn-primary"> <img src={deleteIcon} alt="Delete"/> Delete</button>
                            </p> */}
                        </div>
                    </div>
                </div>
                ))}
            </div>
        </div>
      </div>
    </>
  )
}

export default Folder
