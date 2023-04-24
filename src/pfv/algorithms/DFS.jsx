// import { _node, isNeighbor} from "./helpers";

export function _node(row , col , cols){
    return row*cols + col; 
}
export function isNeighbor(row , col , rows , cols){
    return (row>=0 && row<rows) && (col>=0 && col<cols);
}


export function DFS(rows ,cols ,startnode ,endnode ,grid){
    const INF = 1e6 , size_of_grid = grid.length , wall_weight = 1e6;
    const iterate = [[1,0],[0,1],[-1,0],[0,-1]];

    // calculate all paths
    var visited = new Array(size_of_grid).fill(false);
    var Order = [];
    let unVisitedNode = [];
    
    if( !startnode || !endnode || startnode === finishnode){
        return;
    }

    unVisitedNode.push(startnode);

    function dfs(node){
        Order.push(node);

        if(node === endnode){
            return [Order,[]];
        }

        visited[node] = true;
        let R = grid[node].row , C = grid[node].col;
        for(let i in iterate){
            let r = R - iterate[i][0] , c = C - iterate[i][1];
            if(!isNeighbor(r , c, rows, cols)) continue;
            let next = _node(r, c, cols);
            if(grid[next].Weight == wall_weight || visited[next]) continue;
            
            dfs(next);
        }
        Order.push(node);
    }   

    dfs(startnode);
    return [Order,[]];
}