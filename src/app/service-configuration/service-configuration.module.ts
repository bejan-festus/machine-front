import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceConfigurationRoutingModule } from './service-configuration-routing.module';
import { ServiceConfigurationComponent } from './service-configuration.component';
import {MatSelectModule} from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatGridListModule} from '@angular/material/grid-list';
import { CreateServiceComponent } from './create-service/create-service.component';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    ServiceConfigurationComponent,
    CreateServiceComponent
  ],
  imports: [
    CommonModule,
    ServiceConfigurationRoutingModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatCardModule,
    MatTableModule,
    MatGridListModule,
    MatDialogModule
  ]
})
export class ServiceConfigurationModule { }
