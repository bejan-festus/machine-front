import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/sercvices/api.service';

@Component({
  selector: 'app-create-service',
  templateUrl: './create-service.component.html',
  styleUrls: ['./create-service.component.scss']
})
export class CreateServiceComponent implements OnDestroy {

  serviceForm:FormGroup
  submitted:boolean
  editForm:any

  constructor(private fb:FormBuilder, private apiService:ApiService, private dialogRef: MatDialogRef<CreateServiceComponent>){
    this.makeForm()
    this.apiService.serviceEditData.subscribe({
      next:(res)=>{
        this.editForm = res
        this.serviceForm.patchValue(
          {
            name: res.name,
            serviceType: res.serviceType,
            isActive: res.isActive
          }
        )
      }
    })
  }

  ngOnDestroy(): void {
    this.apiService.serviceEditData.next(null)
  }

  makeForm(){
    this.serviceForm = this.fb.group({
      name: ['', [Validators.required]],
      serviceType: ['', [Validators.required]],
      isActive: [false, [Validators.required]],
    });
  }

  get serviceFormControl() {
    return this.serviceForm.controls;
  }


  onSubmit(){
    if(this.serviceForm.valid){
      if(!this.editForm){
        this.apiService.CreateService(this.serviceForm.value).subscribe({
          next:(res)=>{
            this.dialogRef.close(true)
          },
          error:(err)=>{
            console.log(err);
          }
        })
      }else{
        this.apiService.editService(this.editForm.serviceId, this.serviceForm.value).subscribe({
          next:(res)=>{
            this.dialogRef.close(true)
          },
          error:(err)=>{
            console.log(err);
          }
        })
      }
    }else{
      this.submitted = true
    }
  }

  onClose(){
    this.dialogRef.close(false)
  }




    

}
