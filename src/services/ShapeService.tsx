export function getNextShapeForGrid(grid, shape, colors, row, column, stepNumber) {
    let temp = grid;
    let colorArray = [];

    let top = temp[row - 1 - stepNumber][column];
    let bottom = temp[row + 1 + stepNumber][column];
    let left = temp[row][column - 1 - stepNumber];
    let right = temp[row][column + 1 + stepNumber];
    
    let diagonalLeftTop = temp[row - 1 - stepNumber][column - 1 - stepNumber];
    let diagonalRightTop = temp[row - 1 - stepNumber][column + 1 + stepNumber];
    let diagonalLeftBottom = temp[row + 1 + stepNumber][column - 1 - stepNumber];
    let diagonalRightBottom= temp[row + 1 + stepNumber][column + 1 + stepNumber];

    if (shape === "cross") {
        colorArray.push(left);
        colorArray.push(right);
        colorArray.push(top);
        colorArray.push(bottom);        
    } else if (shape === "square") {
        colorArray.push(left);
        colorArray.push(right);
        colorArray.push(top);
        colorArray.push(bottom);
        colorArray.push(diagonalLeftBottom);
        colorArray.push(diagonalRightBottom);
        colorArray.push(diagonalLeftTop);
        colorArray.push(diagonalRightTop);
    } else if (shape === "triangle") {
        colorArray.push(top); 
        colorArray.push(diagonalLeftBottom);           
        colorArray.push(diagonalRightBottom);            
    }
    // update squares based off of their previous color
    for (let i = 0; i < colorArray.length; i++) {
        colorArray[i].color = colors.indexOf(colorArray[i].color) + 1 >= colors.length ? colors[0] : colors[colors.indexOf(colorArray[i].color) + 1];
    }
    return temp;
}

export function resetGridColors(grid) {
    let newGrid = [...grid];

    newGrid.forEach((row, r) => {
        row.forEach((col, c) => {
            newGrid[r][c].color = 'yellow';
        });
    });
    
    return newGrid;
}