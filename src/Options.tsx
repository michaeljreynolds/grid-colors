import { emitWarning } from 'process';
import { useState } from 'react';
import './Options.css';

function Options(props) {

    const { shapeCallback, waveCallback } = props;

    const [shape, setShape] = useState("cross");
    const [wave, setWave] = useState(false);

    const handleChange = (e) => {
        const { id } = e.target;        
        setShape(id);
        shapeCallback(id);
    }

    const handleWaveChange = (e) => {
        const { checked } = e.target;
        setWave(checked);
        waveCallback(checked);
    }

    let shapes = ["cross", "square", "triangle"];

    return (
        <div className="flex">
            <div>
                Shapes:
                {shapes.map((currentShape, index) => {                
                    return (
                        <div key={currentShape}>
                            <input type="radio" id={currentShape} name="shape" checked={currentShape === shape} onChange={handleChange}/>
                            <label htmlFor={currentShape}>{currentShape}</label>
                        </div>
                    );
                })}    
            </div>                    
            <div>
                Wave: <input type="checkbox" name="wave" id="wave" onChange={handleWaveChange} />
            </div>
        </div>
    );
}
export default Options;

/*

todo
1) create an interval that runs every x ms and pick a random spot to click
2) create patterns of spots to click based off of some equation
3) create different shape options
4) create propagating shape options
5) change color changing property where a click cycles through colors and turns surrounding squares that color instead of turning it a color based off 
of another color
6) make grid size of screen
6a) be able to resize screen and it changes grid


*/