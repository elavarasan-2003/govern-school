import React from 'react'
import {Form,Input,message} from 'antd'
import "../styles/LoginStyles.css";
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios'

const Login  = () => {
  const navigate = useNavigate()
  const onfinishHandler = async(values) => {
    console.log(values);
    try {
      const res = await axios.post('/api/v1/users/login',values)
      if(res.data.success){
        message.success('Login Successful')
        navigate('/')
      } else{
        message.error(res.data.message)
      }
    } catch (error) {
      console.log(error);
      message.error('Something went wrong')
      
    }
  };

  return (
    <div className='form-container'>
        <Form onFinish={onfinishHandler} className='Login-form'>
          <br></br>
          <br></br>
          <br></br>
          <h1 className='text-center'>Login </h1>
          <Form.Item label = 'Email' name = 'email'>
            <Input type = 'text' required/>
          </Form.Item>
          <Form.Item label = 'Password' name = 'password'>
            <Input type = 'password' required/>
          </Form.Item>

          <button className='btn-primary' type='submit'>Login</button>

          <Link to='/register' className='ms-2'>Don't have an account? Sign up here</Link>
        </Form>
      </div>
  )
}

export default Login 