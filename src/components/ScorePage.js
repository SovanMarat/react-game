import React, {useEffect, useState} from 'react';
import setScore from './utils/score';

function ScorePage(props) {

const [statisticsView, setStatisticsView] = useState(null);
const [statisticsViewLevel, setStatisticsViewLevel] = useState(true);
const [statisticsLevel, setStatisticsLevel] = useState("easyScore");

const scorePlayers = (e)=>{
let tempStatistics = setScore(e);
setStatisticsView(tempStatistics);
setStatisticsLevel(`${e}Score`);
}
useEffect(()=>{
scorePlayers("easy")

}
,[]);


useEffect(()=>{
setStatisticsViewLevel(true);
}
,[statisticsView]);

  return (
<>
<div className="boxScoreBtn">
<div className="btnStart" onClick={()=>(scorePlayers("easy"))}> Easy </div>
<div className="btnStart" onClick={()=>(scorePlayers("normal"))}> Normal </div>
<div className="btnStart" onClick={()=>(scorePlayers("hard"))}> Hard </div>
</div>
{statisticsViewLevel
?
<>
<div className="boxScore">
<div className="scoreTable scoreTitle">{statisticsLevel}</div>
{statisticsView?
statisticsView.map((item, index) => 
<div className="scoreTable" key={index}>{`${index+1})   ${item.name} : ${item[statisticsLevel]}`}</div>
              )
:<></>}
</div>
</>
:
<></>
}
</>
)

}
export default ScorePage;