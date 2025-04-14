import { createFeature, createReducer, on } from '@ngrx/store';
import { Post } from '../index';
import { postsActions } from './actions';
import { PostComment } from '../index';

export interface PostState {
  posts: Post[],
  comments: PostComment[]
}

export const initialState: PostState = {
  posts: [],
  comments: []
};

export const postFeature = createFeature({
  name: 'postFeature',
  reducer: createReducer(
    initialState,
    on(postsActions.postsLoaded, (state, {posts}) => {
      return {
        ...state,
        posts
      };
    })
  )
});









