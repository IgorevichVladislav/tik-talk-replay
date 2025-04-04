import { Component, HostBinding, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AvatarCircleComponent, TimeAgoPipe } from '@tt/common-ui';
import { Message } from '@tt/data-access/chats';

@Component({
  selector: 'app-chat-workspace-message',
  imports: [AvatarCircleComponent, TimeAgoPipe, DatePipe],
  templateUrl: './chat-workspace-message.component.html',
  styleUrl: './chat-workspace-message.component.scss',
  standalone: true
})
export class ChatWorkspaceMessageComponent {
  message = input.required<Message>();

  @HostBinding('class.my-message')
  get myMessage() {
    return this.message().myMessage;
  }
}
