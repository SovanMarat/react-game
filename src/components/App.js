import React from "react";

import '../scss/style.scss';
import Level from './Level';
import ScorePage from './ScorePage';

import playSound from './utils/sounds';
import soundCorrect from '../audio/true.wav';
import soundInCorrect from '../audio/false.wav';
import styleExport from '../JSON/style.JSON';
import data from './data.json';
// const divStyle = {
//   color: 'blue',
//   width:'50rem'
// };

class App extends React.Component {
  constructor(props) {
    super(props);
    this.setChanged = this.setChanged.bind(this);
    this.state = {
      field: [],
      wordsGame: [],
      winnerField: [],
      winnerLine: [],
      squares: [],
      codGame: {},
      styleApp: "light",
      volume: 0,
      stateGame: false,
      fullScreen: false,
      currentPlayer: JSON.parse(localStorage.getItem(localStorage.getItem("currentPlayer"))),
      countCorrect: 0,
      countIncorrect: 0,
      statistics: false,
      statisticsView: "easy",
      dataScoreState: null,
    }
    this.difficulty = this.props.difficulty;
    this.currentLevel=this.props.currentLevel;
    this.fieldCurrent = [];
    this.refWordField = React.createRef();
    this.refBtnNext = React.createRef();
    this.refBtnAutoFinish = React.createRef();
    this.refBtnOk = React.createRef();
    this.refAudio = React.createRef();
    this.dataLevel =`${this.difficulty}${this.currentLevel}`;
    this.nameScore = `${this.difficulty}Score`;
    this.nameCorrect = `${this.difficulty}Correct`;
    this.nameInCorrect = `${this.difficulty}InCorrect`;
    this.correctScore = (Number(this.state.currentPlayer[this.nameCorrect]));
    this.incCorrectScore = (Number(this.state.currentPlayer[this.nameInCorrect]));
    if(this.difficulty==="easy"){
    this.divStyle = {width:`24rem`};
    this.titleStyle = {height:"8rem"};
    }
    if(this.difficulty==="normal" || this.difficulty==="hard"){
    this.divStyle = {width:`28rem`}
    }
    
  }
componentDidMount() {

}

componentDidMount() {
  this.setState({countCorrect:this.correctScore, countIncorrect:this.incCorrectScore});
  this.currentPlayer = JSON.parse(localStorage.getItem(localStorage.getItem("currentPlayer")));

}

  componentDidUpdate() {
  

    this.letters = document.querySelectorAll('.lettersGame');
    
    if (this.state.field.every(this.isWinner)){
      if(this.refBtnOk.current){
        this.refBtnAutoFinish.current.style.pointerEvents = "none";
        this.refBtnNext.current.style.pointerEvents = "none";
        this.refBtnOk.current.style.pointerEvents = "none";
        this.refBtnOk.current.style.background = "gray";
        this.refBtnNext.current.style.background = "gray";
        this.refBtnAutoFinish.current.style.background = "gray";
      }
    
    } else {
      this.refBtnAutoFinish.current.style.pointerEvents = "auto";
      this.refBtnNext.current.style.pointerEvents = "auto";
      this.refBtnOk.current.style.pointerEvents = "auto";
      this.refBtnOk.current.style.background = styleExport[this.state.styleApp].btnBackground;
      this.refBtnNext.current.style.background = styleExport[this.state.styleApp].btnBackground;
      this.refBtnAutoFinish.current.style.background = styleExport[this.state.styleApp].btnBackground;
    }
  }
  componentWillUnmount() {

    this.setState({dataScoreState: this.dataScore});
    console.log(this.state.dataScoreState);
  }

winnerAnimation(){
  let arrFieldCell = document.querySelectorAll('.fieldCell');
  console.log(arrFieldCell);

  arrFieldCell.forEach(e=>{
    e.style.position = "fixed";
    e.style.top = `40%`;
    e.style.left = `45%`;

    e.classList.add('rotateFinish');
    setInterval(() => {
    e.style.top = `${Math.random()*50}%`;
    e.style.left = `${Math.random()*50}%`;
    }, 1000);
   

  })
  setTimeout(()=>{
    arrFieldCell.forEach(e=>{
    e.style.position = ""});
  }, 5000);
}

changedLevel(difficulty, currentLevel, isChanged){
this.currentLevel = currentLevel;
if(difficulty==="easy" && isChanged){
this.difficulty = "normal";
this.currentLevel = "1";
}
if(difficulty==="normal" && isChanged){
this.difficulty = "hard";
this.currentLevel = "1";
}
this.setState({stateGame:false});
}

  setChanged(level) {
  console.log(level);
  this.setState({ field: level.field, wordsGame: level.wordsGame, winnerField: level.winnerField, winnerLine: level.winnerLine, codGame: level.codGame });
  }

  clear(){
    this.setState({ squares: [] });
    this.letters.forEach(e => {
      e.style.pointerEvents = 'auto';
      e.style.background = 'rgb(1, 138, 138)';
    })
  }

  isWinner = (element) => {
    return Boolean(element);
  }
  jobFullScreen = () => {
  if (document.fullscreenElement){
  document.exitFullscreen();
} else {
  document.documentElement.requestFullscreen();
}
this.setState({fullScreen:!this.state.fullScreen});
  }

  clickVolumeNull = () => {
    let currentAudio = document.querySelectorAll('.audio');
      this.setState({ volume: 0 });
      if (currentAudio) {
        currentAudio.forEach(e => {
          e.volume = 0;
        });
      }
    this.refAudio.current.style.width = `0%`;
  }

  clickMinus = () => {
    let currentAudio = document.querySelectorAll('.audio');
    
    if (this.state.volume > 0) {
      this.setState({ volume: this.state.volume -= Math.ceil(this.state.volume/4) });
      if (currentAudio) {
        currentAudio.forEach(e => {
          e.volume = this.state.volume / 5000;
        });
      }
    }
    this.refAudio.current.style.width = `${this.state.volume}%`;
  }

  clickPlus = () => {
    this.fieldCurrent = [];

    let currentAudio = document.querySelectorAll('.audio');
    this.state.volume===0 ? this.state.volume=4 : this.state.volume=this.state.volume;
    if (this.state.volume < 100) {
      let tempVolume = this.state.volume += Math.ceil(this.state.volume/4);
      tempVolume>100 ? tempVolume=100: tempVolume=tempVolume;
      this.setState({ volume:  tempVolume});
      if (currentAudio) {
        currentAudio.forEach(e => {
          e.volume = this.state.volume / 5000;
        });
      }
    }
    this.refAudio.current.style.width = `${this.state.volume}%`;
  }

  clickNext = (countIncorrect) => {

    this.setState({styleApp:"dark"});
    countIncorrect++;
    this.currentPlayer[this.nameInCorrect]=countIncorrect;
    localStorage.setItem(this.currentPlayer.name, JSON.stringify(this.currentPlayer));
    this.setState({ countIncorrect: countIncorrect });
    let indexShow = this.state.winnerLine.findIndex(item => item !== "xxx");
    if (indexShow !== -1) {
      this.state.codGame[indexShow].forEach(e => {
        this.fieldCurrent = this.state.field;
        this.fieldCurrent[e] = this.state.winnerField[e];
      })
      this.setState({ field: this.fieldCurrent });
      this.state.winnerLine[indexShow] = "xxx";
    }
  
  }
 

    clickAutoFinish = (countIncorrect) => {
      while (!this.state.field.every(this.isWinner)) {
        this.clickNext(countIncorrect);
        countIncorrect++;
      }
    }

  clickOk = () => {
    this.winnerAnimation();
   // let currentPlayer = JSON.parse(localStorage.getItem(localStorage.getItem("currentPlayer")));
    let countCorrect = this.state.countCorrect;
    let countIncorrect = this.state.countIncorrect;
    let line = this.state.winnerLine;
    let str = this.state.squares.join('');
    line.forEach((e, index) => {
      if (str === e) {
        playSound(soundCorrect, this.state.volume);
        countCorrect++;
        this.correctScore = (Number(this.state.currentPlayer[this.nameCorrect]));
        this.currentPlayer[this.nameCorrect]=countCorrect;
        localStorage.setItem(this.currentPlayer.name, JSON.stringify(this.currentPlayer));
        this.setState({ countCorrect: countCorrect });
        this.state.codGame[index].forEach(e => {
          this.fieldCurrent = this.state.field;
          this.fieldCurrent[e] = this.state.winnerField[e];
        })
        this.setState({ field: this.fieldCurrent });
        if (this.state.field.every(this.isWinner)) {
          this.winnerAnimation();
          setTimeout(()=> this.setState({ stateGame: true }), 5000);
          //this.setState({ stateGame: true });
          let n = Number(this.currentPlayer[this.difficulty]);
          if(n===Number(this.currentLevel) && n!==3){
            this.currentPlayer[this.difficulty]=String(n+1);
            localStorage.setItem(this.currentPlayer.name, JSON.stringify(this.currentPlayer));
          }
        }
        this.state.winnerLine[index] = "xxx";
      }
      // this.setState({ squares: [] });
      // this.letters.forEach(e => {
      //   e.style.pointerEvents = 'auto';
      //   e.style.background = 'rgb(1, 138, 138)';
      // })
      this.clear();

    })
    if (countCorrect === this.state.countCorrect) {
      playSound(soundInCorrect, this.state.volume);
      this.refWordField.current.classList.add('incorrectAnswer');
      countIncorrect++;
      this.inCorrectScore = (Number(this.state.currentPlayer[this.nameInCorrect]));
      this.currentPlayer[this.nameInCorrect]=countIncorrect;
        localStorage.setItem(this.currentPlayer.name, JSON.stringify(this.currentPlayer));
      this.setState({ countIncorrect: countIncorrect });
    }
    
    this.currentPlayer[this.nameScore]=countCorrect-countIncorrect;
    localStorage.setItem(this.currentPlayer.name, JSON.stringify(this.currentPlayer));
  }
  clickHandler = (event) => {

    if (this.refWordField.current.classList.contains('incorrectAnswer')) {
      this.refWordField.current.classList.remove('incorrectAnswer');
    }

    let data = event.target.textContent;
    this.setState({ squares: this.state.squares.concat([data]) });

    event.target.style.pointerEvents = 'none';
    event.target.style.background = 'rgb(103, 105, 105)';

  }

  render() {
    return (
      <>
      {this.state.statistics
      ? 
      <div className="statistics"> Статистика
      <div className="btnStart" onClick={()=>(this.setState({statistics:!this.state.statistics}))}> Закрыть </div>

      <ScorePage />
      </div>
      :<></>}

      <div className="leftBlock">
<div className="btnStart" onClick={()=>this.props.backToMenu()}> Меню </div>
<div className="btnStart"> Справка </div>
<div className="btnStart" onClick={()=>(this.setState({statistics:!this.state.statistics}))}> Статистика </div>
</div>

      <div className="game">
    
        {this.state.stateGame
          ?
          <>
            <div className="winnerBox winnerGame">
            <div className="winnerGameTitle">Поздравляем!</div>
            <div className="winnerGameTitle">{`Уровень ${this.difficulty} ${this.currentLevel} пройден!`}</div>    
{(this.currentLevel==="1")
? 
<>
<div className="btnStart" onClick={()=>this.changedLevel(this.difficulty,"2",false)}> Следующий уровень </div>
</>
:<></>}
{(this.currentLevel==="2")
? 
<>
<div className="btnStart" onClick={()=>this.changedLevel(this.difficulty,"3",false)}> Следующий уровень </div>
</>
:<></>}
{(this.currentLevel==="3")
? 
<>
{(this.difficulty==="hard")
?<div className="btnStart" onClick={()=>this.props.backToMenu()}> В меню</div>
:<div className="btnStart" onClick={()=>this.changedLevel(this.difficulty,"1",true)}> Перейти на следующую сложность</div>}
</>
:<></>}
</div>
          </>
          :
          <>
           
            <div className="title" style={this.titleStyle}>
            <div className="full"></div>
              Угадай слова
            <div className="btnFullScreen" onClick={this.jobFullScreen}>full screen</div>
            
            </div>
            <div className="field" style = {this.divStyle}>
              {this.state.field.map((item, index) => (
                <div className={`fieldCell ${item}`} key={index}>{item}</div>
              ))}
            </div>

            <div className="lettersGameField">
              {this.state.wordsGame.map((item, index) => (
                <div className="lettersGame" onClick={this.clickHandler} key={index}>{item}</div>
              ))}

            </div>
            <div className="wordField" ref={this.refWordField}>
              {this.state.squares.map((item, index) => (
                <div className="word" key={index}>{item}</div>
              ))}
            </div>
            <div className="btnBox">

             
              <div className="btnOk" ref={this.refBtnOk} onClick={this.clickOk}> Принять </div>
              <div className="btnClear" onClick={()=>this.clear()}> Очистить </div>
          
              <Level funAnimation = {this.winnerAnimation} setChanged={this.setChanged} field = {this.state.field} line = {this.lineSave} repeat={(this.state.field.every(this.isWinner))} difficulty={this.difficulty} currentLevel={this.currentLevel}/>
            </div>
          
          </>
        }
      </div>
      <div className="rightBlock">
      <div className="StatisticsBox"> Статистика игры

      <div className="difficultyTitle">Сложность:</div>
    <div className="difficulty">{this.difficulty}</div>
    <div className="levelTitle">Уровень:</div>
    <div className="level">{this.currentLevel}</div>
    
      <div className="correctBox"> Правильных ответов:
      <div className="countCorrect"> {this.state.countCorrect} </div>
      </div>
      <div className="inCorrectBox"> Неправильных ответов:
      <div className="countIncorrect"> {this.state.countIncorrect} </div>
      </div>
      </div>

      
     
            <div className="helpBox"> Помощник
            <div className="btnNext" ref={this.refBtnNext} onClick={() => this.clickNext(this.state.countIncorrect)}>Next word</div>
              <div className="btnAutoFinish" ref={this.refBtnAutoFinish} onClick={() => this.clickAutoFinish(this.state.countIncorrect)}> Autoplay </div>
            </div>
            <div className="volumeBox">
            <div className="volumeNull" onClick={() => this.clickVolumeNull()}>0</div>
              <div className="volumeMinus" onClick={() => this.clickMinus()}>-</div>
              <div className="volumeValueWrapper">
                <div className="volumeValue" ref={this.refAudio}>{this.state.volume}</div>
              </div>
              <div className="volumePlus" onClick={() => this.clickPlus()}>+</div>
            </div>
      </div>
</>
    );
  }
}
export default App;