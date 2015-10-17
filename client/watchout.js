var curScore = 0;
var highScore = 0;
var collisions = 0

var svg = d3.select('.board').append('svg').attr('height', 1000).attr('width', 1000);

var makeEnemy = function(n){
  for (var i = 0; i < n; i++) {
    svg.append("svg:image").attr("xlink:href", "assets/shuriken.png").attr('height', 30).attr('width', 30)
    .attr('x', Math.random()*1000).attr('y', Math.random()*1000);//.attr('transform','rotate(360)');
  }
};

makeEnemy(20);

setInterval(function(){
  svg.selectAll("image").transition().duration(1500).attr('transform','rotate(240)').attr('x', function(){
    return Math.random()*1000;
  }).attr('y', function(){
    return Math.random()*1000;
  });
}, 1500);

var drag = d3.behavior.drag().on('drag', function(){
  svg.select('rect').attr('x', Math.min(980, Math.max(d3.event.x, 0))).attr('y', Math.min(980, Math.max(d3.event.y, 0)));
});

var makeHero = function(){
  svg.append("rect").attr('x', 500).attr('y', 500).attr('width', 20).attr('height', 20).style('fill', 'red')
  .attr('draggable', 'true').call(drag);
};

makeHero();

var checkCollision = function(){
  var radiusSum = 35;
  var xDiff = parseInt(d3.select(this).attr('x')) - parseInt(svg.select('rect').attr('x'));
  var yDiff = parseInt(d3.select(this).attr('y')) - parseInt(svg.select('rect').attr('y'));
  var distance = Math.sqrt(xDiff*xDiff + yDiff*yDiff);
  if (distance < radiusSum) {
    if (curScore > highScore) {
      highScore = curScore;
      d3.select(".highscore").text('High score: ' + highScore);
    }
    curScore = 0;
    collisions++;
    d3.select(".collisions").text('Collisions: ' + collisions);
  }
};

var updateCurScore = function(){
  curScore += 1;
  d3.select(".current").text('Current Score: ' + curScore);
}

setInterval(updateCurScore, 100);

setInterval(function(){
  svg.selectAll('image').each(checkCollision);
}, 10);

// d3.selectAll('image').each(function(){
//   d3.select(this).transition().duration(100).attr("transform", "rotate(180)");
// },100);