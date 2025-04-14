import { createSelector } from '@ngrx/store';
import { postFeature } from './reducer';

//Получаем profiles, которые загружены в reducer

export const selectPosts = createSelector(
  //По согласованию всегда начинается со слова select, дальше пишем то, что мы будем получать
  postFeature.selectPosts,
  //Первый аргумент функции, обращаемся к reducer и берем selectProfiles (Берет все профили)
  (posts) => {
    return posts;
  }
  //Второй аргумент. Пишем, что нужно делать с тем, что получили (Отдает все профили)
  //В селекторах можно что-то видоизменять. Добавить метод filter()
);


export const selectComments = createSelector(
  postFeature.selectComments,
  comments => comments
);
