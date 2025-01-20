import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import './documents.css'
import editIcon from "../../assets/images/edit.svg";
import fileIcon from "../../assets/images/file.svg";
import deleteIcon from "../../assets/images/delete.svg";
import { getDocumentsApi } from '../../services/api';


const Documents = ({optionEdit}) => {
    let userId = sessionStorage.getItem("userId");
    let userName = sessionStorage.getItem("userName");
    const [documentsData, setDocumentsData] = useState(null);

    useEffect(() => {
        const getDocumentsData = async () => {
          try {
            const result = await getDocumentsApi(userId)
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

  return (
    <>
      <div className='main-page'>
        <div className='documents-page'>
            <div className='page-title'>
                <h1 className='page-title'>Documents </h1>
                <Link to='../DocumentsAdd' className="btn btn-icon">Add New</Link>
            </div>
            <div className='documents-lists'>
                {documentsData && documentsData.length > 0 && documentsData.map((list) => (
                <div className='documents-list' key={list.fieldId}>
                    <div className="card">
                        <img src={fileIcon} className="card-img-top" alt="File" />
                        <div className="card-body">
                        <Link to={`../${optionEdit ? 'DocumentsEdit' : 'DocumentsView' }/${list.fieldId}`}><h5 className="card-title">{list.fieldName}</h5></Link>
                            <p className="card-text">Date : {list.fieldLastDate}</p>
                            <p className="card-text">Created by : {userName}</p>
                            
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

export default Documents
