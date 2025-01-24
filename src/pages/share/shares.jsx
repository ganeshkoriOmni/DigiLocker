import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
// import './documents.css'
import editIcon from "../../assets/images/edit.svg";
import fileIcon from "../../assets/images/file.svg";
import deleteIcon from "../../assets/images/delete.svg";
import { getShareApi } from '../../services/api';


const Shares = () => {
    let userId = sessionStorage.getItem("userId");
    const [documentsData, setDocumentsData] = useState(null);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const getDocumentsData = async () => {
          try {
            const result = await getShareApi(userId)
            if (result.status === 200) {
              console.log('result', result)
              setDocumentsData(result.data.filter(field => field.fieldName.toUpperCase().includes(search.toUpperCase())))
              //setDocumentsData(result.data)
            }
          } catch (error) {
            console.error(error)
          }
        }
        getDocumentsData()
      }, [search])

  return (
    <>
      <div className='main-page'>
        <div className='documents-page'>
            <div className='page-title'>
                <h1 className='page-title'>Shares</h1>
                <form className="search-option" role="search">
                    <input className="form-control me-2"
                    onChange={e => {
                        setSearch(e.target.value);
                      }}
                       type="search" placeholder="Type.." aria-label="Search" />
                </form>
            </div>
            <div className='documents-lists'>
                {documentsData && documentsData.length > 0 && documentsData.map((list) => (
                <div className='documents-list' key={list.fieldId}>
                    <div className="card">
                    <Link to={`../DocumentsView/${list.fieldId}`} className='card-img-link'>
                        <img src={fileIcon} className="card-img-top" alt="File" />
                    </Link>
                        <div className="card-body">
                        <Link to={`../DocumentsView/${list.fieldId}`}><h5 className="card-title">{list.fieldName}</h5></Link>
                            <p className="card-text">Date : {list.fieldLastDate}</p>
                            <p className="card-text">Created by : {list.fieldUserId}</p>
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

export default Shares
