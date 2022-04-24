import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileCheckGuard } from './guards/file-check.guard';
import { HomeRoutingModule } from './home/home-routing.module';
import { InfoRoutingModule } from './info/info-routing.module';
import { ResultRoutingModule } from './result/result-routing.module';

const homeModule = () => import('./home/home.module').then(x => x.HomeModule);
const resultModule = () => import('./result/result.module').then(x => x.ResultModule);
const infoModule = () => import('./info/info.module').then(x => x.InfoModule);

const routes: Routes = [
  {
    path: '',
    loadChildren: homeModule,
    pathMatch: 'full'
  },
  { path: 'result', loadChildren: resultModule, canActivate: [FileCheckGuard] },
  { path: 'info', loadChildren: infoModule },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    HomeRoutingModule,
    ResultRoutingModule,
    InfoRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
