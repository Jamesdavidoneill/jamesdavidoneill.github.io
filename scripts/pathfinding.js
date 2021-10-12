var data = {
      nodes: [
        {id: "Richard"},
        {id: "Larry"},
        {id: "Marta"},
        {id: "Jane"},
        {id: "Norma"},
        {id: "Frank"},
        {id: "Brett"},
        {id: "Tommy"}
      ],
      edges: [
        {from: "Richard", to: "Larry"},
        {from: "Richard", to: "Marta"},
        {from: "Larry",   to: "Marta"},
        {from: "Marta",   to: "Jane"},
        {from: "Jane",    to: "Norma"},
        {from: "Jane",    to: "Frank"},
        {from: "Jane",    to: "Brett"},
        {from: "Brett",   to: "Frank"}
      ]
    };

anychart.onDocumentReady( function () {
	// create a chart from the loaded data
	var chart = anychart.graph(data);

	// set the title
	chart.title("Network Graph Demonstrating dijstra's algorithm");
	
	// set zoom controls
	var zoomController = anychart.ui.zoom();
	zoomController.target(chart);
	zoomController.render();

	// draw the chart
	chart.container("container").draw();
})