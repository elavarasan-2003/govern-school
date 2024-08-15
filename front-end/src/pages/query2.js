import React, { useState, useEffect } from "react";
import { Form, Table, Button } from "antd";
import "../styles/query1.css";

const Query2 = () => {
  const [queryResult, setQueryResult] = useState([]);

  useEffect(() => {
    const handleQuery = async () => {
      try {
        const apiUrl = `/api/schools/query2`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        setQueryResult(data);
      } catch (error) {
        console.error("API Error:", error);
      }
    };

    // Call the query when the component mounts
    handleQuery();
  }, []); // The empty dependency array ensures this effect runs once on component mount

  const columns = [
    { title: "School Name", dataIndex: "Name", key: "Name" },
    { title: "Medium Of the School", dataIndex: "medium", key: "medium" },
    { title: "Established Year", dataIndex: "established_year", key: "established_year" },
    { title: "Older", dataIndex: "years_older", key: "years_older" },
 
    
  ];

  return (
    <div className="query2-container">
      <h2>Schools Older than 15 years</h2>
      {queryResult.length > 0 && (
        <div>
          <h3>Query Result:</h3>
          <Table className="table12" columns={columns} dataSource={queryResult} />
        </div>
      )}
    </div>
  );
};

export default Query2;
