import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ResultRoutingModule } from './result-routing.module';
import { ResultComponent } from './result.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [ResultComponent],
  imports: [CommonModule, SharedModule, ResultRoutingModule, MatProgressSpinnerModule]
})
export class ResultModule { }
