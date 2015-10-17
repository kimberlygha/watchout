var curScore = 0;
var highScore = 0;
var collisions = 0

var svg = d3.select('.board').append('svg').attr('height', '1000px').attr('width', '1000px');

var makeEnemy = function(n){
  for (var i = 0; i < n; i++) {
    svg.append("circle")
    .attr('r', '15').attr('cx', Math.random()*1000).attr('cy', Math.random()*1000)
    .style('fill', 'grey');
  }
};

makeEnemy(20);

setInterval(function(){
  svg.selectAll("circle").transition().duration(1500).attr('cx', function(){
    return Math.random()*1000;
  }).attr('cy', function(){
    return Math.random()*1000;
  });
}, 1500);

var drag = d3.behavior.drag().on('drag', function(){
  svg.select('rect').attr('x', Math.min(980, Math.max(d3.event.x, 0))+'px').attr('y', Math.min(980, Math.max(d3.event.y, 0))+'px');
});

var makeHero = function(){
  svg.append("rect").attr('x', 500).attr('y', 500).attr('width', 20).attr('height', 20).style('fill', 'red')
  .attr('draggable', 'true').call(drag);
};

makeHero();

var checkCollision = function(){
  var radiusSum = 35;
  var xDiff = parseInt(d3.select(this).attr('cx')) - parseInt(svg.select('rect').attr('x'));
  var yDiff = parseInt(d3.select(this).attr('cy')) - parseInt(svg.select('rect').attr('y'));
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
  svg.selectAll('circle').each(checkCollision);
}, 10);