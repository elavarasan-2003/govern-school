import React, { useState, useEffect } from "react";
import { Select,Form,Input, Table, Button } from "antd";
import "../styles/query1.css";

const Query7 = () => {
    const [queryResult, setQueryResult] = useState([]);
    const [form] = Form.useForm();
  
    const handleQuerySubmit = async () => {
      try {
        
        const values = await form.validateFields();
        const { selectdistrict } = values;
  
        const apiUrl = `/api/schools/query7?&district=${selectdistrict}`;
        
  
        const response = await fetch(apiUrl);
        const data = await response.json();
        setQueryResult(data);
      } catch (error) {
        console.error("API Error:", error);
      }
    };

    // Call the query when the component mounts
    const columns = [
        { title: "District name", dataIndex: "city", key: "city" },
        { title: "Total Student", dataIndex: "totalStudents", key: "totalStudents" },
        { title: "Total Faculty", dataIndex: "totalFaculty", key: "totalFaculty" }

      ];// The empty dependency array ensures this effect runs once on component mount

      return (
        <div>
          <Form className='form7' form={form} onFinish={handleQuerySubmit}>
          <h2 class='h2'>Student and Faculty count in a District</h2>
            
            <Form.Item label="Enter District Name:" name='selectdistrict'>
                <Form.Item name='selectdistrict' rules={[{ required: true, message: 'select city is required' }]}>
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
              <Table className="table17" columns={columns} dataSource={queryResult} />
            </div>
          )}
        </div>
      );
    };
    
    export default Query7;