import { useCallback, useState } from 'react';
import { getNextShapeForGrid } from './services/ShapeService';
import { resetGridColors, setupGrid } from './services/GridService';
import './Grid.css';

function Grid(props) {    

    const {         
        colors,
        currentPattern,        
        handleSaveClickPattern,
        rate,
        shape,
        steps, 
        wave,         
    } = props;        

    const [grid, setGrid] = useState(setupGrid(1000, 2000, 25, 25));    
    
    const [intervals, setIntervals] = useState([]);
    const [clicks, setClicks] = useState([]);
    const [patternName, setPatternName] = useState("");
        
    useCallback(() => {        
        runSequence(currentPattern);
    }, [currentPattern]);
    

    const handleMouseOver = (e) => {        
        e.target.className = "blue-hover";
    };
    const handleMouseLeave = (e) => {
        e.target.className = "";
    }

    const handleMouseDown = (e) => {
        let row = e.target.getAttribute("data-row");
        console.log(row);
    }

    const handleMouseUp = (e) => {
        let row = e.target.getAttribute("data-row");
        console.log(row);
    }

    // todo reorder calls in this
    const handleResetClick = () => {        
        let tempGrid = resetGridColors(grid);        
        setGrid([...tempGrid]);
        intervals.forEach((interval) => {
            window.clearInterval(interval);
        });
        setIntervals([]);        
        //handleSaveClickPattern(clicks);
        setClicks([]);
        //runSequence(clicks);
    }        

    const handleClick = (e) => {
        let row = parseInt(e.currentTarget.getAttribute('data-row'), 10);        
        let column = parseInt(e.currentTarget.getAttribute('data-column'), 10);
        setClicks(clicks => [...clicks, {row, column, shape, steps}]);
        updateGrid(row, column, shape, steps);        
    }
    
    const handleSaveClickButton = () => {
        handleSaveClickPattern(clicks, patternName)
        //handlePatternNameChange(patternName); // put this up therfe
        setClicks([]);
        setPatternName("");
    }

    const handlePatternNameChange = (e) => {
        const payload = e.target.value;
        setPatternName(payload);
    }

    const handleRandom = () => {
        let clickPattern = [];
        for (let i = 0; i < 100; i++) {
            clickPattern = [...clickPattern, { row: Math.floor(Math.random() * 30), column: Math.floor(Math.random() * 30), shape: 'full', steps: 10}];
        }
        runSequence(clickPattern);
    }

    const runSequence = (clicks) => {
        if (clicks.length === 0) {
            return;
        }
        let keepShapeSequence = false;        
        let runInSequence = true; // false is cooler since it replays ur sequence in a nondeterministic order

        if (!runInSequence) {
            let counter = 0;            
           const clicksInterval = setInterval(() => {
               if (counter === clicks.length - 1) { 
                   window.clearInterval(clicksInterval);                   
               }

               if (keepShapeSequence) {
                   updateGrid(clicks[counter].row, clicks[counter].column, clicks[counter].shape, clicks[counter].steps);
               } else {
                   updateGrid(clicks[counter].row, clicks[counter].column, shape, steps);
               }               
               counter++;
           }, 20);
        } else {
            for (let i = 0; i < clicks.length; i++) {
                if (keepShapeSequence) { // turn this to false to have replays replay in currently selected shape
                    updateGrid(clicks[i].row, clicks[i].column, clicks[i].shape, clicks[i].steps)
                } else {
                    updateGrid(clicks[i].row, clicks[i].column, shape, steps)
                }
                
            }        
        }                
    }

    const updateGrid = (row, column, shape, steps) => {
        let stepGrid, stepNumber = 0;        
        // we can achieve different patterned effects by increment or decrementing stepNumber
        stepGrid = getNextShapeForGrid(grid, shape, colors, row, column, stepNumber);            
        setGrid([...stepGrid]);                                    
        if (wave) {
            const interval = setInterval(() => {
                
                if (stepNumber === steps) {
                    window.clearInterval(interval);                    
                }                
                stepGrid = getNextShapeForGrid(grid, shape, colors, row, column, stepNumber);
                setGrid([...stepGrid]);                                
                stepNumber++;
            }, 1 * rate);            
            setIntervals(prevIntervals => [...prevIntervals, interval]);
        }
    }    

    return (
        <div className="outer">
            <div>
                <button onClick={handleResetClick} id="reset">Reset Grid</button>
                <button onClick={handleSaveClickButton} id="reset">Save Click Pattern</button>
                <label htmlFor="pattern-name">Name</label>                
                <input type="text" name="pattern-name" value={patternName} onChange={handlePatternNameChange}/>
                <button onClick={handleRandom} id="random">Generate Random Pattern</button>
            </div>
            <div className="grid">
                {grid.map((row, index) => {
                    let rowStyle = {
                        height: 25
                    };

                    return (
                        <div key={index} className="row" style={rowStyle}>
                            {row.map((cell, columnIndex) => {
                                let style = {
                                    width: cell.width,
                                    height: cell.height,
                                    background: cell.colorIndex < colors.length ? colors[cell.colorIndex] : colors[0],                                    
                                    border: '1px solid black',                                    
                                    display: 'inline-block'
                                }
                                return (
                                    <div className="cell" data-row={index} data-column={columnIndex} key={cell.id}
                                        onClick={handleClick} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}
                                        onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} 
                                        style={style}></div>
                                );                            
                            })}
                        </div>
                    );                
                })}
            </div>            
        </div>
    );
}

export default Grid;