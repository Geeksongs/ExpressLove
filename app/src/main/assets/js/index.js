/*
  Still to do:
  - Make the animation time based so it can run faster and not frame rate dependant
  - Make the thicknes bigger on random areas of the leminescate
*/

function square(x){return x*x;}
function heart_shape(t, a) {
  var x = 16 * (Math.sin(t) * Math.sin(t) * Math.sin(t));
  var y = 13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t);
  return [x*a/12, y*a/15 * -1];
}

function rotate_point(pointX, pointY, originX, originY, angle, extrude) {
  var slope = Math.atan2(pointY - originY, pointX - originX);
  pointY = originY + Math.sin(slope) * extrude;
  pointX = originX + Math.cos(slope) * extrude;
  
	angle = angle * Math.PI / 180.0;
	return {
		x: Math.cos(angle) * (pointX-originX) - Math.sin(angle) * (pointY-originY) + originX,
		y: Math.sin(angle) * (pointX-originX) + Math.cos(angle) * (pointY-originY) + originY
	};
}

var canvas = document.getElementsByTagName('canvas')[0];
var ctx = canvas.getContext('2d');

/*
  Some global variables
*/

var center = [400,250],
    pi = Math.PI,
    lob = heart_shape;
/* color, maxthicknes, minthickness, maxlength*/
var colors = [
  ["rgba(254,68,68,0.4)", 30, 20, pi/4],
  ["rgba(255,85,85,0.5)", 15, 10, pi/2],
  ["rgba(151,26,22,0.5)",  10, 8,  pi],
  ["rgba(250,240,240,0.8)", 10, 8, 1.5*pi],
  ["rgba(50,11,4,0.7)",     5, 3,  1.5*pi]
];

/*
  A loop object
*/
function InfinityLoop(){
  var pickedColor = colors[Math.round(Math.random() * (colors.length -1))];
  
  this.a = Math.random() * 50 + 150;
  //this.length = (Math.random() * 0.75 + 0.25) * pi; //Max = 2*PI
  this.length = Math.random() * pickedColor[3] + (0.25*pi);
  this.position = Math.random() * 2 * pi; //0.5 * pi;
  this.speed = (2 * pi / 100) - (Math.random() * ( pi / 200));
  this.heightAdjust = Math.random() * 0.2 + 1;
  this.center = {
    x: Math.random() * 20 - 10 + center[0],
    y: Math.random() * 20 - 10 + center[1],
  }



  this.color = pickedColor[0];//"rgba(200, 180, 0, 0.75)";
  this.thickness = Math.random() * pickedColor[1] + pickedColor[2];
  
  this.computePath = function(start, length, a) {
    var main_points = [],
        extruded_left_points = [],
        extruded_right_points = [];
    var segments = Math.round(this.length / this.speed);
    
    var lastPoint = null;
    
    for(i=0; i<segments; i++) {
      
      t = this.speed * i + this.position;
      if(t > 2 * pi) t = t - 2 * pi;
      if(t < 0) t = 2 * pi - t;
      
      var main_point = lob(t, a);
          main_point[1] = main_point[1] * this.heightAdjust + this.center.y;
      var newPoint = {
        x: main_point[0] + this.center.x,
        y: main_point[1] 
      };

      if(lastPoint == null) {
        var prevPoint = lob(t - this.speed, a);
        prevPoint[1] = prevPoint[1] * this.heightAdjust + this.center.y;
        lastPoint = {x: prevPoint[0] + this.center.x, y:prevPoint[1]};
      }

      var ribbonReductionIndex = ((i / (segments / 200)));
      //ribbonReductionIndex *= (Math.cos(2*t)+1);
      var ribbonThickness = Math.sin(pi/2*(ribbonReductionIndex / 100))*this.thickness;      

      var extrudedLeftPoint = rotate_point(
        lastPoint.x, lastPoint.y, 
        newPoint.x, newPoint.y, 90, - ribbonThickness/2
      );
      extruded_left_points.push(extrudedLeftPoint);

      var extrudedRightPoint = rotate_point(
        lastPoint.x, lastPoint.y, 
        newPoint.x, newPoint.y, 90, ribbonThickness/2
      );
      extruded_right_points.push(extrudedRightPoint);
      
      lastPoint = newPoint;
    }
    var points = extruded_left_points.concat(extruded_right_points.reverse());
    
    return points;
  }
  
  this.drawPath = function() {
    var leafPath = this.computePath(
      this.position, 
      this.length, 
      this.a, 5);
    
    this.position += this.speed;
    
    ctx.fillStyle = this.color;   
    ctx.beginPath();
    ctx.moveTo(leafPath[0].x, leafPath[0].y);
    for(i=1;i<leafPath.length;i++) {
      ctx.lineTo(leafPath[i].x, leafPath[i].y);
    }
    ctx.closePath();
    ctx.fill();
    
    if(this.position > 2 * pi) {
      this.position = this.position - 2 * pi;
    }
  }
  
  this.reposition = function(){
    this.center = {
      x: Math.random() * 20 - 10 + center[0],
      y: Math.random() * 20 - 10 + center[1],
    }
  }
  
  this.tick = function(timestamp){
    this.drawPath();
  }
  
  return this;
}



/*
  Get the animation started
*/
var Scene = function(){
  
  var loops = [];
  var lastTick = 0
  
  for(var i=0; i<50; i++) {
    loops.push(new InfinityLoop());
  }
  
  var clearCanvas = function() {
    ctx.fillStyle="rgba(200,60,60,.1)";
    ctx.fillRect(0,0,canvas.width,canvas.height);
  }
  
  var animate = function(timestamp) {
    /*skip frames if more than 60/second*/
    if(timestamp - lastTick < 1000/60){
      requestAnimationFrame(animate);
      return;
    }

    clearCanvas();
    for(var i=0; i<loops.length; i++) {
      loops[i].tick(timestamp);
    }


    lastTick = timestamp;
    requestAnimationFrame(animate);
  }
  
  this.run = function() {
    requestAnimationFrame(animate); 
  }
  
  this.reset = function() {
    loops = [];
    lastTick = 0
  
    for(var i=0; i<50; i++) {
      loops.push(new InfinityLoop());
    }
  }
  
  this.reposition = function() {
    for(i=0; i<loops.length; i++) {
      loops[i].reposition();
    }
  }
  
  return this;
}


var scene = new Scene();
scene.run();

$(window).resize(function(){
  canvas.width = $(window).width();
  canvas.height = $(window).height();
  center[0] = canvas.width/2;
  center[1] = canvas.height/2;    
  scene.reposition();
}).resize();

function reset(){
  scene.reset();
}