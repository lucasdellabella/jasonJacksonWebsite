$(document).ready(function () {

    // Init WebAudio API vars
    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    var audioElement = document.getElementById('audioElement');
    var audioSrc = audioCtx.createMediaElementSource(audioElement);
    var analyser = audioCtx.createAnalyser();

    audioSrc.connect(analyser);
    audioSrc.connect(audioCtx.destination);

    var frequencyData = new Uint8Array(301);

    // Set up SVG state
    var SVG_HEIGHT = 1000;
    var SVG_WIDTH = 1000;

    var CIRCLE_RADIUS = 50;
    var CIRCLE_SHIFT = 200;

    function createSvg(parent, height, width) {
        return d3.select(parent)
                 .append('svg')
                 .attr('height', height)
                 .attr('width', width);
    }

    var graph = createSvg('#graph', SVG_HEIGHT, SVG_WIDTH);

    var angleShift = 0;
    var ANGLE_SHIFT_SPEED = 0.5
    setInterval(function() { angleShift++; }, 25);

    var radialLine = d3.radialLine()
        .radius(function(d) { return CIRCLE_RADIUS + 10 + d / 1.5; })
        .angle((function() {
            var count = 0;
            return function(d) { 
                return (ANGLE_SHIFT_SPEED * angleShift + count++) / frequencyData.length * Math.PI * 2; 
            }
        })());

    function renderGraph() {
        requestAnimationFrame(renderGraph);

        // Load freq data into array
        analyser.getByteFrequencyData(frequencyData);

        frequencyData[frequencyData.length - 1] = frequencyData[0];

        // Update d3 chart
        graph.selectAll('path')
            .data([frequencyData])
            .attr('d', radialLine)
            .attr('stroke', 'white')
            .attr('stroke-width', 3)
            .attr('fill', 'rgba(0,0,0,0)')
            .attr('transform', 'translate(' + CIRCLE_SHIFT
                        + ',' + CIRCLE_SHIFT + ')');
    }

    graph.append('path')
        .data([frequencyData])
        .attr('d', radialLine)
        .attr('stroke', 'white')
        .attr('stroke-width', 3)
        .attr('fill', 'rgba(0,0,0,0)')
        .attr('transform', 'translate(' + CIRCLE_SHIFT
                    + ',' + CIRCLE_SHIFT + ')');

    graph.append('circle')
        .attr('cx', CIRCLE_SHIFT
        .attr('cy', CIRCLE_SHIFT
        .attr('r',  50)
        .style('fill', 'white');

    audioElement.play();
    renderGraph();
})
