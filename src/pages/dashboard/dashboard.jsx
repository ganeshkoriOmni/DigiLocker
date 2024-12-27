import React, { useState, useEffect } from 'react'
import axios from "axios";
import { Link } from "react-router-dom";

const Dashboard = () => {
    let userEmail = sessionStorage.getItem("userEmail");
    


  return (
    <>
    <div className='main-page'>
      Dashboard : {userEmail}
    </div>
    </>
  )
}

export default Dashboard
