import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SharedModule } from '../shared/shared.module';
import { ResultRoutingModule } from './result-routing.module';
import { ResultComponent } from './result.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
@NgModule({
  declarations: [ResultComponent],
  imports: [CommonModule, SharedModule, ResultRoutingModule,
    MatProgressSpinnerModule, MatGridListModule, MatInputModule,
    MatIconModule, MatButtonModule, MatProgressBarModule],
})
export class ResultModule { }
