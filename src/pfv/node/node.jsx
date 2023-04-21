import React from "react";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import LockIcon from '@mui/icons-material/Lock';
import './node.css';

const Node = (props) =>{
    const wall_weight = 1e6;
    var classes = "node tooltip ";
    const iterate = {
        isStart: props.isStart,
        isEnd: props.isEnd,
        isPath: props.isPath,
        isVisited: props.isVisited,
        Weight: props.Weight == wall_weight,
    }

    const classname = {
        isStart: "startnode ",
        isEnd: "endnode ",
        isPath: "path ",
        isVisited: "visited ",  
        Weight: "wall ",
    };

    for(let key in iterate){
        if(iterate[key] ){
            classes += classname[key];
            break;
        }
    }
    const generateText = ()=>{
        const tooltip = {
            isStart: "startnode\n",
            isEnd: "endnode\n",
        }
        var text = "index: "  + props.idx;
        text += (iterate.Weight ? "Wall" : " Weight:" + props.Weight) + "\n";
        for(let key in tooltip){
            if(iterate[key]){
                text += tooltip[key]; 
            }
        }
        return text;
    }
    const Icon =() =>{
        switch (true){
            case props.isStart:
                return(
                    <PlayArrowIcon fontSize="large"/>
                );
            case props.isEnd:
                return(
                    <HighlightOffIcon fontSize="large"/>
                );
            case props.Weight>1 && props.Weight<wall_weight:
                return(
                    <LockIcon fontSize="small"/>
                );
            default:
                return null;
        }
    } 
    return(
        <div className={classes}>
            {Icon()}
            <p className="tooltiptext">{generateText()}</p>
        </div>
    );
};

export default Node;