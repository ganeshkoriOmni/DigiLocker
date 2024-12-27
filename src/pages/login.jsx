import { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form';
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { userLogin } from '../services/api';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const loginSubmit = async (e) => {
      e.preventDefault()

        const loginInfo = {
            email,
            password
        };

        try {
            const loginApi = await userLogin(loginInfo);
            console.log(loginApi);
            if(loginApi.status =='Error'){
              console.log(loginApi.status);
              setError(true)
            }else{
            console.log(loginApi.data[0].fieldEmail);
            sessionStorage.setItem("userId", loginApi.data[0].fieldId);
            sessionStorage.setItem("userEmail", loginApi.data[0].fieldEmail);
            sessionStorage.setItem("userName", loginApi.data[0].fieldName);
            sessionStorage.setItem("userLastName", loginApi.data[0].fieldLastName);
            setError(false)
            navigate('/Dashboard');
            }
          } catch (error) {

          }

      };


  return (
    <>
    <div className='main-page'>
    <div className='main-page-small'>
    <h1>Login</h1>
    {error ? "Please enter valid details" : ""}
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
      
      <button variant="secondary"> Login </button>
       Not a member? <Link to="../Register">Register</Link>
    </Form>
    </div>
    </div>
    </>
  )
}

export default Login
