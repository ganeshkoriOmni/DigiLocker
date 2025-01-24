import React, { useState, useEffect, useRef } from 'react'
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import Documents from './documents';
import backIcon from "../../assets/images/back.svg";
import {addDocumentIdApi} from '../../services/api'
import './documents.css'

const DocumentsAdd = () => {
    const [previewStyle, setPreviewStyle] = useState("vertical");
    const editorRef = useRef();
    const navigate = useNavigate();
    let userId = sessionStorage.getItem("userId");
    const [documentsName, setDocumentsName] = useState('Document Name');
    const [documentsSaved, setDocumentsSaved] = useState(false);
    const [msgStatus, setMsgStatus] = useState(false);

  const saveEditor = async () => {
    const documentDataGet = editorRef.current.editorInst.getHTML();
    const documentForm = {
      userId,
      documentsName,
      documentDataGet
    }
    try {
      const result = await addDocumentIdApi(documentForm,userId);
      console.log(result);
      if (result.status === 200) {
        setDocumentsSaved(true)
        setTimeout(() => {
          navigate('../Documents');
        }, 1000);
      }else{
        setMsgStatus(true)
      }
    } catch (error) {
      console.error(error)
    }
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
                  <h1 className='page-title'>Documents Add</h1>
                  <button onClick={() => window.history.back()} className='btn btn-primary'><img src={backIcon} alt="Back"/> Back</button>
              </div>
              <div className='document-editor'>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">Document : </span>
                  <input type="text" className="form-control" 
                  onChange={e => {
                    setDocumentsName(e.target.value);
                  }}
                  value={documentsName} placeholder="Username" />
                </div>
                <Editor
                    initialValue=" "
                    previewStyle={previewStyle}
                    minHeight="600px"
                    initialEditType="wysiwyg"
                    useCommandShortcut={true}
                    ref={editorRef}
                />
                <div className='document-editor-option'>
                  <button onClick={saveEditor} className='btn btn-primary'>Save</button>
                  <button onClick={() => window.history.back()} className='btn btn-secondary'>Cancel</button>
                </div>
              </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default DocumentsAdd
