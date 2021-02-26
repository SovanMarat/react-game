import React, {useEffect, useState} from 'react';
// import data from './data.json';
import App from "./App";
import playSound from './utils/sounds';
import soundBackground  from '../audio/fon.mp3';

function StartPage(props) {

const [isStart, setIsStart] = useState(false);
const [difficulty, setDifficulty] = useState("easy");
const [level, setLevel] = useState("0");
const [isSubmit, setIsSubmit]= useState(false);
const [player, setPlayer] = useState({name:"guest", difficulty:"easy"});
const refName = React.createRef();

useEffect(()=>{
  if(isSubmit){
    localStorage.setItem(refName.current.value, JSON.stringify(player));
    setIsStart(!isStart);
  }
},[isSubmit]);

const backToMenu = ()=>{
 setIsSubmit(!isSubmit);
 setIsStart(!isStart);
 let currentAudio = document.querySelectorAll('.audio');
          if (currentAudio) {
        currentAudio.forEach(e => {
          e.pause();
        });
    }
}
const startGame = ()=>{
 setIsSubmit(!isSubmit);
 setPlayer({name:refName.current.value, difficulty:difficulty});
 playSound(soundBackground, 50);

}

  return (
    <div className="wrapper">  
    {isStart
?
<>
<div className="btnBoxRight"> 
<div className="btnStart" onClick={()=>backToMenu()}> Меню </div>
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
<input type="text" name="name" ref={refName} defaultValue="guest"/>
</label>
<label>
          Сложность:
          <select value={difficulty} onChange={(e)=>setDifficulty(e.target.value)}>
            <option  value="easy">easy</option>
            <option value="normal">normal</option>
            <option value="hard">hard</option>
          </select>
        </label>
        <label>
          Уровень:
          <select value={level} onChange={(e)=>setLevel(e.target.value)}>
            <option value="0">1</option>
            <option value="1">2</option>
            <option value="2">3</option>
          </select>
        </label>

        

    <div className="startBoxMenu"> 
<div className="btnStart" onClick={()=>startGame()}> Старт </div>
<div className="btnStart"> Справка </div>
</div>
</form>

<div className="btn" onClick={()=>handleFormSubmit()}> test </div>

    </div>

}
    </div>
  )
  
}

export default StartPage;