import { Component, inject, signal } from '@angular/core';

import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterOutlet
} from '@angular/router';
import { switchMap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { ImgUrlPipe, SvgIconComponent } from '@tt/common-ui';
import { ProfileHeaderComponent } from '../../ui';
import { PostFeedComponent } from '@tt/posts';
import { ProfileService } from '@tt/data-access/profile';
import { Store } from '@ngrx/store';
import { postsActions, selectPosts } from '@tt/data-access/posts/store';

@Component({
  selector: 'app-profile-page',
  imports: [
    ProfileHeaderComponent,
    RouterOutlet,
    AsyncPipe,
    RouterLink,
    SvgIconComponent,
    ImgUrlPipe,
    PostFeedComponent
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
  standalone: true
})
export class ProfilePageComponent  {
  profileService = inject(ProfileService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  me$ = toObservable(this.profileService.me);
  subscribers$ = this.profileService.getSubscribersShortList(6);

  // store = inject(Store);

  isMyPage = signal(false);

  // posts = this.store.selectSignal(selectPosts);

  profile$ = this.route.params.pipe(
    switchMap(({ id }) => {
      this.isMyPage.set(id === 'me' || id === this.profileService.me()?.id);
      return id === 'me' ? this.me$ : this.profileService.getAccount(id);
    })
  );

  async sendMessage(userId: number) {
    this.router.navigate(['/chats', 'new'], { queryParams: { userId } });
  }

  // ngOnInit() {
  //   this.store.dispatch(postsActions.fetchPosts())
  // }
}
