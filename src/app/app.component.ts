import { ChangeDetectorRef, Component } from '@angular/core';
import { ApiService } from './sercvices/api.service';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isLoading:boolean

  constructor(private apiService:ApiService, private cd:ChangeDetectorRef){
    this.apiService.isLoading.subscribe((e)=>{
      this.isLoading = e
      this.cd.detectChanges()
    })
  }
}
