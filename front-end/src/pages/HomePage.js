import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomeStyles.css';

const HomePage = () => {
  return (
    <div className="body">
      <div className="home-container">
        <header className="header">
          <h1 className="header-text"><em>GOVERNMENT SCHOOL ANALYSIS</em></h1>
        </header>
        
        <nav className="sidebar111">
          <div className='link-container10'>
            <p><em>OPTIONS    ...</em></p>
          </div>
          <div className="link-container">
            <Link to="/Register" className="sidebar-link">
              <em>School Registration</em>
            </Link>
          </div>
          <div className="link-container">
            <Link to="/query1" className="sidebar-link">
              <em>Analysis 1</em>
            </Link>
          </div>
          <div className="link-container">
            <Link to="/query2" className="sidebar-link">
              <em>Analysis 2</em>
            </Link>
          </div>
          <div className="link-container">
            <Link to="/query3" className="sidebar-link">
              <em>Analysis 3</em>
            </Link>
          </div>
          <div className="link-container">
            <Link to="/query4" className="sidebar-link">
              <em>Analysis 4</em>
            </Link>
          </div>
          <div className="link-container">
            <Link to="/query5" className="sidebar-link">
              <em>Analysis 5</em>
            </Link>
          </div>
          <div className="link-container">
            <Link to="/query6" className="sidebar-link">
              <em>Analysis 6</em>
            </Link>
          </div>
          <div className="link-container">
            <Link to="/query7" className="sidebar-link">
              <em>Analysis 7</em>
            </Link>
          </div>
        
        </nav>
        
  <div class='container'>
    <div className='booddo'>
        <p>This project conducts a focused analysis of government schools</p> 
        <br></br>
        <p>in Tamil Nadu for the years 2019, 2020, and 2021.</p>
        <br></br>
        <p>You can ask some analytics query here.</p>
    </div>
</div>

      </div>
    </div>
  );
};

export default HomePage;
