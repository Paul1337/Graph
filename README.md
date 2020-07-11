# Graph
Simple JS Canvas Library.

Library is used for 2D drawing on Canvas.
It supports retina displays.

Quick example:
let gr = new Graph(800, 600)
gr.background('black')

# Documentation:

Initializing:
Graph::constructor(width, height, place = document.body)
place - where to add canvas (default is document.body)

you can always access canvas from graph object: graph.canvas

Drawing:
 
Draw a rect 
rect(x, y, w, h, clear = false, noBorders = false)
clearRect(x, y, w, h) 

Draw a circle
circle(x, y, r = 20, clear = false, noBorders = false)
clearCircle(x, y, r = 20)

Draw an ellipse
ellipse(x, y, w, h, clear = false, noBorders = false) 
clearEllipse(x, y, w, h)
rotatedEllipse(x, y, w, h, angle, inWhat = 'deg')

Draw a polygon
polygon(...coords, clear=false, noBorders = false)

Draw a triangle
triangle(x1, y1, x2, y2, x3, y3, clear = false, noBorders = false)
clearTriangle(x1, y1, x2, y2, x3, y3)

Draw a line
line(x1, y1, x2, y2)

Draw an image
image(param, x, y, w, h, x2, y2, w2, h2) 
"param"
1. can be a string to represent an image url, library will check if that url was loaded before and load if necessary.
2. can be an <img/> object.

Show a text
text(value, x, y, maxWidth)
setFontSize(size)

Curves
curve(x1, y1, cp1x, cp1y, cp2x, cp2y, x, y, fill = false)
quadCurve(x1, y1, cpx, cpy, x, y, fill = false)

Transformations:
beginPath()
closePath()

moveTo(x, y)
lineTo(x, y)
translate(x, y)
rotate(val, inWhat = 'rad')

restore()
save()

Handling events:

Handle an event on canvas
on(eventName, callback)
off(eventName, callback)

Filling all the screen:
background(style)
backgroundRGB(r, g, b, a)

Bordering the screen:
border(style)
borderRGB(r, g, b, a)

Setting colours:
fill(style)
fillRGB(r, g, b, a)

stroke(style)
strokeRGB(r, g, b, a)

Extra:
setLineWidth(width)
resize(width, height) - change the canvas size 

Destroy the canvas:
destroy() 
