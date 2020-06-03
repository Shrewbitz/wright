//the translation is powered by https://github.com/cjvnjde/google-translate-api-browser

// I had a hand in the family deciding to move to New York.
// Scarcely had the market opened when the fire broke out.
//The time will come when you will be sorry for it.

// make sure language persists on website
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
      option.className = "option"
      document.getElementById("language").appendChild(option)
    }
  });

  let wordArr = []
  
////////// test
// sortByPoints(player1, player2) {
//   return Math.sign(player2.points - player1.points);
// }

// const playersArray = Object.values(this.props.gameState.players).sort(
//   this.sortByPoints
// );
  



  let demo = () => {
    let section = document.getElementById("words");
    let wordCollection = section.getElementsByTagName("div");
    let c = Array.from(wordCollection)
    let wright = ""
    for (let i = 0; i < c.length; i++) {
      wright += (c[i].innerHTML + " ")
    }
    wright = wright.slice(0, wright.length-1) 
    // this.wright = this.wright.bind(this)
    //checks every half second to see if sentence is correct
    let interval = setInterval((wright) => {
      console.log(wright)
      let section = document.getElementById("words");
      let wordCollection = section.getElementsByTagName("div");
      let y = Array.from(wordCollection)
      let currentLayout = y.sort((one, two) => Math.sign(one.offsetLeft - two.offsetLeft))
      // let k = 
      
      let sentence = ""
      for (let i = 0; i < currentLayout.length; i++) {
        sentence += (currentLayout[i].innerHTML + " ")
      }
      sentence = sentence.slice(0, sentence.length-1)
       
      debugger
      let words = []
      let double = []
      let count = []
      let lcheck = []
      let dubCount = 0
      let hcheck = []
      let length = wordCollection.length
      let final = [0,0,0]

      for (let i = 0; i< length; i++) {
        lcheck.push(wordCollection[i].offsetLeft)
        hcheck.push(wordCollection[i].offsetTop)
        words.push(wordCollection[i].innerHTML)
        count.push(0)
        double.push(1300)
      }
      for (let i = 1; i < length; i++) {
        for (let j = 0; j < length; j++) {
          if ((words[i] === words[j]) && (i != j)) {
            double[i] = j
            double[j] = i
            dubCount += 1
          }
        }        
        
        //checks position
        let left = (lcheck[i] - lcheck[i - 1]);
        let left2  = double[i] < 1200 ? (lcheck[i] - lcheck[double[i] - 1]) : 0;
        let left3 =  double[i - 1] < 1200 ? (lcheck[i] - lcheck[double[i - 1]]) : 0;
        if (((( left < 200) && (left > 20)) || (( left2 < 200) && (left2 > 20))) || (( left3 < 200) && (left3 > 20)))
        { count[i] += 1} 
        // debugger
        let height = (hcheck[i] - hcheck[i - 1]); 
        (( height < 50) && (height > -50)) ? final[2] += 1 : 0; 
  
      }
      for (let i = 1; i < length; i++) {
        if (count[i] >= 1) {
          final[0] += 1
        }
        if (count[i] >1) {
          final[1] += 1
        }  
      }

      // makes progress bar fill up
      let progress = document.getElementById("progress");
      // progress.max = (length - 1)*2
      // progress.value = final[0] + final[2]
      progress.style.width = `${((final[0] + final[2]) / ((length - 1)*2) * 300)}px`



      //win condition
      if (((final[0] === (length - 1)) && (final[1] <= (dubCount/2))) && (final[2] === (length - 1))) {
        clearInterval(interval)
        console.log("you did it!!!!")
        document.getElementById("win").style.borderColor = "#1ef325"
        document.getElementById("correct").play()
        setTimeout(() => {location.reload()}, 3000);
      }  //////////

    }, 500)

  }
  setTimeout(demo, 1000);
  /////////////


  //picks a rando sentence
    d3.tsv("./src/data/sentences.tsv").then((data) => {
    let x = ""
    do {

      // x = "You never know what you can do till you try.
      x = (data[Math.floor(Math.random() * 20000)].sentence);
    }
    while (x.length > 80);
    // console.log(x);
    
    //makes dropdown and also changes language of hint
    
    let lang = localStorage.getItem('myLanguage')
    if (lang && (lang != " ")) {
      const translate = setCORS("https://cors-anywhere.herokuapp.com/");
        translate(x, { to: lang })
        .then(res => {
          document.getElementById("translation").innerHTML = (res.text)
          // console.log(res.text)
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
          const translate = setCORS("https://cors-anywhere.herokuapp.com/");
          translate(x, { to: langPicker })
          .then(res => {
            document.getElementById("translation").innerHTML = (res.text)
            // console.log(res.text)
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
        word.style.top=`${Math.random() * 505 + 15 }px`;
        word.style.left=`${Math.random() * 1050 + 10}px`;
        document.getElementById("words").appendChild(word)
        drag(word);
      }
  });



});