import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiceConfigurationComponent } from './service-configuration.component';

const routes: Routes = [
  {
    path: '',
    component:ServiceConfigurationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceConfigurationRoutingModule { }
