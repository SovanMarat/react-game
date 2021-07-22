import React, {useEffect, useState} from 'react';
import data from './data.json';
function Level(props) {

let level=`${props.difficulty}${props.currentLevel}`;

useEffect(()=>{
props.setChanged(data[level]);
console.log(data[level]);
},[]);

const repeatLevel=(data)=>{
 const dataRepeat= {
"easy1": ["дуб", "бур", "ухо", "хор", "ода"],
"easy2": ["акт", "кот", "ток", "кит", "лот"],
"easy3": ["зуб", "оса", "раб", "бор", "бар","бас", "сор"],
"normal1" : ["грим", "мера", "море", "омар", "гора"],
"hard1" : ["табло", "табор", "балет", "лазер", "зебра"],
"hard2" : ["менор", "метро", "тиран", "роман", "тенор", "номер"]
    }
data.winnerLine = dataRepeat[level];
let clearArr=[];
clearArr= data.field.map(e=>{
if(e==="none") {
return e;  
} else {
  return "";
}
 });

data.field = clearArr;
props.setChanged(data);
}

  return (<>
    {(props.repeat) 
              ? <>
              <div className="boxRepeat">
              <div className="titleRepeat"></div>
              <div className="btnRepeat" onClick={()=>repeatLevel(data[level])}>Заново</div>
              </div>
              </>
: <></>
        
            }
  </>
  )

}
export default Level;