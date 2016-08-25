var sampleData = [12, 19, 8, 17, 22, 9, 15, 12, 22, 25, 17, 12, 25, 16, 12, 19, 8, 17, 22, 9, 15, 12, 22, 25, 17, 12, 25, 16];
//var sampleData = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

function renderGraph() {
    requestAnimationFrame(renderGraph);

    // Load freq data into array

}

$(document).ready(function () {
    var svgHeight = 100;
    var svgWidth = 600;
    var barPadding = 1;

    function createSvg(parent, height, width) {
        return d3.select(parent)
                 .append('svg')
                 .attr('height', height)
                 .attr('width', width);
    }

    var graph = createSvg('#graph', svgHeight, svgWidth);

    var radialLine = d3.radialLine()
        .radius(function(d) { return d; })
        .angle(Math.PI/4);

    var circleRad = 50;
    var circleShift = 50;

    graph.append('circle')
        .attr('cx', 50)
        .attr('cy', 50)
        .attr('r',  50)
        .style('fill', 'white');

    graph.append('path')
        .datum(sampleData)
        .attr('d', radialLine)
        .attr('stroke', 'red')
        .attr('stroke-width', 3)
        .attr('fill', 'green')
        .attr('transform', 'translate(' + circleShift/2
                    + ',' + circleShift/2 + ')');
})

