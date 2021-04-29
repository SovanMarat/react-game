import React, {useEffect, useState} from 'react';
import data from './data.json';
import Footer from "./Footer";

function StartPage(props) {

const [keys, setKeys] = useState(data.ru);
const refLevel3 = React.createRef();

// useEffect(()=>{
//  // sfsdf
// },[isSubmit]);


const changeLang = ()=>{
  if(keys===data.ru){
    setKeys(data.en);
  } else {
    setKeys(data.ru);
  }
}

  return (
    <div className="wrapper">  
{keys?
keys.map((item, index) => 
<div className="scoreTable" key={index}>{`${item}`}</div>
              )
:<></>}

<div className="btnStart" onClick={()=>changeLang()}> en </div>

    <Footer/>
    </div>
  )
  
}

export default StartPage;