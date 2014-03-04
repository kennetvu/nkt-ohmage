/*These lines are all chart setup.  Pick and choose which chart features you want to utilize. */
nv.addGraph(function() {
  var chart = nv.models.lineChart()
                .margin({left: 100})  //Adjust chart margins to give the x-axis some breathing room.
                .useInteractiveGuideline(true)  //We want nice looking tooltips and a guideline!
                .transitionDuration(350)  //how fast do you want the lines to transition?
                .showLegend(true)       //Show the legend, allowing users to turn on/off line series.
                .showYAxis(true)        //Show the y-axis
                .showXAxis(true)        //Show the x-axis
  ;
 
  chart.xAxis     //Chart x-axis settings
      .axisLabel('Millisekunder (ms)')
      .tickFormat(d3.format(',r'));
 
  chart.yAxis     //Chart y-axis settings
      .axisLabel('Power (N)')
      .tickFormat(d3.format('.02f'));
 
  /* Done setting the chart up? Time to render it!*/
  var myData = parseData(getData());   //You need data...
 
  d3.select('#chart svg')    //Select the <svg> element you want to render the chart in.   
      .datum(myData)         //Populate the <svg> element with chart data...
      .call(chart);          //Finally, render the chart!
 
  //Update the chart when window resizes.
  nv.utils.windowResize(function() { chart.update() });
  return chart;
});


function parseData(inData){
  var rawData = inData.split(';');
  rawData.shift();
  var data = [];

  for (var i = 0; i < rawData.length; i++) {
    data.push({x: i, y: parseFloat(rawData[i])});
  }

  return [
    {
      values: data,
      key: 'Jumping',
      color: '#ff7f0e'
    }
  ]
}


function getData(){
  var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", '/dataParsedPerfectly.txt', false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}