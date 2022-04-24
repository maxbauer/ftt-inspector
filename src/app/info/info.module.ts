import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../shared/shared.module';
import { InfoRoutingModule } from './info-routing.module';
import { InfoComponent } from './info.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [InfoComponent,],
  imports: [CommonModule, SharedModule, InfoRoutingModule, MatButtonModule, MatToolbarModule, MatIconModule]
})
export class InfoModule { }
