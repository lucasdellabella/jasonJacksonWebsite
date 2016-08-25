var sampleData = [12, 19, 8, 17, 22, 9, 15, 12, 22, 25, 17, 12, 25, 16];

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
    graph.selectAll('rect')
        .data(sampleData)
        .enter()
        .append('rect')
        .attr('width', svgWidth / sampleData.length - barPadding)
        .attr('height', function(d) {
            return d * 4;
        })
        .attr('x', function(d, index) {
            return index * (svgWidth / sampleData.length);
        })
        // Keeps bars aligned to bottom of div
        .attr('y', function(d) {
            return svgHeight - (d * 4);
        })
})

