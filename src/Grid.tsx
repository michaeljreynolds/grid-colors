import { emitWarning } from 'process';
import React, { useEffect, useState } from 'react';
import { getNextShapeForGrid, resetGridColors } from './services/ShapeService';
import './Grid.css';

function Grid(props) {    

    const { shape, wave, cellSize, colors } = props;    

    const [grid, setGrid] = useState(() => {
        let tempGrid = [];
        let id = 0;
        for (let i = 0; i < 500 * 2; i += 25) {
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

    const [resetting, setResetting] = useState(false);
    

    const handleMouseOver = (e) => {        
        e.target.className = "blue-hover";
    };
    const handleMouseLeave = (e) => {
        e.target.className = "";
    }

    const handleResetClick = () => {
        let tempGrid = resetGridColors(grid);
        setResetting(true);
        setGrid([...tempGrid]);
    }

    const handleClick = (e) => {
        let row = parseInt(e.currentTarget.getAttribute('data-row'), 10);        
        let column = parseInt(e.currentTarget.getAttribute('data-column'), 10);
        setResetting(false);
        if (wave) {
            let stepNumber = 0;
            let stepGrid = getNextShapeForGrid(grid, shape, colors, row, column, stepNumber);            
            setGrid([...stepGrid]);            
            const interval = setInterval(() => {
                if (stepNumber === 20 || resetting) {
                    window.clearInterval(interval);
                }                
                stepGrid = getNextShapeForGrid(grid, shape, colors, row, column, stepNumber);
                setGrid([...stepGrid]);                
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
                                    background: cell.color,
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