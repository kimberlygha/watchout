var curScore = 0;
var highScore = 0;
var collisions = 0
var hero; 
var snitch;

var svg = d3.select('.board').append('svg').attr('height', 1000).attr('width', 1000);

var makeEnemy = function(n){
  for (var i = 0; i < n; i++) {
    var defs = svg.append("svg").attr('x', Math.random()*1000).attr('y', Math.random()*1000).attr('height', 30).attr('width', 30);
    defs.append("svg:image").attr("xlink:href", "assets/buldger.png").attr('height', 30).attr('width', 30);
    // svg.append("svg:image").attr("xlink:href", "assets/shuriken.png").attr('height', 30).attr('width', 30)
    // .attr('x', Math.random()*1000).attr('y', Math.random()*1000).attr('transform','rotate(360)');
  }
};

makeEnemy(15);

setInterval(function(){
  svg.selectAll("svg").transition().duration(1500).attr('x', function(){
    return Math.random()*1000;
  }).attr('y', function(){
    return Math.random()*1000;
  });
}, 1500);

// var drag = d3.behavior.drag().on('drag', function(){
//   svg.select('rect').attr('x', Math.min(980, Math.max(d3.event.x, 0))).attr('y', Math.min(980, Math.max(d3.event.y, 0)));
// });
 d3.select('body').on('keydown', function(){
  var x = hero.attr('x');
  var y = hero.attr('y');
  if (event.keyCode === 65) {
    hero.attr('x', Math.max(x - 15, 0));
  }
  if(event.keyCode === 87 ){
    hero.attr('y', Math.max(y - 15, 0));
  }
  if(event.keyCode === 68){
    hero.attr('x', Math.min(parseInt(x) + 15, 950)); 
  }
  if(event.keyCode === 83){
    hero.attr('y', Math.min(parseInt(y) + 15, 950));
  }
});

var makeHero = function(){
  hero = svg.append("svg:image").attr("xlink:href", "assets/harry.png").attr('x', 500).attr('y', 500).attr('width', 50).attr('height', 50);
  // .attr('draggable', 'true');
};

makeHero();

var makeSnitch = function(){
  snitch = svg.append("svg:image").attr("xlink:href", "assets/snitch.png").attr('x', 0).attr('y', 0).attr('width', 40).attr('height', 40); 
}

makeSnitch();

setInterval(function(){
  snitch.transition().duration(1000).attr('x', Math.random()*1000).attr('y', Math.random()*1000);
}, 1000)

var checkCollision = function(n, cb){
  var radiusSum =n;
  var xDiff = parseInt(d3.select(this).attr('x')) - parseInt(hero.attr('x'));
  var yDiff = parseInt(d3.select(this).attr('y')) - parseInt(hero.attr('y'));
  var distance = Math.sqrt(xDiff*xDiff + yDiff*yDiff);
  if (distance < radiusSum) {
    cb();
  }
};

var buldgerCB = function() {
  hero.transition().duration(50).attr('opacity', 0.3).transition().duration(50).attr('opacity', 1).transition().duration(50).attr('opacity', 0.3).transition().duration(50).attr('opacity', 1);
  if (curScore > highScore) {
    highScore = curScore;
    d3.select(".highscore").text('High score: ' + highScore);
  }
  curScore = 0;
  collisions++;
  d3.select(".collisions").text('Collisions: ' + collisions);
};

var snitchCB = function() {
  updateCurScore(1000);
}

var updateCurScore = function(n){
  curScore += n;
  d3.select(".current").text('Current Score: ' + curScore);
};

setInterval(function(){
  updateCurScore(1);
}, 100);

// setInterval(function(){
//   svg.selectAll('image').each(function(){
//     var x = d3.select(this).attr('x');
//     var y = d3.select(this).attr('y');
//     d3.select(this).transition().duration(1000).attr('transform', 'rotate(180)').attr('-webkit-transform-origin', x-15+' '+y-15 );
//   });
// }, 1000)

setInterval(function(){
  svg.selectAll('svg').each(function(){
    checkCollision.call(this, 40, buldgerCB);
  });
  snitch.each(function(){
    checkCollision.call(this, 45, snitchCB);
  });
}, 60);
// d3.selectAll('image').each(function(){
//   d3.select(this).transition().duration(100).attr("transform", "rotate(180)");
// },100);