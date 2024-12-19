import { useState, useEffect } from 'react'
import axios from "axios";

function Register() {
    let userEmail = sessionStorage.getItem("userEmail");


  return (
    <>
    Register
    {userEmail}
    </>
  )
}

export default Register
