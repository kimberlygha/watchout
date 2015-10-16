var svg = d3.select('body').append('svg').attr('height', '500').attr('width', '500');

var makeEnemy = function(n){
  for (var i = 0; i < n; i++) {
    svg.append("circle")
    .attr('r', '20').attr('cx', Math.random()*500).attr('cy', Math.random()*500)
    .style('fill', 'grey');
  }
}

makeEnemy(10);

setInterval(function(){
  svg.selectAll("circle").transition().duration(500).attr('cx', function(){
    return Math.random()*500;
  }).attr('cy', function(){
    return Math.random()*500;
  });
}, 1500)

var drag = function(){ 
  d3.behavior.drag()
  console.log("drag");
}

d3.select('rect').on('.drag', drag);

var makeHero = function(){
  svg.append("rect").attr('x', 250).attr('y', 250).attr('width', 30).attr('height', 30).style('fill', 'red')
  .attr('draggable', 'true');
}

makeHero();
