import React, { useState, useEffect, useRef } from 'react'
import generatePDF from "react-to-pdf";
import { Link, useParams, useNavigate } from "react-router-dom";
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor,Viewer } from '@toast-ui/react-editor';
import {getDocumentIdApi, updateDocumentIdApi} from '../../services/api'

import './documents.css'

const DocumentsView = () => {
    let userId = sessionStorage.getItem("userId");
    const [documentsId, setDocumentsId] = useState(null);
    const [documentsName, setDocumentsName] = useState(null);
    const [documentsData, setDocumentsData] = useState(null);
    const [documentsEdit, setDocumentsEdit] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const getDocumentsData = async () => {
          try {
            const result = await getDocumentIdApi(id,userId)
            if (result.status === 200) {
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

      const options = {
        filename: `${documentsName}.pdf`,
        page: {
          margin: 20
        }
      };

      const share = () => {

      }

      const download = () => {
        const getTargetElement = () => document.getElementById("document-download");
        generatePDF(getTargetElement, options);
      }

  return (
    <>
      <div className='main-page'>
        <div className='documents-add'>

            <div className='page-title'>
                <h1 className='page-title'>Documents : {documentsName}</h1>
                <button onClick={() => window.history.back()} className='btn btn-icon'>Back</button>
            </div>
            <div className='document-option'>
              <button onClick={share} className='btn btn-icon'>Share</button>
              <button onClick={download} className='btn btn-icon'>Download</button>
            </div>
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
    </>
  )
}

export default DocumentsView
