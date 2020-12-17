import './App.css';
import React, {useEffect, useState} from 'react'
import bwipjs from "bwip-js";
import TextField from '@material-ui/core/TextField';

function App() {

  const [ text, setText] = useState('');
  const [ binary, setBinary] = useState([]);
  const [ hex, setHex] = useState(false);

  useEffect(()=>{
    let arr = [];
    try {
      for(let i = 0; i < text.length; i++){
        let str = '';
        let hexStr = parseInt(text[i], 16).toString(2);
        console.log(hexStr, hexStr.length);
        if(hexStr.length < 4){
          for(let i = 0; i < 4 - hexStr.length; i++){
            str += '0';
          }
        }
        console.log(str);
        arr.push(str + parseInt(text[i], 16).toString(2))
      }
      setBinary(arr)
        let canvas = bwipjs.toCanvas("mycanvas", {
          bcid: "plessey", // Barcode type
          text: text, // Text to encode
          scale: 3, // 3x scaling factor
          height: 10, // Bar height, in millimeters
          includetext: true, // Show human-readable text
          textxalign: "center" // Always good to set this
        });
      } catch (e) {
        // `e` may be a string or Error object
      }

  }, [text]);


  return (
    <div className="App">
      <body className="App-header">
      <p>Maslov KP-01mp</p>
      <p>Variant 14 - Plessey</p>
      {text && <canvas id="mycanvas"></canvas>}
      {hex && <p>{binary.join(' ')}</p>}
        <div>
          <form className={'root'} noValidate autoComplete="off">
            <TextField onChange={(event)=> {
              const re = /[0-9A-F]*/g;
              if(event.target.value.match(re).length === 2 && event.target.value.match(re)[0]){
                setHex(true);
                setText(event.target.value)
              } else{
                setHex(false)
                setText('')
              }
            }} id="outlined-basic" label="Encode" variant="outlined" />
          </form>
          <h5>This symbology supports the following hexadecimal characters:</h5>
          <p>All numeric digits (0-9)</p>
          <p>Uppercase letters A-F</p>
        </div>
      </body>
    </div>
  );
}

export default App;
