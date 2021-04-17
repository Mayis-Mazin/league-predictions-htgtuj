import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { PredictionComponent } from './prediction/prediction.component';
import { TeamComponent } from './team/team.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, DragDropModule ],
  declarations: [ AppComponent, HelloComponent, PredictionComponent, TeamComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
