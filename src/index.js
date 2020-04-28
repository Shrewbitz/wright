import "./styles/index.scss";
import dragElement from './scripts/words'
const d3 = require("d3-fetch")

document.addEventListener("DOMContentLoaded", () => {
  let z = dragElement
  // dragElement(document.getElementById("word1"));


 
  d3.tsv("/src/data/sentences.tsv").then((data) => {
    let x = (data[Math.floor(Math.random() * 20000)].sentence);
    console.log(x)
    // document.getElementById("word1").innerHTML = word_arr[0]
      let word_arr = x.split(" ")
      for (let i = 0; i < word_arr.length; i++) {
        let word = document.createElement("div")
        word.innerHTML = word_arr[i];
        word.style.top=`${Math.random() * 520 }px`;
        word.style.left=`${Math.random() * 1050 + 10}px`;
        document.getElementById("words").appendChild(word)
        // debugger
        z(word);
    }
  });
  
  

});