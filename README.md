# How to Use
Click around and generate patterns. Cells cycle through colors defined as a theme. 
Click Reset Grid to watch your creation recreate itself! Add more clicks, we track all your clicks! Watch more patterns.

Steps define number of iterations of a shape per click
Rate defines how fast our shape propagation timer ticks. Lower number is faster
Wave makes a shape propagate out when checked

# Some generated Art
![Pattern 1](https://github.com/michaeljreynolds/grid-colors/blob/master/src/assets/images/pattern3.png?raw=true)
![Pattern 2](https://github.com/michaeljreynolds/grid-colors/blob/master/src/assets/images/pattern2.png?raw=true)
![Pattern 3](https://github.com/michaeljreynolds/grid-colors/blob/master/src/assets/images/pattern3.png?raw=true)

# Todo

Server stuff to do
1) add node to project
2) add rest to create different patterns and define shape
3) add collaborative drawing feature using socket.io
4) node gif generator - output a gif of a sequence of grid steps to the screen, user can save
4a) can use node, html2canvas, gif-generator - output result to screen || https://www.npmjs.com/package/gifencoder

General Features
1) <strike>add an event that remembers clicks on board and a button to click to replay</strike>
1a) can save multiple sequences and can replay them on top of each other in any order
2) add a feature to sort colors from top to bottom - can fill in spaces from first to last of rows that have a cell filled with colors
3) add localStorage for patterns
4) <strike>add a clearGrid function to shapeService that resets grid to original color</strike>
5) a game where you see the image of a grid clicked on multiple times with multiple shapes. you need to recreate it'
6) can we do a music visualizer where the patterns are timed to the music?
7) Can we do anything with our interval timer loops? How can we get smoother animation
8) Add a redux store

!!! 
Color Features
1) add a colors options that allows a user to specify as many colors as they want for grid to cycle through
2) add a randomizer option that generates a starting grid option of random colors and a color cycling option of random colors
3) <strike>add a theme of colors (dracula, ide, etc) that you can select from </strike>
3a) add cool color palettes - look up, get from others, etc. I think 8 would be a good standard color cycle length
4) fixed background color palette options. Experiment with background colors not part of the theme colors

!!!
Engineering cleanup
1) move grid generation code to app so we can move resetgrid into options
2) Timer repaint issues - need to change how timers are being handled. Currently, every shape has its own timer. These timers run into each other as they increase, so the repainting stutters and slows down
This means every shape has to do its own repaint that blocks the repainting of other shapes. 
Instead I need every repaint to grab the current state of the grid in regards to all clicks that have occurred.
Then there's a repain timer that runs every x seconds until the click queue is empty
2a) algorithm - user clicks, send coordinates to a click queue. timer thread run every x ms. calculate next state of grid based off of merged clicks at a normalized step

!!!
NFT Ideas
1) Traits - color backgrounds, grid size, square size, number of sequences, shapes, pattern (random, different preset clicks)
2) metadata - gif of a subset of sequence steps. number of trades?? 