var sampleData = [12, 19, 8, 17, 22, 9, 15, 12, 22, 25, 17, 12, 25, 16, 12, 19, 8, 17, 22, 9, 15, 12, 22, 25, 17, 12, 25, 16];
//var sampleData = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
var mockData = [];
function renderGraph() {
    requestAnimationFrame(renderGraph);

    // Load freq data into array

}

$(document).ready(function () {
    var svgHeight = 300;
    var svgWidth = 600;
    var barPadding = 1;

    for (var i = 0; i < 100; i++) {
        mockData.push(Math.random() * 10 + 65);
    }

    function createSvg(parent, height, width) {
        return d3.select(parent)
                 .append('svg')
                 .attr('height', height)
                 .attr('width', width);
    }

    var graph = createSvg('#graph', svgHeight, svgWidth);

    var count = 0;
    var radialLine = d3.radialLine()
        .radius(function(d) { return d; })
        .angle(function(d) { return count++/mockData.length * Math.PI * 2; });

    var circleRad = 50;
    var circleShift = 200;

    graph.append('path')
        .data([mockData])
        .attr('d', radialLine)
        .attr('stroke', 'red')
        .attr('stroke-width', 1)
        .attr('fill', 'rgba(0,0,0,0')
        .attr('transform', 'translate(' + circleShift
                    + ',' + circleShift + ')');

    graph.append('circle')
        .attr('cx', circleShift)
        .attr('cy', circleShift)
        .attr('r',  50)
        .style('fill', 'white');
})
