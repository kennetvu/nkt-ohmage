function lineChart(inData)
{

//var data = [3, 6, 2, 7, 5, 2, 0, 3, 8, 9, 2, 5, 9, 3, 6, 3, 6];
var rawData = inData.split(';');

var data = new Array();

for(var i = 1; i < rawData.length; i++) {
	var formatData = parseFloat(rawData[i]);
	data[i-1] = formatData;
}

var largest = Math.max.apply(null, data);
var smallest = Math.min.apply(null, data);

console.log(largest);
console.log(smallest);

var m = [80, 80, 80, 80]; // margins
var w = 1000 - m[1] - m[3]; // width
var h = 400 - m[0] - m[2]; // height

var x = d3.scale.linear().domain([0, data.length]).range([0, w]);

var y = d3.scale.linear().domain([smallest, largest]).range([h, 0]);

var line = d3.svg.line()
	.x(function(d,i) {
		return x(i);
	})
	.y(function(d) {
		return y(d);
	});

var graph = d3.select("#graph").append("svg:svg")
	.attr("width", w + m[1] + m[3])
	.attr("height", h + m[0] + m[2])
	.append("svg:g")
	.attr("transform", "translate(" + m[3] + "," + m[0] + ")");

var xAxis = d3.svg.axis().scale(x).tickSize(-h).tickSubdivide(true);

graph.append("svg:g")
	.attr("class", "x axis")
	.attr("transform", "translate(0," + h + ")")
	.call(xAxis)
	.append("text")
	.style("text-anchor", "end")
	.text("Time (ms)");

var yAxisLeft = d3.svg.axis().scale(y).ticks(15).orient("left");

graph.append("svg:g")
	.attr("class", "y axis")
	.call(yAxisLeft)
	.append("text")
	.attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
	.style("text-anchor", "end")
	.text("Force (N)");

graph.append("svg:path").attr("d", line(data));

/*var margin = {top: 20, right: 20, bottom: 30, left: 50},
	width = 960 - margin.left - margin.right,
	height = 500 - margin.top - margin.bottom;

var x = d3.scale.linear().range([0, width]);
var y = d3.scale.linear().range([height, 0]);

var xAxis = d3.svg.axis()
	.scale(x)
	.orient("bottom");

var yAxis = d3.svg.axis()
	.scale(y)
	.orient("left");

var line = d3.svg.line()
	.x(function(d,i) {
		return x(i);
	})
	.y(function(d) {
		return y(d.close);
	});

var svg = d3.select("#graph").append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("heigth", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

/*d3.tsv("d3test.tsv", function(error, data){
	var i = 0;
	data.forEach(function(d) {
		i = i + 1;
		jump = parseFloat(d.Jump);
	});
	x.domain(d3.extent(data, function(d) { return i; }));
	y.domain(d3.extent(data, function(d) { return d.jump; }));

	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis);

	svg.append("g")
		.attr("class", "y axis")
		.call(yAxis)
	.append("text")
		.attr("transform", "rotate(-90)")
     	.attr("y", 6)
     	.attr("dy", ".71em")
     	.style("text-anchor", "end")
     	.text("Power (N)");

     svg.append("path")
     	.datum(data)
     	.attr("class", "line")
     	.attr("d", line);

});*/
}

function getData(){
	var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", '/dataParsedPerfectly.txt', false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}