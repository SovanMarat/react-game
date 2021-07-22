import React, {useEffect, useState} from 'react';
// import data from './data.json';
import App from "./App";
import Footer from "./Footer";
import playSound from './utils/sounds';
import soundBackground  from '../audio/fon.mp3';

function StartPage(props) {

const [isStart, setIsStart] = useState(false);
const [difficulty, setDifficulty] = useState("easy");
const [dataPlayer, setDataPlayer] = useState(localStorage.getItem("dataPlayer")
? JSON.parse(localStorage.getItem("dataPlayer")) 
: ({}));
const [namePlayer, setNamePlayer] = useState(localStorage.getItem("currentPlayer")
? (localStorage.getItem("currentPlayer")) 
: ("guest"));
const [level, setLevel] = useState("1");
const [isSubmit, setIsSubmit]= useState(false);
const [player, setPlayer] = useState(localStorage.getItem(namePlayer) 
? JSON.parse(localStorage.getItem(namePlayer)) 
: ({name:"guest", difficulty:"easy", easy:"1", normal:"1", hard: "1", easyInCorrect:"0", normalInCorrect:"0", hardInCorrect:"0", easyCorrect:"0", normalCorrect:"0", hardCorrect:"0", easyScore:"0", normalScore:"0", hardScore: "0"}));
const refName = React.createRef();
const refLevel2 = React.createRef();
const refLevel3 = React.createRef();

useEffect(()=>{
  if(isSubmit){
    let tempPlayer = dataPlayer;
    localStorage.setItem(refName.current.value, JSON.stringify(player));
    localStorage.setItem("currentPlayer", namePlayer);
    tempPlayer[namePlayer] = player;
    localStorage.setItem("dataPlayer", JSON.stringify(tempPlayer));
    setIsStart(!isStart);
  }
},[isSubmit]);

useEffect(()=>{
  SubmitData();
},[namePlayer, difficulty, isSubmit]);

const SubmitData = ()=>{
  if (localStorage.getItem(namePlayer)){
    refLevel2.current.removeAttribute('disabled');
    refLevel3.current.removeAttribute('disabled');
    setPlayer(JSON.parse(localStorage.getItem(namePlayer)));
if((player[difficulty])==="1"){
refLevel2.current.setAttribute('disabled','disabled');
refLevel3.current.setAttribute('disabled','disabled');
}
if((player[difficulty])==="2"){
  refLevel3.current.setAttribute('disabled','disabled');
  }

  }
}
const clickLevel=()=>{
SubmitData();
}

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
 if (localStorage.getItem(namePlayer)){
  setPlayer(JSON.parse(localStorage.getItem(namePlayer)));
} else {
setPlayer({name:refName.current.value, difficulty:difficulty, easy:"1", normal:"1", hard: "1", easyInCorrect:"0", normalInCorrect:"0", hardInCorrect:"0", easyCorrect:"0", normalCorrect:"0", hardCorrect:"0", easyScore:"0", normalScore:"0", hardScore: "0"});
}
 playSound(soundBackground, 0);

}

  return (
    <div className="wrapper">  
    {isStart
?
<>
<App backToMenu={backToMenu} difficulty={difficulty} currentLevel={level}/>
<Footer/>
</>
:
<>
    <div className="startPageBox"> 
    <form className="formStart"> 
  <label className="gameTitle"> Игра "Угадай слова"
  </label>

  <label>
    Имя:
<input type="text" name="name" ref={refName} onChange={(e)=>setNamePlayer(e.target.value)} defaultValue={namePlayer}/>
</label>
<label>
          Сложность:
          <select value={difficulty} onChange={(e)=>setDifficulty(e.target.value)} onClick={()=>clickLevel()}>
            <option  value="easy">easy</option>
            <option value="normal">normal</option>
            <option value="hard">hard</option>
          </select>
        </label>
        <label>
          Уровень: 
          <select value={level} onChange={(e)=>setLevel(e.target.value)} onClick={()=>clickLevel()}>
            <option  value="1">1</option>
            <option ref={refLevel2} disabled value="2">2</option>
            <option ref={refLevel3} disabled value="3">3</option>
          </select>
        </label>


    <div className="startBoxMenu"> 
<div className="btnStart" onClick={()=>startGame()}> Старт </div>
<div className="btnStart"> Справка </div>
</div>
</form>

<div className="btn" onClick={()=>handleFormSubmit()}> test </div>

    </div>
    <Footer/>
</>
}
    </div>
  )
}

export default StartPage;
