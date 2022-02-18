import React, { useState } from 'react';
import './App.css';
import Grid from './Grid';
import Options from './Options';
import { getColors, getRandomColor } from './services/ColorService';
import { getShapes } from './services/ShapeService';

function App() {

  const [rate, setRate] = useState(5);
  const [shape, setShape] = useState(getShapes()[0]);  
  const [steps, setSteps] = useState(10);
  const [theme, setTheme] = useState("rainbow");  
  const [wave, setWave] = useState(true);
  const [clickPatterns, setClickPatterns] = useState([]);
  const [currentPattern, setCurrentPattern] = useState([]);


  const handlePatternClick = (pattern) => {
    console.log('logging patterns');
    console.log(pattern);
    setCurrentPattern([...pattern]);
  };
  

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

  const handleSaveClickPattern = (clicks, patternName) => {
    if (clicks.length > 0) {
      setClickPatterns([...clickPatterns, {clicks, name: patternName}]);
    }    
  }

  const options = {        
    handlePatternClick,
    handleRateChange,
    handleResetGridClick,
    handleShapeChange,
    handleStepChange,
    handleThemeChange,
    handleWaveChange,
    clickPatterns,
    rate,
    shape,
    steps,    
    theme,
    wave    
  };

  const gridOptions = {    
    // colors: getColors(theme),
    colors: theme === "random" ? new Array(100).fill("").map((x) => getRandomColor()) : getColors(theme),
    currentPattern,
    handleSaveClickPattern,
    rate,
    shape,    
    steps,
    wave    
  };

  return (
    <div className="container">
      <div>
        <Options {...options} />
      </div>        
      <div className="">        
        <Grid {...gridOptions} />
      </div>
    </div>
  );
}

export default App;
