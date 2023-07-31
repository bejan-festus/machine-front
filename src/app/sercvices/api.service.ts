import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  serviceEditData = new BehaviorSubject(null)
  isLoading = new Subject<boolean>();
  


  public CreateService(data:any): Observable<any> {
    return this.http.post(environment.apiUrl + 'service', data);
  }

  public deleteService(id:string): Observable<any> {
    return this.http.delete(environment.apiUrl + 'service/' + id);
  }

  public editService(id:string, data:any): Observable<any> {
    return this.http.put(environment.apiUrl + 'service/' + id, data);
  }

  public getService(data:any): Observable<any> {
    return this.http.get(`${environment.apiUrl}service?page=${data.page}&limit=${data.limit}`);
  }

  public getServiceByFilter(data:any): Observable<any> {
    return this.http.post(`${environment.apiUrl}service/getServiceByFilter`, data);
  }

  public getServiceBySearch(data:any): Observable<any> {
    return this.http.post(`${environment.apiUrl}service/getServiceBySearch`, data);
  }

  public getTelcoNameList(): Observable<any> {
    return this.http.get(`${environment.apiUrl}service/getTelcoNameList`);
  }

  public getTelcoTypeList(): Observable<any> {
    return this.http.get(`${environment.apiUrl}service/getTelcoTypeList`);
  }

}
