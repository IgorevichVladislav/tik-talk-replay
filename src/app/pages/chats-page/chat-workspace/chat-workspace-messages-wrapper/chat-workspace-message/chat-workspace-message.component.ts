import {Component, HostBinding, input} from '@angular/core';
import {Message} from "../../../../../data/interfaces/chats.interface";
import {AvatarCircleComponent} from "../../../../../common-ui/avatar-circle/avatar-circle.component";
import {TimeAgoPipe} from "../../../../../helpers/pipes/time-ago.pipe";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-chat-workspace-message',
  standalone: true,
  imports: [
    AvatarCircleComponent,
    TimeAgoPipe,
    DatePipe
  ],
  templateUrl: './chat-workspace-message.component.html',
  styleUrl: './chat-workspace-message.component.scss'
})
export class ChatWorkspaceMessageComponent {
  message = input.required<Message>()

  @HostBinding('class.my-message')
  get myMessage() {
    return this.message().myMessage
  }

}
