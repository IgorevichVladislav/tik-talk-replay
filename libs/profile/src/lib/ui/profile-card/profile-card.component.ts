import { Component, inject, Input } from '@angular/core';
import { ImgUrlPipe, SvgIconComponent } from '@tt/common-ui';
import { Profile } from '@tt/data-access/profile';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-card',
  imports: [ImgUrlPipe, SvgIconComponent],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss',
  standalone: true
})
export class ProfileCardComponent {
  router = inject(Router)

  @Input() profile!: Profile;

  async sendMessage(userId: number) {
    this.router.navigate(['/chats', 'new'], { queryParams: { userId } });
  }
}
