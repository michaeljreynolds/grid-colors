import { emitWarning } from 'process';
import React, { useEffect, useState } from 'react';
import './Grid.css';

function Grid(props) {    

    const { shape, cellSize, colors } = props;
    
    let tempGrid = [];
    let id = 0;    
    
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
        let newGrid = getPropagatedShapeGrid(row, column, shape);
        setGrid([...newGrid]);
    }

    const getPropagatedShapeGrid = (row, column, shape) => {
        let temp = grid;
        let colorArray = [];

        if (shape === "cross") {

            let top = temp[row - 1][column];
            let bottom = temp[row + 1][column];
            let left = temp[row][column - 1];
            let right = temp[row][column + 1];
    
            colorArray.push(left);
            colorArray.push(right);
            colorArray.push(top);
            colorArray.push(bottom);
            
        } else if (shape === "square") {
            let top = temp[row - 1][column];
            let bottom = temp[row + 1][column];
            let left = temp[row][column - 1];
            let right = temp[row][column + 1];

            let diagonalLeftTop = temp[row - 1][column - 1];
            let diagonalRightTop = temp[row - 1][column + 1];
            let diagonalLeftBottom = temp[row + 1][column - 1];
            let diagonalRightBottom= temp[row + 1][column + 1];

            colorArray.push(left);
            colorArray.push(right);
            colorArray.push(top);
            colorArray.push(bottom);

            colorArray.push(diagonalLeftBottom);
            colorArray.push(diagonalRightBottom);
            colorArray.push(diagonalLeftTop);
            colorArray.push(diagonalRightTop);
        } else if (shape === "triangle") {
            let top = temp[row - 1][column];            
            let diagonalLeftBottom = temp[row + 1][column - 1];
            let diagonalRightBottom= temp[row + 1][column + 1];
            
            colorArray.push(top); 
            colorArray.push(diagonalLeftBottom);           
            colorArray.push(diagonalRightBottom);            
        }



        // update squares based off of their previous color
        for (let i = 0; i < colorArray.length; i++) {
            colorArray[i].color = colors.indexOf(colorArray[i].color) + 1 >= colors.length ? colors[0] : colors[colors.indexOf(colorArray[i].color) + 1];
        }

        return temp;
    };


    return (
        <div className="outer">
            our shape is {shape}
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