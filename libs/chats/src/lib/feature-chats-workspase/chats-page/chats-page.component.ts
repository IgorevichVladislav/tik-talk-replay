import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatListComponent } from '../chats-list/chat-list.component';

@Component({
  selector: 'app-chats-page',
  imports: [RouterOutlet, ChatListComponent],
  templateUrl: './chats-page.component.html',
  styleUrl: './chats-page.component.scss',
  standalone: true
})
export class ChatsPageComponent {
}
