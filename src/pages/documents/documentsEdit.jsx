import React, { useState, useEffect, useRef } from 'react'
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import {getDocumentIdApi, updateDocumentIdApi} from '../../services/api'

import './documents.css'

const DocumentsEdit = () => {
    const [previewStyle, setPreviewStyle] = useState("vertical");
    const editorRef = useRef();
    let userId = sessionStorage.getItem("userId");
    const [documentsId, setDocumentsId] = useState(null);
    const [documentsName, setDocumentsName] = useState(null);
    const [documentsData, setDocumentsData] = useState(null);
    const [documentsEdit, setDocumentsEdit] = useState(false);
    const [documentsSaved, setDocumentsSaved] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const getDocumentsData = async () => {
          try {
            const result = await getDocumentIdApi(id,userId)
            if (result.status === 200) {
              console.log('result', result.data[0].fieldData);
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
      }, [])

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
      }
    } catch (error) {
      console.error(error)
    }
    console.log('test', editorRef.current.editorInst.getHTML())
  }

  return (
    <>
      <div className='main-page'>
        <div className='documents-add'>
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
              <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">Document : </span>
                <input type="text" class="form-control" 
                onChange={e => {
                  setDocumentsName(e.target.value);
                }}
                value={documentsName} placeholder="Username" />
              </div>
              {documentsEdit && (<Editor
                  initialValue={documentsData}
                  previewStyle={previewStyle}
                  minHeight="400px"
                  initialEditType="wysiwyg"
                  useCommandShortcut={true}
                  ref={editorRef}
              />)}
              <div className='document-editor-option'>
                <button onClick={saveEditor} className='btn btn-primary'>Save</button>
                <button onClick={() => window.history.back()} className='btn btn-secondary'>Cancel</button>
              </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default DocumentsEdit
