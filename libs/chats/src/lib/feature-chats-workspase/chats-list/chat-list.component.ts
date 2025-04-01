import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { map, startWith, switchMap } from 'rxjs';
import { SvgIconComponent } from '@tt/common-ui';
import { ChatsBtnComponent } from '../index';
import { ChatService } from '@tt/data-access/chats';

@Component({
  selector: 'app-chat-list',
  imports: [
    ChatsBtnComponent,
    ReactiveFormsModule,
    SvgIconComponent,
    AsyncPipe,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './chat-list.component.html',
  styleUrl: './chat-list.component.scss',
  standalone: true
})
export class ChatListComponent {
  chatsService = inject(ChatService);

  filterChatsControl = new FormControl('');

  chats$ = this.chatsService.getMyChats().pipe(
    switchMap((chats) => {
      return this.filterChatsControl.valueChanges.pipe(
        startWith(''),
        map((inputValue) => {
          return chats.filter((chat) => {
            return `${chat.userFrom.firstName} ${chat.userFrom.lastName}`
              .toLowerCase()
              .includes(inputValue ?? '');
          });
        })
      );
    })
  );
}
