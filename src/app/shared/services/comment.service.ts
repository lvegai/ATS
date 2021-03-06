import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(public http:HttpClient) { }

  routePrefix = 'Comment'

  getCommentsByApplicationId(id){
    return this.http.get(environment.baseUrl + this.routePrefix + '/CommentShowAll/' + id)
  }

  insertComment(comment) {
    return this.http.post(environment.baseUrl + this.routePrefix + '/ApplicationCommentInsertFromWeb/', comment)
  }







}
