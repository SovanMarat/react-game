import React from "react";

import Level from './Level';
import StartPage from './StartPage';
import playSound from './utils/sounds';
import soundCorrect from '../audio/true.wav';
import soundInCorrect from '../audio/false.wav';
import soundBackground  from '../audio/test.mp3';
import '../scss/App.scss';

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
      volume: 75,
      stateGame: false,
      fullScreen: false,
      countCorrect: 0,
      countIncorrect: 0
    }
    this.fieldCurrent = [];
    this.refWordField = React.createRef();
    this.refAudio = React.createRef();
  }


  setChanged(level) {
    this.setState({ field: level.field, wordsGame: level.wordsGame, winnerField: level.winnerField, winnerLine: level.winnerLine, codGame: level.codGame });
  }

  isWinner = (element) => {
    return Boolean(element);
  }
  jobFullScreen = () => {
if(this.state.fullScreen){
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
      this.setState({ volume: this.state.volume -= Math.ceil(this.state.volume/3) });
      if (currentAudio) {
        currentAudio.forEach(e => {
          e.volume = this.state.volume / 5000;
        });
      }
    }
    this.refAudio.current.style.width = `${this.state.volume}%`;
  }

  clickPlus = () => {
    let currentAudio = document.querySelectorAll('.audio');
    if (this.state.volume < 100) {
      this.setState({ volume: this.state.volume += Math.ceil(this.state.volume/3) });
      if (currentAudio) {
        currentAudio.forEach(e => {
          e.volume = this.state.volume / 5000;

        });
      }
    }
    this.refAudio.current.style.width = `${this.state.volume}%`;
  }

  clickNext = (countIncorrect) => {
    countIncorrect++;
    this.setState({ countIncorrect: countIncorrect });
    console.log('кол-во ошибок', countIncorrect);
    let indexShow = this.state.winnerLine.findIndex(item => item !== "xxx");
    if (indexShow !== -1) {
      console.log(this.state.codGame[indexShow]);
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
      console.log(countIncorrect);
      this.clickNext(countIncorrect);
      countIncorrect++;
    }
  }

  clickOk = () => {
    console.log(this.state.winnerLine);
    let countCorrect = this.state.countCorrect;
    let countIncorrect = this.state.countIncorrect;
    let letters = document.querySelectorAll('.lettersGame');
    let line = this.state.winnerLine;
    let str = this.state.squares.join('');
    console.log(str);
    line.forEach((e, index) => {
      if (str === e) {
        playSound(soundCorrect, this.state.volume);
        countCorrect++;
        this.setState({ countCorrect: countCorrect });
        console.log(`кол-во правильных: ${countCorrect}`);
        this.state.codGame[index].forEach(e => {
          this.fieldCurrent = this.state.field;
          this.fieldCurrent[e] = this.state.winnerField[e];
        })
        this.setState({ field: this.fieldCurrent });
        if (this.state.field.every(this.isWinner)) {
          console.log('wiiiiner!!!');
          this.setState({ stateGame: true });

        }
        this.state.winnerLine[index] = "xxx";

      }
      this.setState({ squares: [] });
      letters.forEach(e => {
        e.style.pointerEvents = 'auto';
        e.style.background = 'rgb(1, 138, 138)';
      })

    })
    if (countCorrect === this.state.countCorrect) {
      playSound(soundInCorrect, this.state.volume);
      this.refWordField.current.classList.add('incorrectUnswer');
      countIncorrect++;
      this.setState({ countIncorrect: countIncorrect });
      console.log(`incorrect word!!! ${countIncorrect}`);
    }

  }
  clickHandler = (event) => {

    if (this.refWordField.current.classList.contains('incorrectUnswer')) {
      this.refWordField.current.classList.remove('incorrectUnswer');
    }

    let data = event.target.textContent;
    this.setState({ squares: this.state.squares.concat([data]) });

    event.target.style.pointerEvents = 'none';
    event.target.style.background = 'rgb(103, 105, 105)';

  }

  render() {
    return (
      <div className="game">
        {this.state.stateGame
          ?
          <>
            <div className="winnerBox winnerGame">
              Ура
</div>
          </>
          :
          <>
            <div className="volumeBox">
            <div className="volumeNull" onClick={() => this.clickVolumeNull()}>0</div>
              <div className="volumeMinus" onClick={() => this.clickMinus()}>-</div>
              <div className="volumeValueWrapper">
                <div className="volumeValue" ref={this.refAudio}>{this.state.volume}</div>
              </div>
              <div className="volumePlus" onClick={() => this.clickPlus()}>+</div>

            </div>

            <div className="title">Угадай слова</div>
            <div className="field">
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
              <div className="btnNext" onClick={() => this.clickNext(this.state.countIncorrect)}> Next </div>
              <div className="btnAutoFinish" onClick={() => this.clickAutoFinish(this.state.countIncorrect)}> End </div>
              <div className="countIncorrect"> {this.state.countIncorrect} </div>
              <div className="countCorrect"> {this.state.countCorrect} </div>
              <div className="btnOk" onClick={this.clickOk}> ок </div>
              <div className="btnFullScreen" onClick={this.jobFullScreen}> full </div>


              
              <Level setChanged={this.setChanged} />
            </div>
          </>
        }
      </div>

    );
  }
}
export default App;