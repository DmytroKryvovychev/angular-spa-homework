import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Message } from "./message";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

constructor(private httpClient: HttpClient) { }

baseUrl: string = "http://localhost:44444/api/values/"

get(): Observable<Message[]>{
  return this.httpClient.get<Message[]>(this.baseUrl);
}

set(msg: string): Observable<Message>{
  return this.httpClient.post<Message>(this.baseUrl, {"msg":msg});
}

delete(id: number): Observable<{}> {
  return  this.httpClient.delete(this.baseUrl + id);
}

change(id: number, msg: string): Observable<Message>{
  return this.httpClient.put<Message>(this.baseUrl + id, {"msg":msg});
}

}
