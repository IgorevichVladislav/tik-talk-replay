import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { ProfileService } from '../index';
import { profileActions } from './actions';

@Injectable({ providedIn: 'root' })

//Effect базово самый обыкновенный сервис

export class ProfilesEffects {

  profileService = inject(ProfileService);
  actions$ = inject(Actions);

  filterProfiles = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(profileActions.filterEvents),
        //Оператор ofType означает "что ему ловить", а ловить он будет ~profileActions.filterEvents~
        //Когда произойдет filterEvents, этот effect сработает. Тут мы можем делать асинхронные действия
        switchMap(({ filters }) => {
          //Делаем запрос на бэк. Получаем поле filters из events
          return this.profileService.filterProfiles(filters);
          //И вернем то, что выше
        }),
        map(res => profileActions.profilesLoaded({ profiles: res.items }))
        //Дальше мы превращаем результат в новый action.
        //Мы создаем в action 'profiles loaded' и передаем profiles ({ profiles: res.items })
      );
    }
  );
}
