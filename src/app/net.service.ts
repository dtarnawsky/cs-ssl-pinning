import { Injectable } from '@angular/core';
import { HTTP, HTTPResponse } from '@awesome-cordova-plugins/http/ngx';
import { Monarch } from './models';

@Injectable({
  providedIn: 'root'
})
export class NetService {

  constructor(private http: HTTP) {    
  }

  public async setSSLPinning(enabled: boolean) {    
    this.http.setDataSerializer('json');
    await this.http.setServerTrustMode(enabled ? 'pinned' : 'nocheck');
    console.log(`SSLPinning is ${enabled ? 'enabled': 'disabled'}`)
  }

  public async checkSSLPinning(): Promise<string | undefined> {
    try {
      const monarchs = await this.getMonarchs();
      console.log(monarchs);
      return;
    } catch (error: any) {
      console.error(error);
      if (error.status == this.http.ErrorCode.SSL_EXCEPTION) {
        return 'The server failed the SSL check';
      }
      return 'Error occurred trying to access server';
    }
  }

  public async checkSSLPinningGoogle(): Promise<string | undefined> {
    try {
      const response = await this.http.get('https://www.google.com', {}, {});
      console.log(response);
      return;
    } catch (error: any) {
      console.error(error);
      if (error.status == this.http.ErrorCode.SSL_EXCEPTION) {
        return 'The server failed the SSL check';
      }
      return 'Error occurred trying to access server';
    }
  }

  public async getMonarchs(): Promise<Array<Monarch>> {
    const response = await this.http.get('https://mysafeinfo.com/api/data?list=englishmonarchs&format=json', {}, {});
    return response.data;
  }

}
