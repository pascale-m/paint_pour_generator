var circles = [];
var max_width = 400;
var circleButtons = [];
var game;
var num_circles = 0;
var myCanvas;
var rgb = [255, 255, 255];
var bigtheme;
var pickedColor;
var descend = 1;
var toolstate = 1;
var counter = 0;
var default_random_upperbound = 4;
var default_frequency = 3;
var themes = [];

var random_slider;
var frequency_slider;
var start_draw = 0;
var stop_draw = 0;
var minButtonBox, minButton;


function setup() {

  myCanvas = createCanvas(windowWidth, windowHeight);
  myCanvas.parent('mainContainer');
	themes.push(select('#theme1Bubble'));
	themes.push(select('#theme2Bubble'));
	themes.push(select('#theme3Bubble'));
	themes.push(select('#theme4Bubble'));
	bigtheme = select('#tools');
	minButtonBox = select('#minbtncntnr');
	minButton = select('#minimizeButton');
	
  random_slider = createSlider(default_random_upperbound, 255, default_random_upperbound);
  random_slider.size(select('#randomnessSlider').width - 20);
  random_slider.parent('randomnessSlider');
  
  frequency_slider = createSlider(1, 15, default_frequency);
  frequency_slider.size(select('#frequencySlider').width - 20);
  frequency_slider.parent('frequencySlider');
	
	makeButtons();
	//makeThemes();
	game = new gameState();
	//console.log(game)
	
  frameRate(15);
}

function selectTheme(themeId) {
	var gg;
	themes[themeId].elt.style.border = "2px solid #0000ff";
	game.theme = themeId;
	for (gg = 0; gg < themes.length; gg++) {
		if (gg != themeId) {
			themes[gg].elt.style.border = "1px solid #4e6096";
		}
	}
	console.log(game.theme);
}

function makeButtons() {
	
	generate_button = createButton("Generate");
  generate_button.parent('button1');
  generate_button.mousePressed(startDraw);
	generate_button.addClass('myButton');
  
  stop_button = createButton("Stop");
  stop_button.parent('button2');
  stop_button.mousePressed(stopDraw);
	stop_button.addClass('myButton');
  
	save_button = createButton("Save");
  save_button.parent('button3');
  save_button.mousePressed(saveScreenShot);
	save_button.addClass('myButton');
		
	reset_button = createButton("Reset");
  reset_button.parent('button4');
  reset_button.mousePressed(reset);
	reset_button.addClass('myButton');
	
	

}

function makeThemes() {
	
	var firstTheme = select('#theme1');
	var themePos = firstTheme.position();
	var themeSize = firstTheme.size();
	
	
	circleWidth = min(themeSize.width,themeSize.height) - 20;
	circleButtons.push(new circle())
	circleButtons[0].x = themePos.x+themeSize.width/2;
	circleButtons[0].y = themePos.y+themeSize.height/2;
	circleButtons[0].width = circleWidth;
	
	var secondTheme = select('#theme2');
	themeSize = secondTheme.size();
	themePos = secondTheme.position();
	circleButtons.push(new circle())
	circleButtons[1].x = themePos.x+themeSize.width/2
	circleButtons[1].y = themePos.y+themeSize.height/2;
	circleButtons[1].width = circleWidth;
	
	var thirdTheme = select('#theme3');
	themeSize = thirdTheme.size();
	themePos = thirdTheme.position();
	circleButtons.push(new circle())
	circleButtons[2].x = themePos.x+themeSize.width/2
	circleButtons[2].y = themePos.y+themeSize.height/2;
	circleButtons[2].width = circleWidth;
	
	var fourTheme = select('#theme4');
	themeSize = fourTheme.size();
	themePos = fourTheme.position();
	circleButtons.push(new circle())
	circleButtons[3].x = themePos.x+themeSize.width/2
	circleButtons[3].y = themePos.y+themeSize.height/2;
	circleButtons[3].width = circleWidth;

}

function reset(){
		circles.length = 0;
		background(255);
}

function saveScreenShot() {
		saveCanvas();
}

function startDraw() {
  start_draw = 1;
	stop_draw = 0;
	writeColor(cp);
}

function stopDraw() {
  stop_draw = 1;
	start_draw = 0;
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

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function expand(operativeCircle) {
  if(operativeCircle.width < operativeCircle.max_width) {
        operativeCircle.width += map(operativeCircle.width, operativeCircle.max_width, 0, 1, 5);
  } else {
		//circles.splice(indexOf(operativeCircle,1));
	}
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
	for(var i=0; i<circles.length; i++) {
			circles[i].x = myCanvas.width/2;
			circles[i].y = myCanvas.height/2;
	}
	random_slider.size(select('#randomnessSlider').width-20)
	frequency_slider.size(select('#frequencySlider').width-20)
}

function switchToolState(){
	if(toolstate==1) {
		bigtheme.hide();
		toolstate=0;
		minButtonBox.style("left", "2%");
		minButton.elt.innerHTML = "Show";

	} else if(toolstate==0) {
		bigtheme.show()
		toolstate = 1;
		minButtonBox.style("left", "75%");
		minButton.elt.innerHTML = "Hide";
	}
}

function writeColor(colorToWrite) {
	pickedColor = hexToRgb(colorToWrite.color);
	rgb[0] = pickedColor.r;
	rgb[1] = pickedColor.g;
	rgb[2] = pickedColor.b;
}

function draw() {

	
	//draw circular buttons
	
	for(var h=0; h<circleButtons.length; h++) {
		circleButtons[h].sketch();
		
	}
	
	
  if(start_draw == 1) {
    
    if(stop_draw == 0) {
      colourshift();
    
      period = map(frequency_slider.value(), 1, 15, 15, 1);
      if(counter%period == 0) {
        circles.push(new circle());
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
			var d = int(dist(0, 0, windowWidth/2, windowHeight/2));
      for(var i=0; i<circles.length; i++) {
        expand(circles[i]);
				if(circles.length > 1 && i < circles.length-1 && circles[i].width<circles[i+1].width) { 
					circles.splice(i,1);
					expand(circles[i]);
				}
				if(circles[i].width/2>d) {
					circles.splice(i,1);
					expand(i)

				}
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


function circle() {
	
  this.width = 10;
  this.x = myCanvas.width/2;
  this.y = myCanvas.height/2;
  this.rgb_ = [0,0,0];
  this.max_width = max_width;

  this.sketch = function() {
    noStroke();
    fill(this.rgb_)
    ellipse(this.x, this.y, this.width, this.width);
  }

}