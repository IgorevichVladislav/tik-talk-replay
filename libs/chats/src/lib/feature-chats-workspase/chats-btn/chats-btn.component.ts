import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AvatarCircleComponent, SvgIconComponent } from '@tt/common-ui';
import { LastMessageRes } from '@tt/data-access/chats';

@Component({
  selector: 'button[chats]',
  imports: [AvatarCircleComponent, SvgIconComponent, DatePipe],
  templateUrl: './chats-btn.component.html',
  styleUrl: './chats-btn.component.scss',
  standalone: true
})
export class ChatsBtnComponent {
  chat = input<LastMessageRes>();
}
