$(document).ready(function () {

    // Init WebAudio API vars
    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    var audioElement = document.getElementById('audioElement');
    var audioSrc = audioCtx.createMediaElementSource(audioElement);
    var analyser = audioCtx.createAnalyser();

    audioSrc.connect(analyser);
    audioSrc.connect(audioCtx.destination);

    var frequencyData = new Uint8Array(200);

    // Set up SVG state
    var svgHeight = 1000;
    var svgWidth = 1000;
    var barPadding = 1;

    var circleRad = 50;
    var circleShift = 200;

    function createSvg(parent, height, width) {
        return d3.select(parent)
                 .append('svg')
                 .attr('height', height)
                 .attr('width', width);
    }

    var graph = createSvg('#graph', svgHeight, svgWidth);

    var radialLine = d3.radialLine()
        .radius(function(d) { return circleRad + 10 + d / 1.5; })
        .angle((function() {
            var count = 0;
            return function(d) { 
                return count++ / frequencyData.length * Math.PI * 2; 
            }
        })());

    function renderGraph() {
        requestAnimationFrame(renderGraph);

        // Load freq data into array
        analyser.getByteFrequencyData(frequencyData);

        // Update d3 chart
        graph.selectAll('path')
            .data([frequencyData])
            .attr('d', radialLine)
            .attr('stroke', 'white')
            .attr('stroke-width', 3)
            .attr('fill', 'rgba(0,0,0,0)')
            .attr('transform', 'translate(' + circleShift
                        + ',' + circleShift + ')');
    }

    graph.append('path')
        .data([frequencyData])
        .attr('d', radialLine)
        .attr('stroke', 'white')
        .attr('stroke-width', 3)
        .attr('fill', 'rgba(0,0,0,0)')
        .attr('transform', 'translate(' + circleShift
                    + ',' + circleShift + ')');

    graph.append('circle')
        .attr('cx', circleShift)
        .attr('cy', circleShift)
        .attr('r',  50)
        .style('fill', 'white');

    audioElement.play();
    renderGraph();
})
