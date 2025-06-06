import { Component, input } from '@angular/core';
import { AvatarCircleComponent, ImgUrlPipe } from '@tt/common-ui';
import { Profile } from '@tt/data-access/profile';

@Component({
  selector: 'app-profile-header',
  imports: [ImgUrlPipe, AvatarCircleComponent],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.scss',
  standalone: true
})
export class ProfileHeaderComponent {
  profile = input<Profile>();
}
