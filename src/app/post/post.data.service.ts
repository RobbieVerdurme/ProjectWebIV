import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject, of } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Post } from "./post.model";

@Injectable({
  providedIn: "root"
})
export class PostDataService {
  //var
  public loadingError$ = new Subject<string>();

  //construtor
  constructor(private http: HttpClient) {}

//methods
  updatePost(post: Post) {
    return this.http.put(`${environment.apiUrl}/Posts/${post.id}`, post.toJSON())
  }

  //getters
  get posts$(): Observable<Post[]> {
    return this.http.get(`${environment.apiUrl}/Posts/`).pipe(
      catchError(error => {
        this.loadingError$.next(error.statusText);
        return of();
      }),
      map((list: any[]): Post[] => list.map(Post.fromJSON)
    ));
  }

  getPost$(id: string): Observable<Post> {
    return this.http.get(`${environment.apiUrl}/Posts/${id}`).pipe(
      catchError(error => {
        this.loadingError$.next(error.statusText);
        return of();
      }),
      map((p: any): Post => Post.fromJSON(p))
    );
  }

  //setter
  addNewPost(p: Post) {
    return this.http.post(`${environment.apiUrl}/Posts/`, p.toJSON());
  }
}
