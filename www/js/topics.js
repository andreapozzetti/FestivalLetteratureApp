
var nodes = [], node, links = [], links2 = [], link, svg;
var linkedByIndex = {};

function getDataTopicsChart(topicsChartJSON, topicsChart){

  nodes = [];
  links = [];
  links2 = [];

  d3.json(topicsChartJSON, function(json) {

    for (var i=0; i<json.nodes.length;i++){
    
      if(json.nodes[i].group < 5){

      nodes.push(json.nodes[i]);

      for (var j=0; j<json.links.length;j++){
        if (json.links[j].source == json.nodes[i].id){
          links.push(json.links[j]);
        }
      }
      for (var k=0; k<json.links.length;k++){
        if (json.links[k].target == json.nodes[i].id){
          links2.push(json.links[k]);
        }
      }

      }

    }

    drawNetwork(nodes, links2);

  })

}

function drawNetwork(nodes, links) {

var svg;

d3.selectAll(".topicChart").remove();

//var fill = d3.scale.category20().domain(d3.range(30));
var fill = ["#cccccc", "#8f8f8f", "#7de864", "#f9e2e6", "#fcd554"];

var margin = {top: 10, left: 10, bottom: 10, right: 10},
    width = parseInt(d3.select('#topicsChart').style('width')),
    width = width - margin.left - margin.right,
    mapRatio = .8,
    height = width * mapRatio;

svg = d3.select("#topicsChart").append("svg")
        .attr("class", "topicChart")
        .attr("width", width+"px")
        .attr("height", height+"px");

svg.selectAll(".link").remove();
svg.selectAll(".node").remove();

var force = d3.layout.force()
    .nodes(nodes)
    .links(links)
    .size([width, height])
    .linkDistance( function(d) { if(d.value > 10 ) { return d.value*15; } else if(d.value > 5 ) { return d.value*25; } else if(d.value > 1 ) { return d.value*30; } else if(d.value > 0.5 ) { return d.value*180; } else if(d.value > 0.2 ) { return d.value*60; } else { return d.value*50; } } )
    .charge(-300)
    .gravity(0.09)
    .on("tick", tick)
    .start();

link = svg.selectAll(".link")
    .data(links)
    .enter().append("line")
    .attr("class", "link");

node = svg.selectAll(".node")
    .data(nodes)
    .enter().append("g")
    .attr("class", "node")
    .call(force.drag)
    .on("mouseover", fade(.1))
    .on("mouseout", fade(1));

node.append("circle")
    .attr("r", function (d) {
      switch(true) {
        case (d.value > 200):
            return 24
          break;
        case (d.value > 150):
            return 20
          break;
        case (d.value > 100):
            return 18 
          break;
        case (d.value > 50):
            return 16
          break;
        case (d.value > 15):
            return 14
          break;
        case (d.value < 15):
            return d.value
          break;
        case (d.value < 8):
            return d.value*2
        break;
      }

      })
    .style("fill", function (d) { return fill[d.group]; })

node.append("text")
    .style("fill", "#f23789" )
    .text(function(d) { return d.label; });

linkedByIndex = {};

links.forEach(function(d) {
    linkedByIndex[d.source.index + "," + d.target.index] = 1;
});

}

function tick() {
  link
      .attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

  node
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
}

function isConnected(a, b) {
    return linkedByIndex[a.index + "," + b.index] || linkedByIndex[b.index + "," + a.index] || a.index == b.index;
}

function fade(opacity) {
    return function(d) {
      node.style("stroke-opacity", function(o) {
          thisOpacity = isConnected(d, o) ? 1 : opacity;
          this.setAttribute('fill-opacity', thisOpacity);
            return thisOpacity;
      });

      link.style("stroke-opacity", function(o) {
            return o.source === d || o.target === d ? 1 : opacity;
      });
   };
}
