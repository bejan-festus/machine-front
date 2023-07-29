import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CreateServiceComponent } from './create-service/create-service.component';
import { ApiService } from '../sercvices/api.service';
import { Observable, Subject, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-service-configuration',
  templateUrl: './service-configuration.component.html',
  styleUrls: ['./service-configuration.component.scss']
})
export class ServiceConfigurationComponent {
  telcoName = new FormControl('');
  telcoType = new FormControl('');
  telcoActive = new FormControl('');
  limit = new FormControl(10);
  searchKey = new FormControl('');
  page = 0
  $searchKey = new Subject<any>
  $serviceData: Observable<any>
  $telcoNameList: Observable<any> = this.apiService.getTelcoNameList()
  $telcoTypeList: Observable<any> = this.apiService.getTelcoTypeList()
  limitArray = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]

  constructor(private dialog: MatDialog, private apiService: ApiService) {
    this.getAllServices()
    this.$searchKey.pipe(distinctUntilChanged(), debounceTime(1000)).subscribe(val => this.getAllServices())
  }


  openCreateModal() {
    const dialogRef = this.dialog.open(CreateServiceComponent);
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.$telcoNameList = this.apiService.getTelcoNameList()
        this.$telcoTypeList = this.apiService.getTelcoTypeList()
        this.getAllServices()
      }
    });
  }


  getAllServices() {
    if (this.searchKey.value) {
      let data = {
        searchKey: this.searchKey.value,
        page: this.page,
        limit: this.limit.value
      }

      this.$serviceData = this.apiService.getServiceBySearch(data)
    } else {
      let data = {
        name: null,
        serviceType: null,
        isActive: null,
        page: this.page,
        limit: this.limit.value
      }
      if (this.telcoName.value?.length) {
        data.name = this.telcoName.value
      }

      if (this.telcoType.value?.length) {
        data.serviceType = this.telcoType.value
      }

      if (this.telcoActive.value) {
        data.isActive = [this.telcoActive.value === 'true']
      }

      this.$serviceData = this.apiService.getServiceByFilter(data)
    }

  }


  onSearch(event) {
    this.$searchKey.next(event.target.value)
  }

  onEdit(editData) {
    this.apiService.serviceEditData.next(editData)
    this.openCreateModal()
  }

  onDelete(data) {
    this.apiService.deleteService(data.serviceId).subscribe({
      next: (res) => {
        this.$telcoNameList = this.apiService.getTelcoNameList()
        this.$telcoTypeList = this.apiService.getTelcoTypeList()
        this.getAllServices()
      },
      error: (err) => {
        console.log(err);

      }
    })
  }



}
