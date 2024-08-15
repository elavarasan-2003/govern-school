import React from 'react'
import {Form, Input, message} from 'antd'
import axios from 'axios'
const result = [];
const onfinishHandler = async(values)=>{
    try {
        const res = await axios.post('/api/v1/users/search', values);
        const a = res.data.data
        console.log(a.password)
        result.append(a)
        if(res.data.success){
            message.success('Registered Successfully!')
            
          }
          else{
            message.error(res.data.message)
          }
    } catch (error) {
        console.log(error)        
    }
}

const SearchPage = () => {
    
  return (
    <div>
        <Form>
        <Form.Item label = 'Name' name = 'name' onFinish = {onfinishHandler}>
            <Input type = 'text' required/>
        </Form.Item>
        <button  className='btn btn-primary' onClick={onfinishHandler}>Register</button>
        </Form>
    </div>
  )
}

export default SearchPage;