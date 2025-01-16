import { Component } from '@angular/core';
import {AvatarCircleComponent} from "../../../common-ui/avatar-circle/avatar-circle.component";

@Component({
  selector: 'button[chats]',
  standalone: true,
  imports: [
    AvatarCircleComponent
  ],
  templateUrl: './chat-btn.component.html',
  styleUrl: './chat-btn.component.scss'
})
export class ChatBtnComponent {

}
