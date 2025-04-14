import { createFeature, createReducer, on } from '@ngrx/store';
import { Profile } from '../index';
import { profileActions } from './actions';

// В reducer мы прописываем интерфейс, в котором будет являться наш Стор
export interface ProfileState {
  profiles: Profile[],
  profileFilters: Record<string, any>,
  saveFilters: Partial<{
    firstName: string | null,
    lastName: string | null,
    stack: string | null
  }>
}

// Прописываем начальное значение Стора до загрузки приложения
export const initialState: ProfileState = {
  profiles: [],
  profileFilters: {},
  saveFilters: {
    firstName: '',
    lastName: '',
    stack: ''
  }
};

// Это сам reducer, он хранится в некой feature
export const profileFeature = createFeature({
  name: 'profileFeature',
  //name должен быть уникальной строкой
  reducer: createReducer(
    //Сама функция reducer
    initialState,
    // Первый аргумент функции будет initialState
    on(profileActions.profilesLoaded, (state, {profiles}) => {
      //Все последующие аргументы в данной функции будут функции on()
      //В функцию on() передается событие с actions первым аргументом,
      //вторым аргументом передается колбэк функция, в которой пишем, что делать
      return {
        //Из функции reducer должны вернуть новые значения всего Стейта
        ...state,
        profiles
      };
    }),

    on(profileActions.saveResults, (state, {saveFilters}) => {
      return {
        ...state,
        saveFilters
      };
    })
  )
});
