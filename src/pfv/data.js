
export const AlgoDescription = {
    Djikstra:"Djisktra is a greedy Algorithm for finding the shortest path. It works in O(V+ElogE) time complexity and is an weighted path finding algorithm",
    BFS:"BFS stands for breadth for search. The algorithm moves level by level. It works in O(V+E) time and is an Un-Weighted path finding algorithm",
    DFS:"",
    GameOfLife:"Rules:\n 1.) Any block with less than 2 neighbor dies.\n2.) Any block with more than 2 neighbors has 50% chance of dying.",
    Astar: "Astar is a heiuristic algorithm. Here we are using unweighted Astar using manhattan distance. It looks similar to two unweighted BFS from startnode and endnode"
};

export const AlgoName = {
    Dijkstra: "Dijkstra",
    BFS: "BFS",
    DFS: "DFS",
    Astar: "Astar"
};

export const isWeighted = {
    Djikstra: true,
    BFS: false,
    DFS: false,
    Astar: "false"
};