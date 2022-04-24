import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileCheckGuard } from '../guards/file-check.guard';
import { ResultComponent } from './result.component';

const routes: Routes = [
  {
    path: '',
    component: ResultComponent
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResultRoutingModule { }
