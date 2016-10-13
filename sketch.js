circles = []
max_width = 400;

num_circles = 0;

canvas_width = 1200;
canvas_height = 750;
rgb = [255,255,255];

descend = 0;

counter = 0;

default_random_upperbound = 4;
default_frequency = 3;

var random_slider;
var frequency_slider;

var start_draw = 0;
var stop_draw = 0;

function setup() {
  var myCanvas = createCanvas(canvas_width, canvas_height);
  myCanvas.parent('main');
  
  random_slider = createSlider(default_random_upperbound, 255, default_random_upperbound);
  random_slider.position(10, 10);
  random_slider.size(200);
  random_slider.parent('randomization');
  
  frequency_slider = createSlider(1, 15, default_frequency);
  frequency_slider.position(10, 60);
  frequency_slider.size(200);
  random_slider.parent('frequency');
  
  generate_button = createButton("Generate", "gen");
  //generate_button.position(10,80);
  generate_button.parent('generate');
  generate_button.mousePressed(startDraw);
  
  stop_button = createButton("Stop", "stop");
  //stop_button.position(10,100);
  stop_button.parent('stop');
  stop_button.mousePressed(stopDraw);
  
  frameRate(15);
}

function startDraw() {
  start_draw = 1;
}

function stopDraw() {
  stop_draw = 1;
}

function colourshift() {
  rand = round(random(0,2));
  quantity = round(random(0,random_slider.value()));
  if((rgb[rand]+quantity)>=255) descend = 1;
  if((rgb[rand]-quantity)<=0)   descend = 0;
  
  if(descend == 0) {
    rgb[rand] += quantity;
  }
  if(descend == 1) {
    rgb[rand] -= quantity;
  }
 
  
}

function expand(crcle, i) {
  if(crcle.width < crcle.max_width) {
        crcle.width += map(crcle.width, crcle.max_width, 0, 1, 5);
  }
  
  //if(crcle.width < max_width)
    //crcle.width += 5;
}

function draw() {
  if(start_draw == 1) {
    //background(255);
    
    if(stop_draw == 0) {
      colourshift();
    
      period = map(frequency_slider.value(), 1, 15, 15, 1);
      if(counter%period == 0) {
        circles.push(new circle(canvas_width/2, canvas_height/2));
        circles[circles.length-1].rgb_=[rgb[0],rgb[1],rgb[2]];
      }
      counter++;
      
      
      if(circles.length > num_circles) {
        for(var j=0; j<circles.length-1; j++) {
          circles[j].max_width = circles[j+1].max_width;
        }
        max_width += 10;
        circles[circles.length-1].max_width = max_width;
      }
      for(var i=0; i<circles.length; i++) {
        expand(circles[i], i);
        //fill(circles[i].rgb_)
        circles[i].sketch();
      }
      num_circles = circles.length;
      }
    } else {
      for(var i=0; i<circles.length; i++) {
        circles[i].sketch();
      }
    }
    
  
}

function circle(x, y) {
  this.width = 10;
  this.x = x;
  this.y = y;
  this.rgb_ = [0,0,0];
  this.max_width = max_width;
  //max_width -= 5;
  this.sketch = function() {
    noStroke();
    fill(this.rgb_)
    ellipse(this.x, this.y, this.width, this.width);
  }

}