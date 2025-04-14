import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { PostService } from '../index';
import { postsActions } from './actions';

@Injectable({ providedIn: 'root' })

//Effect базово самый обыкновенный сервис

export class PostsEffects {

  postService = inject(PostService);
  actions$ = inject(Actions);

  fetchPosts = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(postsActions.fetchPosts),
        //Оператор ofType означает "что ему ловить", а ловить он будет ~profileActions.filterEvents~
        //Когда произойдет filterEvents, этот effect сработает. Тут мы можем делать асинхронные действия
        switchMap(() => {
          //Делаем запрос на бэк. Получаем поле filters из events
          return this.postService.fetchPosts();
          //И вернем то, что выше
        }),
        map(res => postsActions.postsLoaded({posts: res}))
        //Дальше мы превращаем результат в новый action.
        //Мы создаем в action 'profiles loaded' и передаем profiles ({ profiles: res.items })
      );
    }
  );

  createPost = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(postsActions.createPost),
        switchMap(({postDto}) => {
          return this.postService.createPost(postDto);
        }),
        map(() => {
          return postsActions.fetchPosts({})})
      );
    }
  );


  createComment = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(postsActions.createComment),
        switchMap(({commentDto}) => {
          return this.postService.createComment(commentDto);
        }),
        map(() => {
          return postsActions.fetchPosts({})})
      );
    }
  );

}
