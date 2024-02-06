import { Injectable } from '@angular/core';
import { AppConfig } from './app-config';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class JsonAppConfigService  extends AppConfig{

  constructor(private http: HttpClient) {
    super();
   }

  // This function needs to return a promise
  load() {
    return this.http.get<AppConfig>('appsettings.json')
      .toPromise()
      .then(data => {
        this.APIBaseUrl = data?.APIBaseUrl;
        this.ReportBaseUrl = data?.ReportBaseUrl;
      })
      .catch(() => {
        console.error('Could not load configuration');
      });
  }
}
