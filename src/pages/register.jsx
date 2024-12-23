  import { useState, useEffect } from 'react'
  import Form from 'react-bootstrap/Form';
  import axios from "axios";
  import { useNavigate, Link } from "react-router-dom";
  import { userRegister, checkExistApi } from '../services/api';
  
  function Register() {
      const navigate = useNavigate();
      const [fname, setFname] = useState("");
      const [mname, setMname] = useState("");
      const [lname, setLname] = useState("");
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [emailCheck, setEmailCheck] = useState(false);
  
      const registerSubmit = async (e) => {
        e.preventDefault()
        const registerInfo = {
            fname,
            mname,
            lname,
            email,
            password
        };

        try {
          const registerApi = await userRegister(registerInfo);
          if(registerApi.status==200){
            navigate('/Login')
          }
        } catch (error) {

        }
  
      };

      useEffect(() => {
        const checkExistEmail = async () => {
          try {
            const response = await checkExistApi({email : email});
            console.log(response.status);
            if(response.status=="Error"){
              setEmailCheck(true)
            }else{
              setEmailCheck(false)
            }
          } catch (error) {
            console.error(error);
          }
        };
        checkExistEmail();
      }, [email]);
  
  
    return (
      <>
      <div className='main-page'>
      <div className='main-page-small'>
      <h1>Register</h1>
      <Form onSubmit={registerSubmit}>
      <Form.Group className="mb-3" controlId="firstNameForm">
          <Form.Label>First Name</Form.Label>
          <Form.Control required
              onChange={e => {
                setFname(e.target.value);
              }}
              type="text" name='First Name' placeholder="First Name" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="middelNameForm">
          <Form.Label>Middel Name</Form.Label>
          <Form.Control required
              onChange={e => {
                setMname(e.target.value);
              }}
              type="text" name='mname' placeholder="Middel Name" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="lastNameForm">
          <Form.Label>Last Name</Form.Label>
          <Form.Control required
              onChange={e => {
                setLname(e.target.value);
              }}
              type="text" name='lname' placeholder="Last Name" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="emailForm">
          <Form.Label>Email address</Form.Label>
          <Form.Control required
              onChange={e => {
                setEmail(e.target.value);
              }}
              type="email" name='email' placeholder="name@example.com" />
              <p className=''>{emailCheck ? "Email already exist" : ""}</p>
              <Form.Control.Feedback type="invalid">This is required.</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="passwordForm">
          <Form.Label>Password</Form.Label>
          <Form.Control required
          onChange={e => {
              setPassword(e.target.value);
            }}
            type="password" name='password' placeholder="*********" />
            <Form.Control.Feedback type="invalid">This is required.</Form.Control.Feedback>
        </Form.Group>
        
        <button type="submit" variant="secondary" disabled={emailCheck ? "disabled" : ""}> Register </button>
        <Link to="../Login">Login</Link>
      </Form>
      </div>
      </div>
      </>
    )
  }
  
  export default Register
  