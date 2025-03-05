import {Component, inject, signal} from '@angular/core';
import {ProfileHeaderComponent} from "../../common-ui/profile-header/profile-header.component";
import {ActivatedRoute, Router, RouterLink, RouterOutlet} from "@angular/router";
import {ProfileService} from "../../data/servises/profile.service";
import {firstValueFrom, switchMap} from "rxjs";
import {toObservable} from "@angular/core/rxjs-interop";
import {AsyncPipe, NgForOf} from "@angular/common";
import {SvgIconComponent} from "../../common-ui/svg-icon/svg-icon.component";
import {SubscriberCardComponent} from "../../common-ui/sidebar/subscriber-card/subscriber-card.component";
import {ImgUrlPipe} from "../../helpers/pipes/img-url.pipe";
import {PostFeedComponent} from "./post-feed/post-feed.component";
import {ChatService} from "../../data/servises/chats.service";

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    ProfileHeaderComponent,
    RouterOutlet,
    AsyncPipe,
    RouterLink,
    SvgIconComponent,
    NgForOf,
    SubscriberCardComponent,
    ImgUrlPipe,
    PostFeedComponent
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent {

  profileService = inject(ProfileService)
  route = inject(ActivatedRoute)
  router = inject(Router)
  chatsService = inject(ChatService);
  me$ = toObservable(this.profileService.me);
  subscribers$ = this.profileService.getSubscribersShortList(6)

  isMyPage = signal(false)

  profile$ = this.route.params.pipe(
    switchMap(({id}) => {
      this.isMyPage.set(id === 'me' || id === this.profileService.me()?.id);
      return (id === 'me') ? this.me$ : this.profileService.getAccount(id)
    })
  )

  async sendMessage(userId: number) {
    firstValueFrom(this.chatsService.createChat(userId)).then((res) => {
      this.router.navigate(['/chats', res.id])
    })
  }
}
