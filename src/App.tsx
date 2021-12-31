import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Grid from './Grid';
import Options from './Options';

function App() {

  const [shape, setShape] = useState("cross");
  const [wave, setWave] = useState(false);

  const shapeCallback = (currentShape) => {
    setShape(currentShape);
  }

  const waveCallback = (wave) => {
    setWave(wave);
  }

  const colors = [
    'blue',
    'red',
    'green',
    'yellow'
  ];

  return (
    <div className="container">
      <div className="options" >
          <Options shapeCallback={shapeCallback} waveCallback={waveCallback} />
        </div>        
        <div className="grid">        
          <Grid shape={shape} wave={wave} cellSize="50" colors={colors} />
        </div>
    </div>
  );
}

export default App;
