import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UiComponentsModule } from '../components/ui.module';
import { SharedModule } from '../shared/shared.module';
import { ResultRoutingModule } from './result-routing.module';
import { ResultComponent } from './result.component';


@NgModule({
  declarations: [ResultComponent],
  imports: [
    CommonModule,
    SharedModule,
    ResultRoutingModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    MatListModule,
    MatTooltipModule,
    UiComponentsModule,
    MatToolbarModule
  ],
})
export class ResultModule { }
