import { Component } from '@angular/core';
import {ChatBtnComponent} from "../chats-btn/chat-btn.component";
import {ReactiveFormsModule} from "@angular/forms";
import {SvgIconComponent} from "../../../common-ui/svg-icon/svg-icon.component";

@Component({
  selector: 'app-chat-list',
  standalone: true,
  imports: [
    ChatBtnComponent,
    ReactiveFormsModule,
    SvgIconComponent
  ],
  templateUrl: './chat-list.component.html',
  styleUrl: './chat-list.component.scss'
})
export class ChatListComponent {

}
