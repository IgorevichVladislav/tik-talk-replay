import {Component, inject, input} from '@angular/core';
import {SvgIconComponent} from "../svg-icon/svg-icon.component";
import {AsyncPipe, JsonPipe, NgForOf} from "@angular/common";
import {SubscriberCardComponent} from "./subscriber-card/subscriber-card.component";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {ProfileService} from "../../data/servises/profile.service";
import {firstValueFrom} from "rxjs";
import {ImgUrlPipe} from "../../helpers/pipes/img-url.pipe";
import {AvatarCircleComponent} from "../avatar-circle/avatar-circle.component";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    SvgIconComponent,
    NgForOf,
    SubscriberCardComponent,
    RouterLink,
    AsyncPipe,
    JsonPipe,
    ImgUrlPipe,
    RouterLinkActive,
    AvatarCircleComponent
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  profileService = inject(ProfileService);
  subscribers$ = this.profileService.getSubscribersShortList(3)

  me = this.profileService.me

  menuItems = [
    {
      label: 'Моя страница',
      icon: 'home',
      link: 'profile/me',
    },
    {
      label: 'Чаты',
      icon: 'chat',
      link: 'chats',
    },
    {
      label: 'Поиск',
      icon: 'search',
      link: 'search',
    }
  ]

  ngOnInit(): void {
    firstValueFrom(
      this.profileService.getMe()
    )
  }

}
