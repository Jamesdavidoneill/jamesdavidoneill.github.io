var data = {
      nodes: [
        {id: "A"},
        {id: "B"},
        {
          id: "C",
          height: 60,
          fill: {
               src: "http://www.mcicon.com/wp-content/uploads/2021/03/Airplane-13.jpg"
          },
        },
        {id: "D"},
        {id: "E"},
        {id: "Start",
          height: 60,
          fill: {
               src: "https://cdn-icons-png.flaticon.com/512/25/25694.png"
             },
          stroke: "0 #ff3300",
        },
        {id: "G"},
        {id: "H"}
      ],
      edges: [
        {from: "A", to: "B"},
        {from: "B", to: "D"},
        {from: "G",   to: "Start"},
        {from: "D",   to: "C"},
        {from: "A",    to: "C"},
        {from: "Start",    to: "E"},
        {from: "E",    to: "G"},
        {from: "B",   to: "G"},
        {from: "D",   to: "E"},
        {from: "G",   to: "H"},
        {from: "A",   to: "H"},
      ]
    };

var result_table = [
  [ "0", "0", "0"],
  [ "0", "0", "0"],
  [ "0", "0", "0"],
  [ "0", "0", "0"],
  [ "0", "0", "0"],
  [ "0", "0", "0"],
  [ "0", "0", "0"],
  [ "0", "0", "0"],
]
var display_result_table = function(){
  const table = document.getElementById("result_table")
  
  for (var i = 0; i < result_table.length; i++) {
    const row = table.getElementsByTagName("tr")[i+1]
    for (var j = 0; j < 3; j++){
      const td = row.getElementsByTagName("td")[j]
      td.innerHTML = result_table[i][j] 
    }
  }
}
var init_result_table = function(){
  result_table = [
    [ "Start", "0", "null"],
    [ "A", "Infinity", "null"],
    [ "B", "Infinity", "null"],
    [ "C", "Infinity", "null"],
    [ "D", "Infinity", "null"],
    [ "E", "Infinity", "null"],
    [ "F", "Infinity", "null"],
    [ "Airport", "Infinity", "null"],
  ]
}

var run_pathfinding = function(){
  chart.interactivity().nodes(false)
  dijkstra()
  chart.interactivity().nodes(true)
}
var dijkstra = function(){
  init_result_table()
  var graph = chart.toJson().chart.graphData
  display_result_table()
}
var dist = function(graph, v1, v2){
  var node1 = get_node(graph, v1)
  var node2 = get_node(graph, v2)

  return calc_dist(node1[0], node2[0])
}
var get_node = function(graph, name){
  const node = graph.nodes.filter(obj => {
    return obj.id === name
  })
  return node
}
var calc_dist = function(pos1, pos2){
  x1 = pos1.x
  y1 = pos1.y

  x2 = pos2.x
  y2 = pos2.y
  return Math.sqrt((x2 - x1)*(x2 - x1) + (y2 - y1)*(y2 - y1))
}

var chart
anychart.onDocumentReady( function () {
	// create a chart from the loaded data
	chart = anychart.graph(data);
  
  // no zoom
  chart.interactivity().zoomOnMouseWheel(false);

  //set group properties

  // set the fill of nodes in groups
  visited.normal().fill("#ffa000");
  visited.hovered().fill("white");
  visited.selected().fill("#ffa000");
  
  // draw the chart
  chart.container("container").draw();
})

document.getElementById('play_button').onclick = function() {
   run_pathfinding()
};