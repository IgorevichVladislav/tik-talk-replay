import { createActionGroup, props } from '@ngrx/store';
import { CommentCreateDto, Post, PostComment, PostCreateDto } from '../index';


export const postsActions = createActionGroup({
  source: 'posts',
  //source должна быть уникальной строкой
  events: {
    //Создаем события в actions
    'create post': props<{ postDto: PostCreateDto }>(), //Создание поста
    'fetch posts': props<{ postId?: number }>(), //Вывод постов после создания
    'posts loaded': props<{ posts: Post[] }>(), //Вывод всех постов

    'create comment': props<{ commentDto: CommentCreateDto }>(), //Создание комментария
    'fetch comments': props<{ commentId?: number }>(), //Получение и отображение созданного комментариев
    'comments loaded': props<{ comments: PostComment[] }>() //Вывод всех комментариев
  }
});
