import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe, JsonPipe, NgForOf } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { SubscriberCardComponent } from './subscriber-card/subscriber-card.component';
import { AvatarCircleComponent, ImgUrlPipe, SvgIconComponent } from '@tt/common-ui';
import { ProfileService } from '@tt/data-access/profile';

@Component({
    selector: 'app-sidebar',
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
export class SidebarComponent  implements OnInit{
  profileService = inject(ProfileService);
  subscribers$ = this.profileService.getSubscribersShortList(3);

  me = this.profileService.me;

  menuItems = [
    {
      label: 'Моя страница',
      icon: 'home',
      link: 'profile/me'
    },
    {
      label: 'Чаты',
      icon: 'chat',
      link: 'chats'
    },
    {
      label: 'Поиск',
      icon: 'search',
      link: 'search'
    }
  ];

  ngOnInit(): void {
    firstValueFrom(this.profileService.getMe());
  }
}
