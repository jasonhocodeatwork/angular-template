import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, throwError } from "rxjs";
import { map, catchError, tap } from "rxjs/operators";
import { Post } from './post.model';

@Injectable({providedIn: 'root'})
export class PostsService {
    error = new Subject<string>()

    constructor(private http: HttpClient) {}

    // posts.service.ts
    fetchPosts() {
        let searchParams = new HttpParams();
        searchParams = searchParams.append('allow', 'Y');
        searchParams = searchParams.append('info', 'bill')
        
        // return an observable
        return this.http.get<{[key: string]: Post}>(
          'https://gmail-20210505-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json',
          {
            headers: new HttpHeaders({"custom-header": "Hello"}),
            // params: new HttpParams().set('allow','Y')
            params: searchParams,
            responseType: 'json'
          })
        .pipe(map(
          // reforming {{key1: {}}, {key2: {}}} into [{}, {}]
          res => {
            console.log(res);
            
            const psotsArr: Post[] = [];
            for (const key in res) {
              if (res.hasOwnProperty(key)) {
                psotsArr.push({...res[key], id: key}) // pushing whole new object (...) with id
              }
            }
            return psotsArr;
          }
        ), catchError(errorRes => {
          //return observable error part
          return throwError(errorRes)
        })
        )
    }

    saveAndUpdate(postData: Post) {
    // Send Http request
    this.http.post<{name: string}>(
        'https://gmail-20210505-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json', 
        postData,
        {
          observe: 'response'
        }
      ).subscribe(res => {
        console.log(res);
      }, err => {
        this.error.next(err.message)
      })
    }

    deleteposts() {
        // return observable
        return this.http.delete(
            'https://gmail-20210505-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json',
            {
              observe: 'events',
              responseType: 'text'
            }
        ).pipe(
          tap(event => {
            // tap: allow to do logic in this block without altering the observable
            console.log(event);
            if (event.type === HttpEventType.Sent) {
              // ...
            }            
            if (event.type === HttpEventType.Response) {
              console.log(event.body);
            }
          })
        )
    }


}