import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeRoutingModule } from './home/home-routing.module';
import { ResultRoutingModule } from './result/result-routing.module';
import { PageNotFoundComponent } from './shared/components';

const resultModule = () => import('./result/result.module').then(x => x.ResultModule);


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  // { path: 'result', loadChildren: resultModule },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    HomeRoutingModule,
    ResultRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
