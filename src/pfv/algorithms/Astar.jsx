import {row , col , _node, isNeighbor, Path} from "./helpers";

export function Astar(rows ,cols ,startnode ,endnode ,grid){
    const INF = 1e6,size_of_grid = grid.length ,wall_weight = 1e6;
    const iterate = [[1,0],[0,1],[-1,0],[0,-1]];

    // calculate all paths
    var distance = new Array(size_of_grid).fill(INF);
    var visited = new Array(size_of_grid).fill(false);
    var x = new Array(size_of_grid).fill(false);
    var par = new Array(size_of_grid).fill(-1);
    distance[startnode] = 0;
    distance[endnode] = 0;
    x[startnode] = 1;
    x[endnode] = 2; 
    var queue = [startnode, endnode];
    var Order = [];

    while(queue.length){
        let u = queue.shift();
        // if(visited[u] > 0) continue;
        let R = row(u , cols) , C = col(u , cols);
        visited[u] = true;
        Order.push(u);

        function PathforAstar(source, sink){
            var y = source;
            var shortestpath = [];
            while(y !== sink){
                shortestpath.push(y);
                y = par[y];
            }
            shortestpath.reverse();
            return shortestpath;
        }

        for(var i in iterate){
            let r = R + iterate[i][0] , c = C + iterate[i][1];
            if(!isNeighbor(r, c ,rows ,cols)) continue;
            let next = _node(r,c,cols);
            if(grid[next].Weight === wall_weight) continue;
            if(x[next] + x[u] === 3){
                return [Order,  
                    (visited[u] === 1) 
                    ? PathforAstar(u, startnode).reverse().concat(PathforAstar(next, endnode)) 
                    : PathforAstar(next, startnode).reverse().concat(PathforAstar(u, endnode))];
            }

            visited[next] = visited[u];

            if(distance[u] + Number(grid[next].Weight) < distance[next]){
                distance[next] = distance[u] + Number(grid[next].Weight);
                par[next] = u;
                queue.push(next);
            }
        }
    }
    return[Order,[]];
}