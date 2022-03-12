import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { UiComponentsModule } from '../components/ui.module';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';



@NgModule({
  declarations: [HomeComponent, ],
  imports: [CommonModule, SharedModule, HomeRoutingModule, UiComponentsModule,MatButtonModule]
})
export class HomeModule { }
