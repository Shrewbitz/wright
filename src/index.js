//the translation is powered by https://github.com/cjvnjde/google-translate-api-browser


// redo algorithm to solve double words
// make it so it doesnt reload
// seperate files

import "./styles/index.scss";
import dragElement from './scripts/words'
const d3 = require("d3-fetch")
import { setCORS } from "google-translate-api-browser";

document.addEventListener("DOMContentLoaded", () => {
  let drag = dragElement

  //changes hint language
  d3.tsv("./src/data/language.tsv").then((data) => {
    let z = (data.length);
    for (let i = 0; i < z; i++) {
      let option = document.createElement("option")
      option.innerHTML = data[i].languageName;
      option.value = data[i].languageCode
      document.getElementById("language").appendChild(option)
    }
    // console.log(z) 
  });


  let wordArr = []
  
  // waits until promise returns sentence
  let demo = () => {
    //checks every half second to see if sentence is correct
    let interval = setInterval(() => {
      let section = document.getElementById("words");
      let wordCollection = section.getElementsByTagName("div");
      let count = 0
      let lcheck = []
      let hcheck = []
      let length = wordCollection.length

      for (let i = 0; i< length; i++) {
        lcheck.push(wordCollection[i].offsetLeft)
        hcheck.push(wordCollection[i].offsetTop)
      }

      for (let i = 1; i < lcheck.length; i++) {
        let left =   (lcheck[i] - lcheck[i - 1]);
        (( left < 300) && (left > 30)) ? count += 1 : count; 
        let height = (hcheck[i] - hcheck[i - 1]); 
        (( height < 100) && (height > -100)) ? count += 1 : count;   
      }

      //makes progress bar fill up
      let progress = document.getElementById("progress");
      progress.max = (length - 1)*2
      progress.value = count

      //win condition
      if (count === (length - 1)*2) {
        clearInterval(interval)
        console.log("you did it!!!!")
        document.getElementById("win").style.borderColor = "#1ef325"
        document.getElementById("correct").play()
        setTimeout(() => {location.reload()}, 3000);
      }  //////////

    }, 500)

  }
  setTimeout(demo, 1000);


  //picks a rando sentence
    d3.tsv("./src/data/sentences.tsv").then((data) => {
    let x = (data[Math.floor(Math.random() * 20000)].sentence);
    console.log(x);
    
    //makes dropdown and also changes language of hint
    
    let lang = localStorage.getItem('myLanguage')
    if (lang && (lang != " ")) {
      // debugger
      const translate = setCORS("http://cors-anywhere.herokuapp.com/");
        translate(x, { to: lang })
        .then(res => {
          document.getElementById("translation").innerHTML = (res.text)
          console.log(res.text)
        })
        .catch(err => {
          console.error(err);
        });
    } 
    //lets user change language
    document.getElementById("language").addEventListener('change',
      (event) => {
        let langPicker = event.target.value;
        //lets you change back to no hint
        if (langPicker === ' ') {
          document.getElementById("translation").innerHTML = ("Choose a language for your hint.")
          localStorage.setItem('myLanguage', ` `);
        } else {
          localStorage.setItem('myLanguage', `${langPicker}`);
          const translate = setCORS("http://cors-anywhere.herokuapp.com/");
          translate(x, { to: langPicker })
          .then(res => {
            document.getElementById("translation").innerHTML = (res.text)
            console.log(res.text)
          })
          .catch(err => {
            console.error(err);
          });
        } 
      }
    );
        
      // places words
      wordArr = x.split(" ")
      for (let i = 0; i < wordArr.length; i++) {
        let word = document.createElement("div")
        word.innerHTML = wordArr[i];
        word.style.top=`${Math.random() * 520 }px`;
        word.style.left=`${Math.random() * 1050 + 10}px`;
        document.getElementById("words").appendChild(word)
        drag(word);
      }
  });



});