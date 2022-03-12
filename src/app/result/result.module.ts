import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ResultRoutingModule } from './result-routing.module';
import { ResultComponent } from './result.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ResultComponent],
  imports: [CommonModule, SharedModule, ResultRoutingModule, MatProgressSpinnerModule, MatGridListModule, MatInputModule, MatIconModule, MatButtonModule]
})
export class ResultModule { }
