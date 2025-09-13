import React from 'react';
import '../App.css'

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="spinner"></div>
      <p style={{marginLeft: 10}}>Jugando partido</p>
    </div>
  );
};

export default Loader;