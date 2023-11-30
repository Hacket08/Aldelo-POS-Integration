import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http'; 
import { SwalService } from '../_services/swal-service';
import { Constants } from '../_config/constant';
import { AppConfig } from 'src/_config/app-config';


@Injectable({
    providedIn: 'root'
})
  
export class ApiHttpService { 
constructor( private http: HttpClient, public swalService: SwalService, private appConfig: AppConfig ) { } 

    public get(url: string, options?: any) { 
        console.log(url);
        return this.http.get(url, options); 
    } 
    public post(url: string, params: any, options?: any) { 
        return this.http.post(url, params, options);
    } 
    public put(url: string, params: any, options?: any) { 
        return this.http.put(url, params, options);
    } 
    public delete(url: string, options?: any) { 
        return this.http.delete(url, options); 
    } 

    public putAuth(url: any = '', body: any) {
        const user = JSON.parse(localStorage.getItem('userData'));
        return this.http.put<any>(url, body, {
            headers: {
                Accept: 'text/plain',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + user.accessToken
            },
        });
    }

    public postAuth(url: any = '', body: any) {
        console.log("headerdata", body);
        const user = JSON.parse(localStorage.getItem('userData'));
        return this.http.post<any>(url, body, {
            headers: {
                Accept: 'text/plain',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + user.accessToken
            }
        });
    }
    
    public getAuth(url: string) { 
        const user = JSON.parse(localStorage.getItem('userData'));
        return this.http.get<any>(url, {
            headers: {
                Accept: 'text/plain',
                Authorization: 'Bearer ' + user.accessToken
            }
        });
    } 


    public getData(url: any = '') {
        return this.http.get<any>(url, );
    }
    public getAPI(module: string = '') {
        // return Constants.API_ENDPOINT + "api/" + module;
        return this.appConfig.APIBaseUrl + "api/" + module;
    }
}