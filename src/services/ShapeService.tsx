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
        case "spiral":
            directions = stepNumber % 4 === 0 ? [top, diagonalLeftBottom, diagonalRightBottom] :
                stepNumber % 4 === 1 ? [right, diagonalLeftBottom, diagonalLeftTop] : 
                stepNumber % 4 === 2 ? [left, diagonalRightBottom, diagonalRightTop] : [bottom, diagonalLeftTop, diagonalRightTop];
            break;
        case "rotate":
            directions = stepNumber % 2 === 0 ? [left, right, top, bottom] :
                [diagonalLeftBottom, diagonalLeftTop, diagonalRightBottom, diagonalRightTop];
            break;
        case "diagonal":
            directions = stepNumber % 2 === 0 ? [diagonalLeftBottom, diagonalRightTop] :
                [diagonalLeftTop, diagonalRightBottom];
            break;
        case "full":
            directions = getFullDirections(temp, row, column, [diagonalLeftTop, diagonalRightTop, diagonalRightBottom, diagonalLeftBottom]);
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

    colorArray.forEach((cell) => {        
        cell.colorIndex = cell.colorIndex + 1 >= colors.length ? 0 : cell.colorIndex + 1;
    });    

    return temp;
}

export function getShapes() {
    return ["cross", "square", "triangle", "spiral", "rotate", "diagonal", "full"];
}


// helper functions

const getFullDirections = (temp, r, c, points) => {
    let directions = [];
    let row, col;    

    if (points[0] !== undefined) {
        row = points[0].row;
        for (let i = points[0].column; i <= points[1].column; i++) {
            directions.push(temp[row][i]);        
        }
    }
    
    // for (let i = points[0].column + 1; i < points[1].column; i++) { // this pattern leaves out the diagonal which looks cool
    //     directions.push(temp[row][i]);
    // }
    
    
    if (points[1] !== undefined && points[1].column !== undefined) {
        col = points[1].column;
        for (let i = points[1].row + 1; i <= points[2].row; i++) {
            directions.push(temp[i][col]);
        }
    }

    
    if (points[2] !== undefined && points[2].row !== undefined) {
        row = points[2].row;
        for (let i = points[2].column - 1; i >= points[3].column; i--) {
            directions.push(temp[row][i]);
        }
    }
    

    if (points[3] !== undefined && points[3].column !== undefined) {
        col = points[3].column;
        for (let i = points[3].row - 1; i > points[1].row; i--) {
            directions.push(temp[i][col]);
        }
    }

    

 

    return directions;
};