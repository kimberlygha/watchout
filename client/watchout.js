var curScore = 0;
var highScore = 0;

var svg = d3.select('body').append('svg').attr('height', '500').attr('width', '500');

var makeEnemy = function(n){
  for (var i = 0; i < n; i++) {
    svg.append("circle")
    .attr('r', '20').attr('cx', Math.random()*500).attr('cy', Math.random()*500)
    .style('fill', 'grey');
  }
};

makeEnemy(10);

setInterval(function(){
  svg.selectAll("circle").transition().duration(500).attr('cx', function(){
    return Math.random()*500;
  }).attr('cy', function(){
    return Math.random()*500;
  });
}, 1500);

var drag = d3.behavior.drag().on('drag', function(){
  svg.select('rect').attr('x', d3.event.x).attr('y', d3.event.y);
  svg.selectAll('circle').each(checkCollision);
});

var makeHero = function(){
  svg.append("rect").attr('x', 250).attr('y', 250).attr('width', 30).attr('height', 30).style('fill', 'red')
  .attr('draggable', 'true').call(drag);
};

makeHero();

var checkCollision = function(){
  var radiusSum = 35;
  var xDiff = parseInt(d3.select(this).attr('cx')) - parseInt(svg.select('rect').attr('x'));
  var yDiff = parseInt(d3.select(this).attr('cy')) - parseInt(svg.select('rect').attr('y'));
  var distance = Math.sqrt(xDiff*xDiff + yDiff*yDiff);
  if (distance < radiusSum) {
    curScore = 0;
    console.log(curScore);
  }
};


