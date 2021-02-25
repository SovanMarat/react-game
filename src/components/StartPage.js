import React, {useEffect, useState} from 'react';
// import data from './data.json';
import App from "./App";

function StartPage(props) {

const [isStart, setIsStart] = useState(false);
const [level, setLevel] = useState("easy");
    // useEffect(()=>{
    //     props.setChanged(data.level1);
    // },[])
    const testFun = ()=>{
console.log(level);
    };
  return (
    <div className="wrapper">  
    {isStart
?
<>
<div className="btnBoxRight"> 
<div className="btnStart" onClick={()=>setIsStart(!isStart)}> Меню </div>
<div className="btnStart"> Справка </div>
</div>
<App/>
</>
:
    <div className="startPageBox"> 
    <form className="formStart"> 
  <label className="gameTitle"> Игра "Угадай слова"
  </label>

  <label>
    Имя:
<input type="text" name="name" />
</label>
<label>
          Уровень:
          <select value={level} onChange={(e)=>setLevel(e.target.value)}>
            <option  value="easy">easy</option>
            <option value="normal">normal</option>
            <option value="hard">hard</option>
          </select>
        </label>

    <div className="startBoxMenu"> 
<div className="btnStart" onClick={()=>setIsStart(!isStart)}> Старт </div>
<div className="btnStart"> Справка </div>
</div>
</form>

<div className="btn" onClick={()=>testFun()}> test </div>

    </div>

}
    </div>
  )
  
}

export default StartPage;