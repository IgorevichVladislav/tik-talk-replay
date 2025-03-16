import { Component, input } from '@angular/core';
import { AvatarCircleComponent, SvgIconComponent } from '@tt/common-ui';
import { Profile } from '@tt/data-access/profile';

@Component({
  selector: 'app-chat-workspace-header',
  standalone: true,
  imports: [AvatarCircleComponent, SvgIconComponent],
  templateUrl: './chat-workspace-header.component.html',
  styleUrl: './chat-workspace-header.component.scss',
})
export class ChatWorkspaceHeaderComponent {
  profile = input.required<Profile>();
}
