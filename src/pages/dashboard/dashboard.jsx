import { useState, useEffect } from 'react'
import axios from "axios";

function Dashboard() {
    let userEmail = sessionStorage.getItem("userEmail");


  return (
    <>
    Dashboard : {userEmail}
    </>
  )
}

export default Dashboard
