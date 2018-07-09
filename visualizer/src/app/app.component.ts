import {Component, OnInit} from '@angular/core';

import APP_CONFIG from './app.config';
import {TSNEService} from './services/tsne.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  private graphData: Array<any>;

  constructor(private tsneService: TSNEService) {}

  ngOnInit() {}

  async generateData() {
    this.graphData = await this.tsneService.computeCoordinates();
  }

  onGenerate() {
    this.generateData();
  }
}
