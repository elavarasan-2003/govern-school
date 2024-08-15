import React, { useState, useEffect } from "react";
import { Form, Table, Button } from "antd";
import "../styles/query1.css";

const Query1 = () => {
  const [queryResult, setQueryResult] = useState([]);

  useEffect(() => {
    const handleQuery = async () => {
      try {
        const apiUrl = `/api/schools/query1`;
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
    { title: "School Name", dataIndex: "Name", key: "" },
    { title: "Male Student", dataIndex: "total_male_students", key: "total_male_students" },
    { title: "Female Student", dataIndex: "total_female_students", key: "total_female_students" },
    { title: "Total Students", dataIndex: "total_students", key: "total_students" },
    { title: "Male Faculty", dataIndex: "total_male_faculties", key: "total_male_faculties" },
    { title: "Female Faculty", dataIndex: "total_female_faculties", key: "total_female_faculties" },
    { title: "Total Faculty", dataIndex: "total_faculties", key: "total_faculties" }
  ];

  return (
    <div className="query1-container">
      <h2>School Wise Student Teachers Count:</h2>
      {queryResult.length > 0 && (
        <div>
          <h3>Query Result:</h3>
          <Table
            className="table11"
            columns={columns}
            dataSource={queryResult}
            style={{ background: "transparent" }}
          />
        </div>
      )}
    </div>
  );
};

export default Query1;
