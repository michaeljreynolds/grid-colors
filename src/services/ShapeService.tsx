import { COLORS } from './ColorService';

export function getNextShapeForGrid(grid, shape, colors, row, column, stepNumber) {
    let temp = grid;
    let colorArray = [];

    let top, bottom, left, right;
    let diagonalLeftTop, diagonalRightTop, diagonalLeftBottom, diagonalRightBottom;

    if (column - 1 - stepNumber >= 0) {
        left = temp[row][column - 1 - stepNumber];
    }

    if (column + 1 + stepNumber < grid[row].length) {
        right = temp[row][column + 1 + stepNumber];
    }

    if (row - 1 - stepNumber >= 0) {
        top = temp[row - 1 - stepNumber][column];
    }

    if (row + 1 + stepNumber < grid.length) {
        bottom = temp[row + 1 + stepNumber][column];
    }    

    if (row - 1 - stepNumber >= 0 && column - 1 - stepNumber >= 0) {
        diagonalLeftTop = temp[row - 1 - stepNumber][column - 1 - stepNumber];
    }

    if (row - 1 - stepNumber >= 0 && column + 1 + stepNumber < grid[row].length) {
        diagonalRightTop = temp[row - 1 - stepNumber][column + 1 + stepNumber];
    }

    if (row + 1 + stepNumber < grid.length && column - 1 - stepNumber >= 0) {
        diagonalLeftBottom = temp[row + 1 + stepNumber][column - 1 - stepNumber];
    }

    if (row + 1 + stepNumber < grid.length && column + 1 + stepNumber < grid[row].length) {
        diagonalRightBottom= temp[row + 1 + stepNumber][column + 1 + stepNumber];
    }

    let directions = [];
    switch (shape) {
        case "cross":
            directions = [left, right, top, bottom];
            break;
        case "square":
            directions = [left, right, top, bottom, diagonalLeftBottom, diagonalLeftTop, diagonalRightBottom, diagonalRightTop];            
            break;
        case "triangle":
            directions = [top, diagonalLeftBottom, diagonalRightBottom];         
            break;
        default:
            directions = [left, right, top, bottom];
            break;
    
    }

    directions.forEach((dir) => {
        if (dir) {
            colorArray.push(dir);
        }
    });

    // todo
    // clean this up to remove the indexOf call
    // can store the index inside the cell instead and do a check against bounds that way
    // colorArray.forEach((cell) => {
    //     cell.color = colors.indexOf(cell.color) + 1 >= colors.length ? colors[0] : colors[colors.indexOf(cell.color) + 1];
    // });    
    colorArray.forEach((cell) => {        
        cell.colorIndex = cell.colorIndex + 1 >= colors.length ? 0 : cell.colorIndex + 1;
    });    

    return temp;
}

export function resetGridColors(grid) {
    let newGrid = [...grid];

    for (let row = 0; row < newGrid.length; row++) {
        for (let col = 0; col < newGrid[row].length; col++) {
            newGrid[row][col].colorIndex = 0;
        }
    }

    // newGrid.forEach((row, r) => {
    //     row.forEach((col, c) => {
    //         newGrid[r][c].colorIndex = 0;
    //     });
    // });
    
    return newGrid;
}