import React, { useState } from "react";
import { Container,Grid,Button,Box,Snackbar,IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import './main.css';
import Node from './node/node';
import {GenerateGrid, RemoveWeights} from './helpers'

import { Dijkstra } from './algorithms/Dijkstra'
import { DFS } from './algorithms/DFS'
import { Astar } from './algorithms/Astar'
import { BFS } from './algorithms/BFS'

import { AlgoDescription, AlgoName, isWeighted } from './data'

var rows = 17, cols = Math.floor((document.body.clientWidth - 55)/40) -1;
let runLog = [];

const App = (()=>{
    const wall_weight = 1e6;
    const [grid, setGrid] = useState(GenerateGrid(rows, cols));
    const [start, setStart] = useState(true);
    const [position, setPosition] = useState([0, rows * cols - 1]);
    const [pressed, setPressed] = useState(false);
    const [weight, setWeight] = useState(wall_weight);
    const [Description, setDescription] = useState("");
    const [startGame , setStartGame] = useState(false);
    const [isAnimation , setIsAnimation] = useState(false);

    // Algo status state variables
    const [djisktraLength,setDjisktraLength] = useState('');
    const [djisktraRunTime,setDjisktraRunTime] = useState(0);
    const [dfsLength,setDFSLength] = useState('');
    const [dfsRunTime,setDFSRunTime] = useState(0);
    const [AstarLength,setAstarLength] = useState('');
    const [astarRunTime,setAstarRunTime] = useState(0);
    const [bfsLength,setBFSLength] = useState('');
    const [bfsRunTime,setBFSRunTime] = useState(0);

    // Snackbar state variables
    const [runningInfo,setRunningInfo] = useState('');
    const [open,setOpen] = useState(false);

    document.title = "Path Visualizer & Comparison";
    const AlgoCall = {
        Dijkstra: Dijkstra(rows, cols, position[0], position[1], grid),
        BFS: BFS(rows, cols, position[0], position[1], grid),
        DFS: DFS(rows, cols, position[0], position[1], grid),
        Astar: Astar(rows, cols, position[0], position[1], grid)
    };

    const handlechange = (idx) => {
        let array = position.slice();
        if (start) array[0] = idx;
        else array[1] = idx;
        setPosition(array);
    };

    const handlewalls = (idx) => {
        if (pressed && !isAnimation) {
            let newgrid = grid.slice();
            newgrid[idx].Weight = weight;
            setGrid(newgrid);
        }
    };

    async function Animate(Arr, i, key) {
        if (i === Arr.length) return true;
        let myPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                let newgrid = grid.slice();
                newgrid[Arr[i]][key] ^= true;
                setGrid(newgrid);
                resolve(true);
            }, 3/document.getElementById("time").value);
        });
        if (await myPromise) {
            return Animate(Arr, i + 1, key);
        }
    };

    async function AnimateVisitedOrder(Order, shortestpath) {
        setIsAnimation(true);
        let myPromise = new Promise((resolve, reject) => {
            resolve(Animate(Order, 0, "isVisited"));
        });
        if (await myPromise) {
            Animate(shortestpath, 0, "isPath");
        }
        setIsAnimation(false);
    };

    async function resetPathVisited(Arr,i,key1){
        if (i===Arr.length) return true;
        let tempArr = [];
        let myPromise = new Promise((resolve,reject) =>{
            let new_grid = grid.slice();
            console.log("Sliced Grid");
            console.log(new_grid);
            for( let node in new_grid){
               tempArr.push(node);
            }
            // console.log("New Grid");
            // console.log(new_grid);
            //setGrid(new_grid);
            resolve(true);
        });
        console.log("Temp Arr");
        console.log(tempArr);
        if ( await myPromise ) {
            return resetPathVisited(Arr,i+1);
        }
    };
    async function resetWithWalls(){
        let myPromise = new Promise((resolve,reject) => {
            // resetPathVisited(runLog[runLog.length - 1].visitOrder,0,"isVisited")
            resetPathVisited(grid,"isVisited");
            resolve(true);
        })
        if( await myPromise ){
            console.log("Grid reset with walls")
        }
    }
    const handleClose = (event,reason) => {
        if (reason === 'clickaway'){
            return;
        }
        setOpen(false);
    }

    function updateStat(key,len,finalTime){
        switch(key){
            case 'DFS':
                setOpen(true);
                setRunningInfo(key);
                setDFSLength(len);
                setDFSRunTime(finalTime);
                break;
            case 'Dijkstra':
                setOpen(true);
                setRunningInfo(key);
                setDjisktraLength(len);
                setDjisktraRunTime(finalTime);
                break;
            case 'BFS':
                setOpen(true);
                setRunningInfo(key);
                setBFSLength(len);
                setBFSRunTime(finalTime);
                break;
            case 'Astar':
                setOpen(true);
                setRunningInfo(key);
                setAstarLength(len);
                setAstarRunTime(finalTime);
                break;
            default:
                console.log("Not matching key found");
        }
    }    

    const RunAlgo = (key) => {
        if(!isWeighted[key]){
            let new_grid = RemoveWeights(grid);
            setGrid(new_grid);
        }
        const startTime = performance.now();
        console.log("start Time :"+ startTime)
        const [Order, shorteshtpath] = AlgoCall[key];
        console.log(Order);
        console.log(shorteshtpath);
        setDescription(AlgoDescription[key]);
        AnimateVisitedOrder(Order, shorteshtpath);
        const endTime = performance.now();
        const finalTime = endTime - startTime;
        updateStat(key,shorteshtpath.length,finalTime)
        runLog.push({
            Key:key,
            Length : shorteshtpath.length,
            TimeTaken:finalTime,
            shortestPath : shorteshtpath,
            visitOrder : Order
        })
    };

    return (
        <section >
            <Container maxWidth="x2" className="container">
                <Grid container justifyContent="center" >
                    <Grid item md={4} className="item">
                        <p>Select and double click on Grid to Change start and end positions</p>
                        <Box m={1}>
                            <Button
                                onClick={() => setStart(true)}
                                variant="contained"
                                color="primary"
                                size="small"
                                disabled = {isAnimation}
                            >Choose Start Point</Button>
                        </Box>
                        <Box m={1}>
                            <Button
                                onClick={() => setStart(false)}
                                variant="contained"
                                color="primary"
                                size="small"
                                disabled = {isAnimation}
                            >
                                Choose End Point</Button>
                        </Box>
                        <Box m={2}>
                            <Button
                                onClick={() => setGrid(GenerateGrid(rows,cols))}
                                variant="contained"
                                color="primary"
                                size="small"
                                disabled = {isAnimation}
                            >
                            Reset</Button>
                        </Box>
                        <Box m={2}>
                            <Button
                                onClick={() => setGrid(resetWithWalls())}
                                variant="contained"
                                color="primary"
                                size="small"
                                disabled = {isAnimation}
                            >
                            Reset Path</Button>
                        </Box>
                    </Grid>
                    <Grid item md={4} className="item">
                        <p>Click and drag to create walls and Weights</p>
                        <Box m={1}>
                            <Button
                                onClick={() => setWeight(wall_weight)}
                                variant="contained"
                                color="primary"
                                size="small"
                                disabled = {isAnimation}
                            >
                                Set Walls</Button>
                        </Box>
                        <Grid container padding={1}>
                            <Grid item xs={6}>
                                <p>Weight of nodes to assign</p>
                                <input
                                    type="range"
                                    max="20"
                                    min="2"
                                    id="weight"
                                    onChange={() => setWeight(document.getElementById("weight").value)}
                                    disabled = {isAnimation}
                                ></input>
                            </Grid>
                            <Grid item xs={6}>
                                <p>Speed of Animation</p>
                                <input
                                    type="range"
                                    max="5000"
                                    min="50"
                                    id="time"
                                ></input>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item md={3} className="item">
                        <p>Choose one of the following Algorithms</p>
                        <Grid container>
                            {Object.keys(AlgoName).map(e => (
                                <Grid item xs={6} key={e}>
                                    <Button
                                        onClick={() => RunAlgo(e)}
                                        color="primary"
                                        size="small"
                                        disabled = {isAnimation}
                                    >
                                    {e}</Button>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
            <div style={{ width: (cols) * 42 }} className="grid">
                {grid.map(e => (
                    <div
                        onDoubleClick={() => handlechange(e.idx)}
                        onMouseDown={() => setPressed(true)}
                        onMouseUp={() => setPressed(false)}
                        onMouseEnter={() => handlewalls(e.idx)}
                    >
                        <Node
                            key={e}
                            idx={e.idx}
                            isVisited={e.isVisited}
                            isPath={e.isPath}
                            Weight={e.Weight}
                            isStart={position[0] === e.idx && !startGame}
                            isEnd={position[1] === e.idx && !startGame}
                            pressed={pressed}
                        />
                    </div>
                ))}
                <p>Description: {Description}</p>
            </div>
            <div className="containerStat">
                <div className="statItem">
                    <h3 id="Astar" style={{textDecoration:'underline'}} >Astar</h3>
                    <p>Length : {AstarLength}</p>
                    <p>Time : {astarRunTime}ms</p>
                </div>
                <div className="statItem">
                    <h3 id="Dijkstra" style={{textDecoration:'underline'}}>Djisktra</h3>
                    <p>Length : {djisktraLength}</p>
                    <p>Time : {djisktraRunTime}ms</p>
                </div>
                <div className="statItem">
                    <h3 id="DFS" style={{textDecoration:'underline'}} >DFS</h3>
                    <p>Length : {dfsLength}</p>
                    <p>Time : {dfsRunTime}ms</p>
                </div>
                <div className="statItem">
                    <h3 id="BFS" style={{textDecoration:'underline'}}>BFS</h3>
                    <p>Length : {bfsLength}</p>
                    <p>Time : {bfsRunTime}ms</p>
                </div>
            </div>
            <div>
              <Snackbar
                anchorOrigin={{
                    horizontal: "right",
                    vertical: "bottom",
                }}
                open={open}
                autoHideDuration={15000}
                onClose={handleClose}
                message={runningInfo}
                action={
                  <React.Fragment>
                    <IconButton
                      size="small"
                      aria-label="close"
                      color="inherit"
                      onClick={handleClose}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </React.Fragment>
                }

              />
            </div>
        </section>
    );
});
export default App;
