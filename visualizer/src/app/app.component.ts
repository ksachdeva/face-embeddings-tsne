import {Component, Input, OnInit} from '@angular/core';

import APP_CONFIG from './app.config';
import {TSNEService} from './services/tsne.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  private graphData: Array<any>;

  @Input() private isGenerating: boolean;
  private tsneIterations = 1000;
  private knnIterations = 800;
  private perplexity = 18;

  constructor(private tsneService: TSNEService) {
    this.isGenerating = false;
  }

  ngOnInit() {}

  async generateData() {
    this.isGenerating = true;
    this.graphData = undefined;
    this.graphData = await this.tsneService.computeCoordinates(
        this.perplexity, this.knnIterations, this.tsneIterations);
    this.isGenerating = false;
  }

  onGenerate() {
    this.generateData();
  }
}
