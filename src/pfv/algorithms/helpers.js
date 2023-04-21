export function row(node , cols){
    return Math.floor(node/cols);
}
export function col(node , cols){
    return node%cols;
}
export function _node(row , col , cols){
    return row*cols + col; 
}
export function isNeighbor(row , col , rows , cols){
    return (row>=0 && row<rows) && (col>=0 && col<cols);
}
export function Path(par, endnode){
    var u = endnode;
    var shortestpath = [];
    while(u != -1){
        shortestpath.push(u);
        u = par[u];
    }
    shortestpath.reverse();
    return shortestpath;
}
