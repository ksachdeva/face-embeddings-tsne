import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule, MatCardModule, MatSliderModule} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {GraphComponent} from './graph/graph.component';
import {DatasetService} from './services/dataset.service';
import {TSNEService} from './services/tsne.service';

@NgModule({
  declarations: [AppComponent, GraphComponent],
  imports: [
    BrowserModule, HttpClientModule, BrowserAnimationsModule, MatButtonModule,
    MatCardModule, MatSliderModule, FormsModule
  ],
  providers: [DatasetService, TSNEService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
