import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Grid from './Grid';
import Options from './Options';

function App() {

  const [shape, setShape] = useState("cross");

  const shapeCallback = (currentShape) => {
    setShape(currentShape);
  }

  const colors = [
    'blue',
    'red',
    'green',
    'yellow'
  ];

  return (
    <div className="container">
      <div>
        <div className="options" >
          <Options shapeCallback={shapeCallback} />
        </div>        
        <div className="grid">        
          <Grid shape={shape} cellSize="50" colors={colors} />
        </div>
      </div>      
    </div>
  );
}

export default App;
