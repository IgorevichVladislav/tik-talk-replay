import { createActionGroup, props } from '@ngrx/store';
import { Profile } from '../index';

export const profileActions = createActionGroup({
  source: 'profile',
  //source должна быть уникальной строкой
  events: {
    //Создаем событие в actions
    'filter events': props<{ filters: Record<string, any> }>(),
    'profiles loaded': props<{ profiles: Profile[] }>(),
    'save results': props<{
      saveFilters: Partial<{
        firstName: string | null;
        lastName: string | null;
        stack: string | null;
      }>
    }>()
  }
});
