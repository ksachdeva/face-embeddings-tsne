import {Component, ElementRef, Input, OnChanges, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GraphComponent implements OnInit, OnChanges {
  @ViewChild('tsne') private chartContainer: ElementRef;
  @Input() private data: Array<any>;

  private chart: any;

  constructor() {}

  ngOnInit() {
    if (this.data) {
      this.createChart();
    }
  }

  ngOnChanges() {
    if (this.chart) {
      this.createChart();
    }
  }

  createChart() {
    const margin: any = {top: 20, right: 15, bottom: 60, left: 60};

    const element = this.chartContainer.nativeElement;
    const width = 800 - margin.left - margin.right;
    const height = 800 - margin.top - margin.bottom;

    const x = d3.scaleLinear().domain([0, 1]).range([0, width]);
    const y = d3.scaleLinear().domain([0, 1]).range([height, 0]);

    const chart = d3.select('body')
                      .append('svg')
                      .attr('width', width + margin.right + margin.left)
                      .attr('height', height + margin.top + margin.bottom)
                      .attr('class', 'chart');

    const main = chart.append('g')
                     .attr(
                         'transform',
                         'translate(' + margin.left + ',' + margin.top + ')')
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
        .data(this.data)
        .enter()
        .append('svg:circle')
        .attr('cx', (d) => x(d[0]))
        .attr('cy', (d) => y(d[1]))
        .attr('stroke-width', 0.25)
        .attr('stroke', '#1f77b4')
        .attr('fill', 'none')
        .attr('r', 5);
  }
}
