import {
    FaceEmbeddingData
} from './data';

import * as tsne from '@tensorflow/tfjs-tsne';
import * as d3 from 'd3';

async function start() {
    const data = FaceEmbeddingData.load();
    const coordinates = await computeEmbedding(data, data.length);
    showEmbedding(coordinates);
}

async function computeEmbedding(data, numPoints) {
    const embedder = tsne.tsne(data, {
        perplexity: 18,
        verbose: true,
        knnMode: 'auto',
    });

    // This will run the TSNE computation for 1000 steps.
    // Note that this may take a while.
    await embedder.compute(1000);

    // Get the normalized coordinates of the data
    return await embedder.coordsArray();
}

function showEmbedding(data) {
    const margin = {
        top: 20,
        right: 15,
        bottom: 60,
        left: 60
    };
    const width = 800 - margin.left - margin.right;
    const height = 800 - margin.top - margin.bottom;

    const x = d3.scaleLinear().domain([0, 1]).range([0, width]);
    const y = d3.scaleLinear().domain([0, 1]).range([height, 0]);

    const chart = d3.select('body')
        .append('svg')
        .attr('width', width + margin.right + margin.left)
        .attr('height', height + margin.top + margin.bottom)
        .attr('class', 'chart');

    const main =
        chart.append('g')
        .attr(
            'transform', 'translate(' + margin.left + ',' + margin.top + ')')
        .attr('width', width)
        .attr('height', height)
        .attr('class', 'main');

    const xAxis = d3.axisBottom(x);
    main.append('g')
        .attr('transform', 'translate(0,' + height + ')')
        .attr('class', 'main axis date')
        .call(xAxis);

    const yAxis = d3.axisLeft(y);
    main.append('g')
        .attr('transform', 'translate(0,0)')
        .attr('class', 'main axis date')
        .call(yAxis);

    const dots = main.append('g');

    dots.selectAll('scatter-dots')
        .data(data)
        .enter()
        .append('svg:circle')
        .attr('cx', (d) => x(d[0]))
        .attr('cy', (d) => y(d[1]))
        .attr('stroke-width', 0.25)
        .attr('stroke', '#1f77b4')
        .attr('fill', 'none')
        .attr('r', 5);
}

function testData() {
    const data = FaceEmbeddingData.load();
    console.log(data);
}

document.addEventListener('DOMContentLoaded', () => start());