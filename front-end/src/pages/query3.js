import React, { useState, useEffect } from "react";
import { Form, Table, Button } from "antd";
import "../styles/query1.css";

const Query3 = () => {
  const [queryResult, setQueryResult] = useState([]);

  useEffect(() => {
    const handleQuery = async () => {
      try {
        const apiUrl = `/api/schools/query3`;
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
    { title: "District", dataIndex: "_id", key: "_id" },
    { title: "School Name", dataIndex: "school", key: "school" },
    { title: "Score", dataIndex: "highestAverageScore", key: "highestAverageScore" }
   
  ];

  return (
    <div className="query3-container">
      <h2>District wise high score:</h2>
      {queryResult.length > 0 && (
        <div>
          <h3>Query Result:</h3>
          <Table className="table13" columns={columns} dataSource={queryResult} />
        </div>
      )}
    </div>
  );
};

export default Query3;
