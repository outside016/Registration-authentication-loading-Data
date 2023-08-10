import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

export interface Users {
  name: string
  lastname: string
  email: string
  password: string
  passwordCheck: string
  dateOfBirth: string
}

export interface Post {
  title: string
  body: string
  id?: number
  isEdit: any;
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {


  constructor(private http: HttpClient) {
  }


  addUser(user: {}): Observable<Users> {
    return this.http.post<Users>('https://jsonplaceholder.typicode.com/users', user)
  }

  fetchPosts(): Observable<Post[]> {
    return this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts')
  }

  addPost(post: {}): Observable<Post>{
    return this.http.post<Post>('https://jsonplaceholder.typicode.com/posts', post)
  }

  remotePost(id:number | undefined): Observable<void>{
    return this.http.delete<void>(`https://jsonplaceholder.typicode.com/posts/${id}`)
  }

  putPost(title: string, body:string, id: number | undefined): Observable<any>{
    return this.http.put<any>(`https://jsonplaceholder.typicode.com/posts/${id}`, {title,body,id})
}

}
