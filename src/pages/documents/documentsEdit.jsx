import React, { useState, useEffect, useRef } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom";
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import Documents from './documents';
import {getDocumentIdApi, updateDocumentIdApi} from '../../services/api'

import './documents.css'

const DocumentsEdit = () => {
    const editorRef = useRef();
    let userId = sessionStorage.getItem("userId");
    const [documentsId, setDocumentsId] = useState(null);
    const [documentsName, setDocumentsName] = useState("");
    const [documentsData, setDocumentsData] = useState(null);
    const [documentsEdit, setDocumentsEdit] = useState(false);
    const [documentsSaved, setDocumentsSaved] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const getDocumentsData = async () => {
          setDocumentsEdit(false);
          try {
            const result = await getDocumentIdApi(id,userId)
            if (result.status === 200) {
              if(result.data[0].fieldUserId != userId){
                navigate('/Documents');
              }
              setDocumentsId(result.data[0].fieldId);
              setDocumentsName(result.data[0].fieldName);
              setDocumentsData(result.data[0].fieldData);
              setDocumentsEdit(true);
            }
          } catch (error) {
            console.error(error)
          }
        }
        getDocumentsData()
      }, [navigate])

  const saveEditor = async () => {
    const documentDataGet = editorRef.current.editorInst.getHTML();
    const documentForm = {
      documentsId,
      userId,
      documentsName,
      documentDataGet
    }
    try {
      const result = await updateDocumentIdApi(documentForm,userId)
      if (result.status === 200) {
        setDocumentsSaved(true)
        setTimeout(() => {
          setDocumentsSaved(false)
        }, 1500);
      }
    } catch (error) {
      console.error(error)
    }
   // console.log('test', editorRef.current.editorInst.getHTML())
  }

  const saveViewEditor = async () => {
    saveEditor();
    navigate(`../DocumentsView/${id}`);
  }

  return (
    <>
      <div className='main-page'>
        <div className='documents-view'>
          <div className='documents-left'>
            <Documents optionEdit="true" />
            </div> 
            <div className='documents-right'>
              {documentsSaved && (
                <div className="alert alert-success" role="alert">
                  Document saved succesfully.
                </div>
              )}
              <div className='page-title'>
                  <h1 className='page-title'>Documents Edit : {documentsName}</h1>
                  <button onClick={() => window.history.back()} className='btn btn-icon'>Back</button>
              </div>
              <div className='document-editor'>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">Document : </span>
                  <input type="text" className="form-control" 
                  onChange={e => {
                    setDocumentsName(e.target.value);
                  }}
                  value={documentsName} placeholder="Username" />
                  <button onClick={saveEditor} className='btn btn-primary'>Save</button>
                  <button onClick={saveViewEditor} className='btn btn-primary'>Save and View</button>
                  <Link to='../Documents' className="btn btn-secondary">Cancel</Link>
                </div>
                {documentsEdit && (<Editor
                    initialValue={documentsData}
                    previewStyle="vertical"
                    height="500px"
                    initialEditType="wysiwyg"
                    useCommandShortcut={true}
                    ref={editorRef}
                />)}
                <div className='document-editor-option'>
                  <button onClick={saveEditor} className='btn btn-primary'>Save</button>
                  <Link to='../Documents' className="btn btn-secondary">Cancel</Link>
                </div>
              </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default DocumentsEdit
