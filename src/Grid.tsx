import { emitWarning } from 'process';
import React, { useEffect, useState } from 'react';
import { getNextShapeForGrid, resetGridColors } from './services/ShapeService';
import './Grid.css';

function Grid(props) {    

    const { shape, wave, cellSize, colors } = props;    
        
    const [grid, setGrid] = useState(() => {
        let tempGrid = [];
        let id = 0;
        for (let i = 0; i < 500 * 4; i += 25) {
            let temp = [];
            for (let j = 0; j < 500 * 4; j+= 25) {
                temp.push({
                    id,
                    //color: colors[Math.floor(Math.random() * 4)],
                    color: 'yellow',
                    width: 25,
                    height: 25
                })
                id++;            
            }
            tempGrid.push(temp);
        }
        return tempGrid;
    });  

    const handleMouseOver = (e) => {        
        e.target.className = "blue-hover";
    };
    const handleMouseLeave = (e) => {
        e.target.className = "";
    }

    const handleClick = (e) => {
        let row = parseInt(e.currentTarget.getAttribute('data-row'), 10);        
        let column = parseInt(e.currentTarget.getAttribute('data-column'), 10);
        if (wave) {
            let stepNumber = 0;
            let stepGrid = getNextShapeForGrid(grid, shape, colors, row, column, stepNumber);            
            setGrid([...stepGrid]);            
            const interval = setInterval(() => {
                //setGrid(resetGridColors(grid));
                stepGrid = getNextShapeForGrid(grid, shape, colors, row, column, stepNumber);
                setGrid([...stepGrid]);
                if (stepNumber === 20) {
                    window.clearInterval(interval);
                }
                stepNumber++;
            }, 500);               
        } else {
            const stepNumber = 0;
            let newGrid = getNextShapeForGrid(grid, shape, colors, row, column, stepNumber);
            setGrid([...newGrid]);
        }
        
    }    

    return (
        <div className="outer">
            our shape is {shape} and our wave is {wave.toString()}
            {grid.map((row, index) => {
                return (
                    <div key={index} className="row">
                        {row.map((cell, columnIndex) => {
                            let style = {
                                width: cell.width,
                                height: cell.height,
                                background: cell.color,
                                border: '1px solid black',
                                display: 'inline-block'                                                            
                            }
                            return (
                                <div data-row={index} data-column={columnIndex} key={cell.id} onClick={handleClick} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave} style={style}>&nbsp;</div>
                            );                            
                        })}
                    </div>
                );                
            })}
        </div>
    );
}

export default Grid;