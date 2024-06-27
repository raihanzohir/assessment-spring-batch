import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TestPageModel } from '../model/test-page-model';

@Injectable({
  providedIn: 'root'
})
export class TestPageService {

  constructor(private httpClient: HttpClient) { }

  private baseUrl = 'http://10.11.201.214:9090/api/v1/transactions';

  getDataList(): Observable<any>{
      return this.httpClient.get<any>(`${this.baseUrl}`);
  }

  getSearchList(parameter: string): Observable<any>{
    return this.httpClient.get<any>(`${this.baseUrl}/search?${parameter}`);
  }

  getListByPagination(page: number, size:number): Observable<object>{
      return this.httpClient.get<any>(`${this.baseUrl}?page=${page}&size=${size}`);
  }

  updateEntry(recordId: number, reqDto: any): Observable<any>{
      return this.httpClient.patch<any>(`${this.baseUrl}/update/${recordId}`, reqDto);
  }
    
}
