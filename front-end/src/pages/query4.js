import React, { useState, useEffect } from "react";
import { Form, Table, Input, Button } from "antd";
import "../styles/query1.css";

const Query4 = () => {
  const [queryResult, setQueryResult] = useState([]);
  const [district, setDistrict] = useState(''); // State to store the district input

  const handleQuery = async () => {
    try {
      const apiUrl = `/api/schools/query4?district=${district}`; // Include the district as a query parameter
      const response = await fetch(apiUrl);
      const data = await response.json();
      setQueryResult(data);
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  useEffect(() => {
    // Call the query when the component mounts
    handleQuery();
  }, []); // The empty dependency array ensures this effect runs once on component mount

  const columns = [
    { title: "School Name", dataIndex: "Name", key: "Name" },
    { title: "Highest Admission", dataIndex: "totalAdmission", key: "totalAdmission" }
  ];

  const onFinish = () => {
    // Trigger the query when the form is submitted
    handleQuery();
  };

  return (
    <div className="query4-container">
      <h2>Find Highest Admission for a District</h2>
      <Form onFinish={onFinish}>
        <Form.Item name="district" label="Enter District Name">
          <Input
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Find Highest Admission
          </Button>
        </Form.Item>
      </Form>
      {queryResult.length > 0 && (
        <div>
          <h3>Query Result:</h3>
          <Table className="table13" columns={columns} dataSource={queryResult} />
        </div>
      )}
    </div>
  );
};

export default Query4;
