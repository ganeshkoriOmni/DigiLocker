import React, { useState, useEffect, useRef } from 'react'
import generatePDF, { Resolution, Margin } from "react-to-pdf";
import { Link, useParams, useNavigate } from "react-router-dom";
import '@toast-ui/editor/dist/toastui-editor.css';
import Documents from './documents';
import { Editor,Viewer } from '@toast-ui/react-editor';
import {getDocumentIdApi, deleteDocumentIdApi, shareDocumentIdApi} from '../../services/api'
import editIcon from "../../assets/images/edit.svg";
import peoplesIcon from "../../assets/images/peoples.svg";
import deleteIcon from "../../assets/images/delete.svg";
import downloadIcon from "../../assets/images/download.svg";
import backIcon from "../../assets/images/back.svg";
import plusIcon from "../../assets/images/plus.svg";


import './documents.css'

const DocumentsView = () => {
    let userId = sessionStorage.getItem("userId");
    const [documentsId, setDocumentsId] = useState(null);
    const [documentsName, setDocumentsName] = useState(null);
    const [documentsData, setDocumentsData] = useState(null);
    const [documentsEdit, setDocumentsEdit] = useState(false);
    const [documentsOption, setDocumentsOption] = useState(true);
    const [documentsDelete, setDocumentsDelete] = useState(false);
    const [documentsUserId, setDocumentsUserId] = useState(null);
    const [documentsShare, setDocumentsShare] = useState(false);
    const [documentsUnShare, setDocumentsUnShare] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const getDocumentsData = async () => {
          setDocumentsEdit(false);
          try {
            const result = await getDocumentIdApi(id,userId)
            if (result.status === 200) {
              setDocumentsId(result.data[0].fieldId);
              setDocumentsName(result.data[0].fieldName);
              setDocumentsData(result.data[0].fieldData);
              setDocumentsUserId(result.data[0].fieldUserId);
              if(result.data[0].fieldOption == 'Share'){
                setDocumentsOption(false);
              }
              
              setDocumentsEdit(true);
            }
          } catch (error) {
            console.error(error)
          }
        }
        getDocumentsData()
      }, [navigate])

      const options = {
        filename: `${documentsName}.pdf`,
        resolution: Resolution.HIGH,
        page: {
            margin: 10,
            // default is 'A4'
            format: 'letter',
            // default is 'portrait'
            //orientation: 'landscape',
        },
      };

      const download = () => {
        const getTargetElement = () => document.getElementById("document-download");
        generatePDF(getTargetElement, options);
      }

      const documentDelete = async () => {
        let text = "Are you sure you want to delete";
        if (confirm(text) == true) {
            try {
              const result = await deleteDocumentIdApi(id,userId)
              if (result.status === 200) {
                setDocumentsDelete(true);
                setTimeout(() => {
                  navigate('/Documents');
                }, 1000);
              }
            } catch (error) {
              console.error(error)
            }
          }
      }

      const documentShare = async () => {
        let text = "Are you sure you want to share";
        if (confirm(text) == true) {
            try {
              const result = await shareDocumentIdApi(id,'Share',userId)
              if (result.status === 200) {
                setDocumentsShare(true);
                setDocumentsOption(false);
                setTimeout(() => {
                  setDocumentsShare(false);
                }, 1500);
              }
            } catch (error) {
              console.error(error)
            }
          }
      }

      const documentUnShare = async () => {
        let text = "Are you sure you want to remove share";
        if (confirm(text) == true) {
            try {
              const result = await shareDocumentIdApi(id,'0',userId)
              if (result.status === 200) {
                setDocumentsUnShare(true);
                setDocumentsOption(true);
                setTimeout(() => {
                  setDocumentsUnShare(false);
                }, 1500);
              }
            } catch (error) {
              console.error(error)
            }
          }
      }
        

  return (
    <>
      <div className='main-page'>
        
        <div className='documents-view'>
            <div className='documents-left'>
            <Documents />
            </div>
            <div className='documents-right'>
              <div className='page-title'>
                  <h1 className='page-title'>{documentsName}</h1>
                  <button onClick={() => window.history.back()} className='btn btn-primary'><img src={backIcon} alt="Back"/> Back</button>
              </div>
              <div className='document-option'>
                <button onClick={download} className='btn btn-primary'><img src={downloadIcon} alt="Download"/> Download</button>
                {documentsUserId == userId && (
                  <span>
                    
                    {documentsOption && (
                      <button onClick={documentShare} className='btn btn-primary'><img src={peoplesIcon} alt="Peoples"/> Share</button>
                    )}
                    {!documentsOption && (
                      <button onClick={documentUnShare} className='btn btn-primary'><img src={peoplesIcon} alt="Peoples"/> Remove Share</button>
                    )}
                    <Link to={`../DocumentsEdit/${id}`} className="btn btn-primary"><img src={editIcon} alt="Edit"/> Edit</Link>
                    <button onClick={documentDelete} className="btn btn-primary"> <img src={deleteIcon} alt="Delete"/> Delete</button>
                  </span>
                )}
                <Link to={`../DocumentsAdd`} className="btn btn-primary"><img src={plusIcon} alt="Add"/> Add New</Link>
              </div>
              
              {documentsDelete && (
                <div className="alert alert-success" role="alert">
                  Document Deleted succesfully.
                </div>
              )}
              {documentsShare && (
                <div className="alert alert-success" role="alert">
                  Document Shared succesfully.
                </div>
              )}
              {documentsUnShare && (
                <div className="alert alert-success" role="alert">
                  Document Remove Share succesfully.
                </div>
              )}
              <div className='document-viewer'>
                <div id='document-download'>
                  {documentsEdit && (<Viewer
                        initialValue={documentsData}
                        viewer='true'
                    />)}
                </div>
              </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default DocumentsView
