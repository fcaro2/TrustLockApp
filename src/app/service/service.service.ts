import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers } from '@angular/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiRest } from 'src/assets/urlBase';
@Injectable({
  providedIn: 'root'
})


export class ServiceService {
  private api = ApiRest;
  private urlDevices = "https://api.myjson.com/bins/tr55g";
  private urlFireBase = "https://fcm.googleapis.com/fcm/send";
  private key = 'key=AAAAinp7QUY:APA91bGZITnW9LAbwPOxXdhPu1r7AiWPYRXMFDc_iklxESMrjWv6yGFI5zsP8xgiNLwupWVjyzVjPIkgYiCxeUY57AeaDLN0SbmymICwduJW4BivUqhYtxwZiyGs5o2S2b_IoX8m6YbF';
  private header = new HttpHeaders(
    {
      'Content-Type': 'application/json',
      'Authorization': this.key
    }
  );
  constructor(private _http: HttpClient) { }
  blockDevice(body: any): Observable<any> {
    let headers = this.header;
    return this._http.post(this.urlFireBase, body, { headers: headers });
  }
  unBlockDevice(body: any): Observable<any> {
    let headers = this.header;
    return this._http.post(this.urlFireBase, body, { headers: headers });
  }

  getAllDevices(): Observable<any> {
    return this._http.get(this.api.end_point_host.url_base + this.api.methods.get_users);
  }

  getAllDevicesJson(): Observable<any> {
    return this._http.get(this.urlDevices);
  }
}

