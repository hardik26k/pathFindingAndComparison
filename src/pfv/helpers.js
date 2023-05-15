function rand(){
    const wall_weight = 1e6;
    if(Math.floor(Math.random() * 10)%2){
        return 1;
    }
    else return wall_weight;
}

export function GenerateRandomWalls(grid){
    let new_grid = grid.slice();
    for(let node in new_grid){
        new_grid[node].Weight = rand();
    }
    return new_grid
}

export function GenerateGrid(rows, cols){
    function CreateNode(row, col){
        return {
            idx: cols * row + col,
            row: row,
            col: col,
            isVisited: false,
            isPath: false,
            Weight: 1,
        }
    }

    let grid = [];
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            grid.push(CreateNode(row, col));
        }
    }
    return grid;
};

export function RemoveWeights(grid, key){
    const wall_weight = 1e6;
    let new_grid = grid.slice();
    if(key == "Dijkstra"){
        return new_grid
    }
    for(let i = 0;i < grid.length ; i++){
        if(new_grid[i].Weight!=wall_weight) new_grid[i].Weight = 1;
    }
    return new_grid;
};




