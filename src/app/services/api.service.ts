import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  postAccount(data : any){
    return this.http.post<any>("http://localhost:3000/accountList/",data);
  }
  getAccount(){
    return this.http.get<any>("http://localhost:3000/accountList/");
  }
  putAccount(data : any, id : number){
    return this.http.put<any>("http://localhost:3000/accountList/"+id, data);
  }
  deleteAccount(id:number){
    return this.http.delete<any>("http://localhost:3000/accountList/"+id);
  }
}
