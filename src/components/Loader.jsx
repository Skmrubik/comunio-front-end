import { useEffect } from 'react';
import '../App.css'

const Loader = ({mensaje}) => {
  return (
    <div className="loader-container">
      <div className="spinner"></div>
      <p style={{marginLeft: 10}}>{mensaje}</p>
    </div>
  );
};

export default Loader;