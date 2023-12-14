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

  get(module: string, modfunction: string = "", modparam: string = "") {
    let site = this.apiSite();

    if (modfunction !== "") {
      modfunction = '/' + `${modfunction}`;
    }
    if (modparam !== "") {
      modparam = '/' + `${modparam}`;
    }

    let url = `${site}${module}${modfunction}${modparam}`;
    let options = this.getOptions();
    return this.http.get(url, options);
  }


  postData(body: any, module: string, modfunction: string = "", modparam: string = ""){
    let site = this.apiSite();

    if (modfunction !== "") {
      modfunction = '/' + `${modfunction}`;
    }
    if (modparam !== "") {
      modparam = '/' + `${modparam}`;
    }
    
    let url = `${site}${module}${modfunction}${modparam}`;
    let options = this.getOptions();
    options.headers = options.headers.set('Content-Type', 'application/json');

    return this.http.post(url, body, options);
  }



  async getDataAsync(module: string, modfunction: string = "", modparam: string = ""): Promise<any> {
    try {
      const response = await this.get(module, modfunction, modparam).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }



}
