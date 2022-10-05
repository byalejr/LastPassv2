import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
interface Usuario {

  accountCard: string,
  emailCard: string,
  id: number,
  passCard: string
  urlCard: string,
};



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url = environment.url

  constructor(private http: HttpClient) { }

 
  postAccount(data: any) {
    return this.http.post<any>("http://localhost:3000/accountList/", data);
  }
  getAccount() {
    return this.http.get<any>("http://localhost:3000/accountList/");
  }
  putAccount(data: any, id: number) {
    return this.http.put<any>("http://localhost:3000/accountList/" + id, data);
  }
  deleteAccount(id: number) {
    return this.http.delete<any>("http://localhost:3000/accountList/" + id);
  }


}
