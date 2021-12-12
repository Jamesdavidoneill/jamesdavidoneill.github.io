var nodesData = [
  {id: "A"},
  {id: "B"},
  {
    id: "Airport",
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
  {id: "C"},
  {id: "F"}
]
var edgesData = [
  {from: "A",        to: "B"},
  {from: "B",        to: "D"},
  {from: "C",        to: "Start"},
  {from: "D",        to: "Airport"},
  {from: "A",        to: "Airport"},
  {from: "Start",    to: "E"},
  {from: "E",        to: "C"},
  {from: "B",        to: "C"},
  {from: "D",        to: "E"},
  {from: "C",        to: "F"},
  {from: "A",        to: "F"},
]

var result_table = {
  "Start":{"dist": "0", "previous":"null"},
  "A":{"dist": "Infinity", "previous":"null"},
  "B":{"dist": "Infinity", "previous":"null"},
  "C":{"dist": "Infinity", "previous":"null"},
  "D":{"dist": "Infinity", "previous":"null"},
  "E":{"dist": "Infinity", "previous":"null"},
  "F":{"dist": "Infinity", "previous":"null"},
  "Airport":{"dist": "Infinity", "previous":"null"},
}
var display_result_table = function(){
  const table = document.getElementById("result_table")
  i = 0
  for (const [key, value] of Object.entries(result_table)) {
    row = table.getElementsByTagName("tr")[i + 1]
    var td = row.getElementsByTagName("td")[0]
    td.innerHTML = key
    var td = row.getElementsByTagName("td")[1]
    if(value.dist == "Infinity") {td.innerHTML = value.dist} else {td.innerHTML = Math.trunc(Number(value.dist))}
    var td = row.getElementsByTagName("td")[2]
    td.innerHTML = value.previous
    i++
  }
}
var init_result_table = function(){
  result_table = {
    "Start":{"dist": "0", "previous":"null"},
    "A":{"dist": "Infinity", "previous":"null"},
    "B":{"dist": "Infinity", "previous":"null"},
    "C":{"dist": "Infinity", "previous":"null"},
    "D":{"dist": "Infinity", "previous":"null"},
    "E":{"dist": "Infinity", "previous":"null"},
    "F":{"dist": "Infinity", "previous":"null"},
    "Airport":{"dist": "Infinity", "previous":"null"},
  }
}
var init_node_colours = function(){
  id_list = []
  for(index in nodesData){
    id_list.push(nodesData[index].id)
  }
  for(var i = 0; i<id_list.length; i++){
    if(id_list[i] != "Start" && id_list[i] != "Airport"){
        set_node(id_list[i], '#6abae6', '#1a496b', '10')
    }
    for(var j = 0; j<id_list.length; j++){
      set_edge(id_list[i], id_list[j], "2 #6abae6")
    }
  }
    
}

var run_pathfinding = function(){
  chart.interactivity().nodes(false)
  dijkstra()
  chart.interactivity().nodes(true)
}
var dijkstra = function(){
  init_result_table()
  var graphData = chart.toJson().chart.graphData
  graph = genGraph(graphData)
  findShortestPath(graph)
  
  chart.container("container").draw();
  display_result_table()
}
var dist = function(graphData, v1, v2){
  var node1 = get_node(graphData, v1)
  var node2 = get_node(graphData, v2)

  return calc_dist(node1[0], node2[0])
}
var get_node = function(graphData, name){
  const node = graphData.nodes.filter(obj => {
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
var set_node = function(id, fill, stroke, height){
  var mapping = nodes.mapAs()
  var index = mapping.find("id", id)
  mapping.set(index, 'fill', fill)
  mapping.set(index, 'stroke', stroke)
  mapping.set(index, 'height', height)
}
var set_edge = function(from, to, stroke){
  var mapping = edges.mapAs()
  index = -1
  for (i = 0; i < 11; i++){
    if (mapping.get(i, "from") == from){
      if( mapping.get(i, "to") == to){
        index = i
        break
      }
    } 
  }
  mapping.set(index, "stroke", stroke)
}

var chart
anychart.onDocumentReady( function () {
	// create a chart from the loaded data
  chart = anychart.graph();

  nodes = anychart.data.set(nodesData)
  edges = anychart.data.set(edgesData)
  data = {
    nodes: nodes,
    edges: edges
  }
  chart.data(data)

  // no zoom
  chart.interactivity().zoomOnMouseWheel(false);

  // enable labels of nodes
  chart.nodes().labels().enabled(true)
  chart.nodes().labels().fontSize(12);
  chart.nodes().labels().fontWeight(600)

  // set display of nodes
  chart.nodes().normal().fill("#6abae6");
  chart.nodes().normal().stroke("#1a496b");
  
  // draw the chart
  chart.container("container").draw();
})

document.getElementById('play_button').onclick = function() {
   run_pathfinding()
};
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
const genGraph = function(graphData){
  let graph = {}
  for (let node in nodesData) {
    id = nodesData[node].id
    graph[id] = getConnectedNodes(graphData, id)
  }
  return graph
}
const getConnectedNodes = function(graphData, id){
  result = {}
  for(i = 0; i < edgesData.length; i++){
    if(edgesData[i]['from'] == id){
      result[edgesData[i]['to']] = dist(graphData, id, edgesData[i]['to'])
    }
    if(edgesData[i]['to'] == id){
      result[edgesData[i]['from']] = dist(graphData, edgesData[i]['from'], id)
    }
  }
  return result
}
const shortestDistanceNode = (visited) => {
  let shortest = null;

  for (let node in result_table) {
    let currentIsShortest =
      shortest === null || result_table[node]['dist'] < result_table[shortest]['dist'];
    if (currentIsShortest && !visited.includes(node)) {
      shortest = node;
    }
  }
  return shortest;
};

const findShortestPath = async function(graph) {
  // establish object for recording distances from the start node
  init_result_table()
  init_node_colours()
  await sleep(200)

  // track nodes that have already been visited
  let visited = [];

  // find the nearest node
  let node = shortestDistanceNode(visited);

  // for that node
  while (node) {
    // find its distance from the start node & its child nodes
    let distance = result_table[node]['dist'];

    let children = graph[node];
    // for each of those child nodes
    for (let child in children) {
      // make sure each child node is not the start node
      if (String(child) === "Start") {
        continue;
      } else {
        // save the distance from the start node to the child node
        let newdistance = Number(distance) + Number(children[child]);
        // if there's no recorded distance from the start node to the child node in the distances object
        // or if the recorded distance is shorter than the previously stored distance from the start node to the child node
        // save the distance to the object
        // record the path
        if (!result_table[child]['dist'] || result_table[child]['dist'] > newdistance) {
          result_table[child]['dist'] = newdistance;
          result_table[child]['previous'] = node;
        }
      }
    }
    // move the node to the visited set
    visited.push(node);
    await sleep(200)
    if( node != 'Start' && node != "Airport"){
      set_node(node, '#eb5534', '#871903', '15')  
    }
    display_result_table()
    
    // move to the nearest neighbor node
    node = shortestDistanceNode(visited);
  }

  

  stroke = {
   color: "#eb5534",
   thickness: "4",
   lineJoin: "round"
  }
  // using the stored paths from start node to end node
  // record the shortest path
  let current = 'Airport'
  let previous = result_table['Airport']['previous'];
  while (previous != 'null') {
    await sleep(200)
    set_edge(current, previous, stroke)
    set_edge(previous, current, stroke)
    current = previous
    if(previous != 'null'){previous = result_table[previous]['previous']}
  }
};