import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfig } from 'src/_config/app-config';

@Injectable({
  providedIn: 'root'
})
export class GlobalApiService {

  constructor(private http: HttpClient,
    private appConfig: AppConfig) { }


  private getOptions(): any {
    let user = JSON.parse(localStorage.getItem('userData'));
    console.log(user);

    return {
      headers: new HttpHeaders({
        Accept: 'text/plain',
        Authorization: 'Bearer ' + user.accessToken
      })
    }
  }
  private apiSite() {
    // return Constants.API_ENDPOINT + "api/" + module;
    return this.appConfig.APIBaseUrl + "api/";
  }

  getData(module: string, modfunction: string = "", modparam: string = "") {
    let site = this.apiSite();

    if (modfunction !== "") {
      modfunction = '/' + `${modfunction}`;
    }
    if (modparam !== "") {
      modparam = '/' + `${modparam}`;
    }
    let url = `${site}${module}${modfunction}${modparam}`;
    let options = this.getOptions();

    console.log(url);
    return this.http.get(url, options);
  }

}
