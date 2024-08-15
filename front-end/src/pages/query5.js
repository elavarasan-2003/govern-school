import React, { useState, useEffect } from "react";
import { Select,Form,Input, Table, Button } from "antd";
import "../styles/query1.css";

const Query5 = () => {
    const [queryResult, setQueryResult] = useState([]);
    const [form] = Form.useForm();
  
    const handleQuerySubmit = async () => {
      try {
        
        const values = await form.validateFields();
        const { selectcity } = values;
  
        const apiUrl = `/api/schools/query5?&city=${selectcity}`;
        
  
        const response = await fetch(apiUrl);
        const data = await response.json();
        setQueryResult(data);
      } catch (error) {
        console.error("API Error:", error);
      }
    };

    // Call the query when the component mounts
    const columns = [
        { title: "city name", dataIndex: "city", key: "city" },
        { title: "School Name", dataIndex: "schoolName", key: "schoolName" },
        { title: "School Type", dataIndex: "schoolTypes", key: "schoolTypes" }

      ];// The empty dependency array ensures this effect runs once on component mount

      return (
        <div>

          <Form className='form5' form={form} onFinish={handleQuerySubmit}>
          <h2>List the types of schools in a city</h2>
            
            <Form.Item label="Enter City Name:" name='selectcity'>
                <Form.Item name='selectcity' rules={[{ required: true, message: 'select city is required' }]}>
                <Input type='text' />
            </Form.Item>

            </Form.Item>
    
            <Form.Item>
              <Button type="primary" htmlType="submit" className="button11">
                Submit
              </Button>
            </Form.Item>
          </Form>
    
          {queryResult.length > 0 && (
            <div>
              <h3>Query Result:</h3>
              <Table className="table11" columns={columns} dataSource={queryResult} />
            </div>
          )}
        </div>
      );
    };
    
    export default Query5;