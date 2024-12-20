import { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { userLogin } from '../services/api';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginSubmit = async (e) => {
      e.preventDefault()

        const loginInfo = {
            email,
            password
        };

        try {
            const loginApi = await userLogin(loginInfo);
            console.log(loginApi.data[0].email);
            sessionStorage.setItem("userId", loginApi.data[0].id);
            sessionStorage.setItem("userEmail", loginApi.data[0].email);
            navigate('/dashboard')
          } catch (error) {

          }

      };


  return (
    <>
    Login
    <Form onSubmit={loginSubmit}>
      <Form.Group className="mb-3" controlId="emailForm">
        <Form.Label>Email address</Form.Label>
        <Form.Control 
            onChange={e => {
              setEmail(e.target.value);
            }}
            type="email" name='email' placeholder="name@example.com" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="passwordForm">
        <Form.Label>Password</Form.Label>
        <Form.Control 
        onChange={e => {
            setPassword(e.target.value);
          }}
          type="password" name='password' placeholder="*********" />
      </Form.Group>
      
      <button variant="secondary">
                    Login
                </button>
    </Form>
    </>
  )
}

export default Login
