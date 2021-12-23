import { emitWarning } from 'process';
import React, { useEffect, useState } from 'react';
import './Grid.css';

function Grid() {    
    let height = 50;
    let width = 50;
    let tempGrid = [];
    let id = 0;

    let colors = [
        'blue',
        'red',
        'green',
        'yellow'
    ];
    
    for (let i = 0; i < 500; i += 50) {
        let temp = [];
        for (let j = 0; j < 500; j+= 50) {
            temp.push({
                id,
                //color: colors[Math.floor(Math.random() * 4)],
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
          
        let temp = grid;

        let left = temp[row - 1][column];
        let right = temp[row + 1][column];
        let top = temp[row][column - 1];
        let bottom = temp[row][column + 1];

        let colorArray = [
            left,
            right,
            top,
            bottom
        ];

        // update squares based off of their previous color
        for (let i = 0; i < colorArray.length; i++) {
            colorArray[i].color = colors.indexOf(colorArray[i].color) + 1 >= colors.length ? colors[0] : colors[colors.indexOf(colorArray[i].color) + 1];
        }
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