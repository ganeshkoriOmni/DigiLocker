import React, { useState, useEffect } from 'react'
import axios from "axios";
import { Link } from "react-router-dom";
import { getDashboardApi } from '../../services/api';

const Dashboard = () => {
    let userEmail = sessionStorage.getItem("userEmail");
    const [dashboardData, setDashboardData] = useState(null);
    
    useEffect(() => {
      const getDashboardData = async () => {
        try {
          const result = await getDashboardApi(userEmail)
          if (result.status === 200) {
            console.log('result', result)
            setDashboardData(result.data)
          }
        } catch (error) {
          console.error(error)
        }
      }
      getDashboardData()
    }, [])

  return (
    <>
    <div className='main-page'>
      Dashboard : {userEmail}
      {dashboardData}
    </div>
    </>
  )
}

export default Dashboard
