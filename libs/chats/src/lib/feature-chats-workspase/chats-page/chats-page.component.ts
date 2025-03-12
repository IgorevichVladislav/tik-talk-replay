import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ChatListComponent} from '../index';

@Component({
  selector: 'app-chats-page',
  standalone: true,
  imports: [RouterOutlet, ChatListComponent],
  templateUrl: './chats-page.component.html',
  styleUrl: './chats-page.component.scss',
})
export class ChatsPageComponent {}
