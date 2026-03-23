# A5 Week 8 Assignment

## How to run
Same as before , python3 -m http.server 4040 , 
linke -> http://localhost:4040/

## Structure 
```
A5-Week-8/
|--data/
   |--items.json
|--app.js/
|--index.html/
|--render.js/
|--state.js/
|--styles.css/
```
## Module Responsiblity
1)state.js owns state, setters, selectors, and data loading 
2)render.js owns DOM capablities and rendering 
3)app.js owns the listeners

## Tests
I had a hard time just having everything look like it is working properly. I had two main console errors (found using inspect). The main issue was with the json file and its data just not showing up at all, first there was an erorr, then just blank
I also to run tests to make sure there the stuff that being shown was not from earlier
Typed in search box to ensure same functionality as before
When something that does not exists is typed it shows no matches same as before
