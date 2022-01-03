import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Grid from './Grid';
import Options from './Options';
import { getColors } from './services/ColorService';

function App() {

  const [rate, setRate] = useState(5);
  const [shape, setShape] = useState("cross");  
  const [steps, setSteps] = useState(10);
  const [theme, setTheme] = useState("rainbow");  
  const [wave, setWave] = useState(true);

  const handleRateChange = (rate) => {
    setRate(rate);
  };
  
  const handleResetGridClick = () => {
    
  };

  const handleShapeChange = (shape) => {
    setShape(shape);
  };
  
  const handleStepChange = (steps) => {
    setSteps(steps);
  };

  const handleThemeChange = (theme) => {
    setTheme(theme);
  };  

  const handleWaveChange = (wave) => {
    setWave(wave);
  };

  const options = {    
    handleRateChange,
    handleResetGridClick,
    handleShapeChange,
    handleStepChange,
    handleThemeChange,
    handleWaveChange,
    rate,
    shape,
    steps,    
    theme,
    wave    
  };

  const gridOptions = {
    cellSize: "50",
    colors: getColors(theme),
    rate,
    shape,    
    steps,
    wave    
  };

  return (
    <div className="container">
      <div className="options" >
          <Options {...options} />
        </div>        
        <div className="grid">        
          <Grid {...gridOptions} />
        </div>
    </div>
  );
}

export default App;
