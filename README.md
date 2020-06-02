# Wright

![](./src/images/wright.gif)

# Background

Wright is a web app that lets people study English and eventually other languages by creating sentences out of a given set of words. The premise being that this will help users learn new words and sentence structure. A translated version of the sentence will appear for guidance.  When the words are arranged in the correct order of the sentence a new sentence puzzle will load. 

# Functionality & MVP

- import a sentence
- get a translation of the sentence from google translate
- split the original sentence into words
- let users drag the words on the screen
- fetches a new sentence when the words are in the correct order
- a production README

# Wireframes

The top of the screen will have a dropdown menu that lets you select what language you want the imported sentence to be translated to. Below will be a container that contains the randomly distributed words. This is all that is needed for the mvp. Other possible features would be a progress bar, to add a time limit, a score, and how many sentences you have built in the session. 

![](wireframe.png)

# Architecture and Technologies

I have a list of 1.3 million English sentences in a .tsv file from taboeta. I cut down to 20000 of these and use D3 to fetch a sentence on a page load. I then send the sentence through google's translate api. The sentence string is split and rendered on the screen using javascript. There is a check to make sure each word is vertically and horizontally in the correct position and that duplicate words can be placed interchangably. When that check is complete a new sentence will be fetched from the tsv file and new words will be rendered.

