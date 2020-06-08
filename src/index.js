//the translation is powered by https://github.com/cjvnjde/google-translate-api-browser

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

    // debugger
    if  (localStorage.getItem('myLanguage')) {
      document.getElementById("language").value = localStorage.getItem('myLanguage')
    }
  });

  let wordArr = []

  let demo = () => {
    //checks every half second to see if sentence is correct
    let interval = setInterval(() => {
      let wordCollection = document.getElementById("words").getElementsByTagName("div");
      let correctLayout = Array.from(wordCollection)
      let currentLayout =  Array.from(wordCollection).sort((one, two) => Math.sign(one.offsetLeft - two.offsetLeft))
      
      // checks order, height, and spacing.
      let finalCheck = 0
      let perfectCheck = currentLayout.length * 3 - 3

      for (let i = 1; i < currentLayout.length; i++) {
        if (correctLayout[i].innerHTML === (currentLayout[i].innerHTML)) {
          finalCheck += 1
        }
        let height = Math.abs(currentLayout[i - 1].offsetTop - currentLayout[i].offsetTop)
        if (height < 50) {
          finalCheck += 1
        }
        let left = Math.abs(currentLayout[i - 1].offsetLeft - currentLayout[i].offsetLeft)
        if (left < 200 && left > 20) {
          finalCheck += 1 
        }
      }

      // makes progress bar fill up
      document.getElementById("progress").style.width = `${(finalCheck) / (perfectCheck) * 300}px`;

      //win condition
      if (finalCheck === perfectCheck ) {
        clearInterval(interval)
        document.getElementById("win").style.borderColor = "#1ef325"
        document.getElementById("correct").play()
        setTimeout(() => {location.reload()}, 3000);
      }  //////////
    }, 500)
  }


  //picks a rando sentence
    d3.tsv("./src/data/sentences.tsv").then((data) => {
      let x = ""
      do {
        // x = "cheese cheese cheese cheese.";
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
    }).then(demo);
});