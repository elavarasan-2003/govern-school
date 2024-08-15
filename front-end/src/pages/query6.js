import React, { useState, useEffect } from "react";
import { Select,Form,Input, Table, Button } from "antd";
import "../styles/query1.css";

const Query6 = () => {
    const [queryResult, setQueryResult] = useState([]);
    const [form] = Form.useForm();
  
    const handleQuerySubmit = async () => {
      try {
        
        const values = await form.validateFields();
        const { startYear, endYear } = values;
  
        
      const apiUrl = `/api/schools/query6?startYear=${startYear}&endYear=${endYear}`; 
      
      
        const response = await fetch(apiUrl);
        const data = await response.json();
        setQueryResult(data);
      } catch (error) {
        console.error("API Error:", error);
      }
    };

    // Call the query when the component mounts
    const columns = [
        { title: "School name", dataIndex: "Name", key: "Name" },
        { title: "StartYearPercentage", dataIndex: "passPercentageStartYear", key: "passPercentageStartYear" },
        { title: "EndYearPercentage", dataIndex: "passPercentageEndYear", key: "passPercentageEndYear" }

      ];// The empty dependency array ensures this effect runs once on component mount

      return (
        <div>
          <Form className='form6' form={form} onFinish={handleQuerySubmit}>
          <h2 class='h2'>Pass percentage of the scholl between two years</h2>
            
            <Form.Item label="Start Year:" name='startYear'>
                <Form.Item name='startYear' rules={[{ required: true, message: 'select city is required' }]}>
                 <Input type='text' />
                </Form.Item>
            </Form.Item>


            <Form.Item label="End Year :" name='endYear'>
                <Form.Item name='endYear' rules={[{ required: true, message: 'select city is required' }]}>
                 <Input type='text' />
                </Form.Item>
            </Form.Item>
    
            <Form.Item>
              <Button type="primary" htmlType="submit" className="button12">
                Submit
              </Button>
            </Form.Item>
          </Form>
    
          {queryResult.length > 0 && (
            <div>
              <h3>Query Result:</h3>
              <Table className="table6" columns={columns} dataSource={queryResult} />
            </div>
          )}
        </div>
      );
    };
    
    export default Query6;