var canvas = document.getElementById("canvas");
canvas.width = 800;
canvas.height = 600;
var context = canvas.getContext("2d");


function Hexagon(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.size = size;

    this.colors = Colors.rgb.loop(color, Colors.rgb.darken(color, 50), 50);
    console.log(this.colors);
    this.last;
    this.elapsed = 0;
    this.duration = 5000;
    this.whatever = 0;
}
Hexagon.prototype.step = function(delta) {

};
Hexagon.prototype.draw = function(context) {
    var now =  new Date().getTime();
    var delta = now - (this.last || now);
    this.last = now;

    this.elapsed += delta;
    this.elapsed = this.elapsed < this.duration ? this.elapsed : 0;
    var step = Math.floor(this.elapsed / (this.duration / this.colors.length));

    var c = this.colors[step];
    if (this.whatever < (this.duration + 1000)) {
        console.log(c);
    }
    this.whatever += delta;

    context.fillStyle = c;
    context.beginPath();
    context.moveTo(this.x + this.size / 2, this.y);
    context.lineTo(this.x, this.y + this.size / 4);
    context.lineTo(this.x, this.y + this.size / 4 * 3);
    context.lineTo(this.x + this.size / 2, this.y + this.size);
    context.lineTo(this.x + this.size, this.y + this.size / 4 * 3);
    context.lineTo(this.x + this.size, this.y + this.size / 4);
    context.closePath();
    context.fill();
};


var size = 100;
var x = 300;
var y = 200;

var h = [];
h.push(new Hexagon(x + (size * 0), y + (size * 0), size, "rgb(255, 0, 0)")); // Center
h.push(new Hexagon(x - (size * 1), y + (size * 0), size, "rgb(0, 255, 0)")); // Left
h.push(new Hexagon(x - (size * 0.5), y - (size * 0.75), size, "rgb(0, 0, 255)"));
h.push(new Hexagon(x + (size * 0.5), y - (size * 0.75), size, "rgb(0, 255, 0)"));
h.push(new Hexagon(x + (size * 1), y + (size * 0), size, "rgb(0, 0, 255)")); // Right
h.push(new Hexagon(x - (size * 0.5), y + (size * 0.75), size, "rgb(0, 0, 255)"));
h.push(new Hexagon(x + (size * 0.5), y + (size * 0.75), size, "rgb(0, 255, 0)"));

// h.push(new Hexagon(x + size, 0, size, "#009"));
// h.push(new Hexagon(x + size / 2, size / 4 * 3, size, "#00D")); // Center

var draw = function() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < h.length; i++) {
        h[i].draw(context);
    }

    window.requestAnimationFrame(draw);
};
draw();


// save canvas image as data url (png format by default)
// var dataURL = canvas.toDataURL();

// set canvasImg image src to dataURL
// so it can be saved as an image
// document.getElementById('canvasImg').src = dataURL;