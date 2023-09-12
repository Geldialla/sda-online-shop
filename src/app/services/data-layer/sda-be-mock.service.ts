import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Observable } from 'rxjs';

@Injectable()
export class SdaHttpClient<T> {
    constructor(private dbService: NgxIndexedDBService) { }

    post(url: string, data: T): Observable<T> {
        return this.dbService.add(url, data);
    }

    put(url: string, id: number, data: T): Observable<T> {
        (data as any)['id'] = id;
        return this.dbService.update(url, data);
      }

    getAll(url: string): Observable<Array<T>> {
        return this.dbService.getAll(url);
    }

    getById(url: string, id: number): Observable<T> {
        return this.dbService.getByID(url, id);
    }

    delete(url: string, id: number): Observable<boolean> {
        return this.dbService.deleteByKey(url, id);
    }
}

