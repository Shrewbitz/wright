//the translation is powered by https://github.com/cjvnjde/google-translate-api-browser


import "./styles/index.scss";
import dragElement from './scripts/words'
const d3 = require("d3-fetch")
import { setCORS } from "google-translate-api-browser";

document.addEventListener("DOMContentLoaded", () => {
  let drag = dragElement

  d3.tsv("/src/data/language.tsv").then((data) => {
    let z = (data.length);
    // debugger
    for (let i = 0; i < z; i++) {
      // debugger
      // const lang = data[i];
      let option = document.createElement("option")
      option.innerHTML = data[i].languageName;
      option.value = data[i].languageCode
      document.getElementById("language").appendChild(option)
    }
    console.log(z) 
  });


  
  
  d3.tsv("/src/data/sentences.tsv").then((data) => {
    let x = (data[Math.floor(Math.random() * 20000)].sentence);
    console.log(x);
    
    
    
    //makes dropdown and also changes language of hint
    document.getElementById("language").addEventListener('change',
      (event) => {
        let langugePicker = event.target.value;
        const translate = setCORS("http://cors-anywhere.herokuapp.com/");
        translate(x, { to: langugePicker })
        .then(res => {
          document.getElementById("translation").innerHTML = (res.text)
          console.log(res.text)
        })
        .catch(err => {
          console.error(err);
        });
      }
    );
        
      // places words
      let word_arr = x.split(" ")
      for (let i = 0; i < word_arr.length; i++) {
        let word = document.createElement("div")
        word.innerHTML = word_arr[i];
        word.style.top=`${Math.random() * 520 }px`;
        word.style.left=`${Math.random() * 1050 + 10}px`;
        document.getElementById("words").appendChild(word)
        drag(word);
      }
  });



});