export function resetGridColors(grid) {
    let newGrid = [...grid];
    
    newGrid.forEach((row, r) => {
        row.forEach((col, c) => {
            newGrid[r][c].colorIndex = 0;
        });
    });
    
    return newGrid;
}

export function setupGrid(row, col, rowIncrement, colIncrement) {
    let grid = [];
    let id = 0;
    let rowIndex = 0;
    let colIndex = 0;
    for (let i = 0; i < row; i += rowIncrement) {
        let temp = [];
        colIndex = 0;
        for (let j = 0; j < col; j+= colIncrement) {
            temp.push({
                id,
                row: rowIndex,
                column: colIndex,                
                colorIndex: 0,                    
                width: colIncrement,
                height: rowIncrement
            })
            id++;            
            colIndex++;
        }
        grid.push(temp);
        rowIndex++;
    }
    return grid;
}
