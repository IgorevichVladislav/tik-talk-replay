import { Routes } from '@angular/router';
import { ProfilePageComponent, SearchPageComponent, SettingsPageComponent } from '@tt/profile';
import { LayoutComponent } from '@tt/layout';
import { chatsRoutes } from '@tt/chats';
import { canActivateAuth, LoginPageComponent } from '@tt/auth-service';
import { provideState } from '@ngrx/store';
import { profileFeature, ProfilesEffects } from '@tt/data-access/profile';
import { provideEffects } from '@ngrx/effects';
import { postFeature, PostsEffects } from '@tt/data-access/posts/store';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'profile/me', pathMatch: 'full' },
      {
        path: 'profile/:id', component: ProfilePageComponent,
        providers: [
          provideState(postFeature),
          provideEffects(PostsEffects)
        ]

      },
      { path: 'settings', component: SettingsPageComponent },
      {
        path: 'search',
        component: SearchPageComponent,
        providers: [
          provideState(profileFeature),
          provideEffects(ProfilesEffects)
        ]
      },
      {
        path: 'chats',
        loadChildren: () => chatsRoutes
      }
    ],
    canActivate: [canActivateAuth]
  },
  { path: 'login', component: LoginPageComponent }
];
