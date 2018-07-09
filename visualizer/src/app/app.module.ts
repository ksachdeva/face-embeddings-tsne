import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {GraphComponent} from './graph/graph.component';
import {DatasetService} from './services/dataset.service';
import {TSNEService} from './services/tsne.service';

@NgModule({
  declarations: [AppComponent, GraphComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [DatasetService, TSNEService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
