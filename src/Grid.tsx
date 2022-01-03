import { emitWarning } from 'process';
import React, { useEffect, useState } from 'react';
import { getNextShapeForGrid, resetGridColors } from './services/ShapeService';
import './Grid.css';

function Grid(props) {    

    const {
        cellSize, 
        colors,
        rate,
        shape,
        steps, 
        wave,         
    } = props;        

    const [grid, setGrid] = useState(() => {
        let tempGrid = [];
        let id = 0;
        for (let i = 0; i < 500 * 2; i += 25) {
            let temp = [];
            for (let j = 0; j < 500 * 4; j+= 25) {
                temp.push({
                    id,
                    //color: colors[Math.floor(Math.random() * 4)],
                    colorIndex: 0,
                    width: 25,
                    height: 25
                })
                id++;            
            }
            tempGrid.push(temp);
        }
        return tempGrid;
    });  
    
    const [intervals, setIntervals] = useState([]);
    

    const handleMouseOver = (e) => {        
        e.target.className = "blue-hover";
    };
    const handleMouseLeave = (e) => {
        e.target.className = "";
    }

    const handleResetClick = () => {        
        let tempGrid = resetGridColors(grid);        
        setGrid([...tempGrid]);
        intervals.forEach((interval) => {
            window.clearInterval(interval);
        });
        setIntervals([]);
    }

    const handleClick = (e) => {
        let row = parseInt(e.currentTarget.getAttribute('data-row'), 10);        
        let column = parseInt(e.currentTarget.getAttribute('data-column'), 10);
        let stepGrid, stepNumber = 0;
        if (wave) {            
            // this part is surprisingly important
            // when we first click, we immediately set the colors of surrounding cells to mimick movement and fluidity
            // we do not increment our stepnumber before starting our loop
            // this creates a cool effect
            stepGrid = getNextShapeForGrid(grid, shape, colors, row, column, stepNumber);            
            setGrid([...stepGrid]);                                    
            const interval = setInterval(() => {
                if (stepNumber === steps) {
                    window.clearInterval(interval);                    
                }                
                stepGrid = getNextShapeForGrid(grid, shape, colors, row, column, stepNumber);
                setGrid([...stepGrid]);                                
                stepNumber++;
            }, 100 * rate);            
            setIntervals(prevIntervals => [...prevIntervals, interval]);
        } else {
            const stepNumber = 0;
            let newGrid = getNextShapeForGrid(grid, shape, colors, row, column, stepNumber);
            setGrid([...newGrid]);
        }
        
    }    

    return (
        <div className="outer">
            <div>
                <button onClick={handleResetClick} id="reset">Reset Grid</button>
            </div>
            <div className="grid">
                {grid.map((row, index) => {
                    return (
                        <div key={index} className="row">
                            {row.map((cell, columnIndex) => {
                                let style = {
                                    width: cell.width,
                                    height: cell.height,
                                    background: cell.colorIndex < colors.length ? colors[cell.colorIndex] : colors[0],
                                    border: '1px solid black',                                    
                                    display: 'inline-block'
                                }
                                return (
                                    <div className="cell" data-row={index} data-column={columnIndex} key={cell.id} onClick={handleClick} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave} style={style}>&nbsp;</div>
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