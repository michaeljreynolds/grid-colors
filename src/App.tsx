import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Grid from './Grid';
import Options from './Options';
import { getColors } from './services/ColorService';

function App() {

  const [shape, setShape] = useState("cross");
  const [wave, setWave] = useState(true);
  const [colors, setColors] = useState(getColors("defaultTheme"));

  const shapeCallback = (currentShape) => {
    setShape(currentShape);
  };

  const waveCallback = (wave) => {
    setWave(wave);
  };

  const themeCallback = (theme) => {
    setColors(getColors(theme));
  };

  return (
    <div className="container">
      <div className="options" >
          <Options shapeCallback={shapeCallback} waveCallback={waveCallback} themeCallback={themeCallback}  />
        </div>        
        <div className="grid">        
          <Grid shape={shape} wave={wave} cellSize="50" colors={colors} />
        </div>
    </div>
  );
}

export default App;
