import { getNextShapeForGrid } from './ShapeService';

export function resetGridColors(grid) {
    let newGrid = [...grid];
    
    newGrid.forEach((row, r) => {
        row.forEach((col, c) => {
            newGrid[r][c].colorIndex = 0;
        });
    });
    
    return newGrid;
}

