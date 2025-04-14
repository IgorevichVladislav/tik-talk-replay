import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map} from 'rxjs';
import { CommentCreateDto, Post, PostComment, PostCreateDto } from '../../../index';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  baseApiUrl = 'https://icherniakov.ru/yt-course/';
  #http = inject(HttpClient);

  createPost(payload: PostCreateDto) {
    return this.#http.post<Post>(`${this.baseApiUrl}post/`, payload)
  }

  fetchPosts() {
    return this.#http.get<Post[]>(`${this.baseApiUrl}post/`)
  }

  createComment(payload: CommentCreateDto) {
    return this.#http.post<PostComment>(`${this.baseApiUrl}comment/`, payload);
  }

  // getCommentsByPostId(postId: number | undefined) {
  //   return this.#http
  //     .get<Post>(`${this.baseApiUrl}post/${postId}`)
  //     .pipe(map((res) => res.comments));
  // }
}
