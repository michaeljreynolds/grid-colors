import { emitWarning } from 'process';
import React, { useEffect, useState } from 'react';
import './Grid.css';

function Grid() {
    let random = 'yellow';
    let height = 50;
    let width = 50;
    let tempGrid = [];
    let id = 0;

    let colors = {
        1: 'yellow',
        2: 'green',
        3: 'blue',
        4: 'red'
    };

    for (let i = 0; i < 500; i += 50) {
        let temp = [];
        for (let j = 0; j < 500; j+= 50) {
            temp.push({
                id,
                color: 'yellow',
                width: 50,
                height: 50
            })
            id++;
        }
        tempGrid.push(temp);
    }

    const [grid, setGrid] = useState(tempGrid);          

    const handleMouseOver = (e) => {        
        e.target.className = "blue-hover";
    };
    const handleMouseLeave = (e) => {
        e.target.className = "";
    }

    const handleClick = (e) => {
        let row = parseInt(e.currentTarget.getAttribute('data-row'), 10);        
        let column = parseInt(e.currentTarget.getAttribute('data-column'), 10);
        // highlight the cell next to this
        grid[row][column -1].color = 'blue';
        let temp = grid;
        temp[row][column + 1].color = 'blue';
        temp[row][column - 1].color = 'blue';        
        temp[row + 1][column].color = 'blue';
        temp[row - 1][column].color = 'blue';
        setGrid([...temp]);
    }


    return (
        <div className="outer">
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
                                <div data-row={index} data-column={columnIndex} key={cell.id} onClick={handleClick} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave} style={style}>cell</div>
                            );
                            
                        })}
                    </div>
                );                
            })}
        </div>
    );
}

export default Grid;