import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler, HttpResponse } from "@angular/common/http";
import { Injectable} from "@angular/core";
import {Observable } from "rxjs";
import { finalize, map } from "rxjs/operators";
import { ApiService } from "../sercvices/api.service";

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
    constructor( private apiService:ApiService) {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.apiService.isLoading.next(true)
                    return next.handle(request).pipe(
                        map((event: HttpEvent<any>) => {
                            if (event instanceof HttpResponse) {
                            }
                            return event;
                        }),
                        finalize(() => this.apiService.isLoading.next(false))   
                    )
        }

}