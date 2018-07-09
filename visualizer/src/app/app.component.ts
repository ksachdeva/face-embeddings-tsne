import {Component, Input, OnInit} from '@angular/core';

import APP_CONFIG from './app.config';
import {TSNEService} from './services/tsne.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  graphData: Array<any>;
  labels: Array<any>;

  @Input() isGenerating: boolean;
  tsneIterations = 1000;
  knnIterations = 800;
  perplexity = 18;

  constructor(private tsneService: TSNEService) {
    this.isGenerating = false;
  }

  ngOnInit() {}

  async generateData() {
    this.isGenerating = true;
    this.graphData = undefined;
    this.labels = undefined;
    [this.graphData, this.labels] = await this.tsneService.computeCoordinates(
        this.perplexity, this.knnIterations, this.tsneIterations);
    this.isGenerating = false;
  }

  onGenerate() {
    this.generateData();
  }
}
