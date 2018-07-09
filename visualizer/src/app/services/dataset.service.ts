import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class DatasetService {
  constructor(private httpClient: HttpClient) {}

  getEmbeddings(name: string = 'dlib'): Observable<any> {
    return this.httpClient.get(`assets/${name}.json`);
  }
}
