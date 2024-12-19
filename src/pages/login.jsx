import { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { userLogin } from '../services/api';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const loginSubmit = async () => {
        setEmail(email);

        sessionStorage.setItem("userId", "11111");
        sessionStorage.setItem("token", "00000000000");
        sessionStorage.setItem("userEmail", email);
        //navigate('/dashboard')
        const loginInfo = {
            'email' : email,
            'password' : password
        };

        try {
            const loginApi = await userLogin(loginInfo);
            console.log(loginApi.data)
          } catch (error) {

          }

      };


  return (
    <>
    Login
    <Form>
      <Form.Group className="mb-3" controlId="emailForm">
        <Form.Label>Email address</Form.Label>
        <Form.Control 
            onChange={e => {
              setEmail(e.target.value);
            }}
            type="email" placeholder="name@example.com" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="passwordForm">
        <Form.Label>Password</Form.Label>
        <Form.Control 
        onChange={e => {
            setPassword(e.target.value);
          }}
          type="email" placeholder="*********" />
      </Form.Group>
      
      <button type='submit' onClick={loginSubmit} variant="secondary">
                    Login
                </button>
    </Form>
    </>
  )
}

export default Login
