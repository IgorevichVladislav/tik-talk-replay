import { createSelector } from '@ngrx/store';
import { profileFeature } from './reducer';

//Получаем profiles, которые загружены в reducer

export const selectFilteredProfiles = createSelector(
  //По согласованию всегда начинается со слова select, дальше пишем то, что мы будем получать
  profileFeature.selectProfiles,
  //Первый аргумент функции, обращаемся к reducer и берем selectProfiles (Берет все профили)
  profiles => profiles
  //Второй аргумент. Пишем, что нужно делать с тем, что получили (Отдает все профили)
  //В селекторах можно что-то видоизменять. Добавить метод filter()
);
