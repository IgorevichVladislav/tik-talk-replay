import {Component, inject} from '@angular/core';
import {ChatsBtnComponent} from "../chats-btn/chats-btn.component";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {SvgIconComponent} from "../../../common-ui/svg-icon/svg-icon.component";
import {ChatService} from "../../../data/servises/chats.service";
import {AsyncPipe} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {map, startWith, switchMap} from "rxjs";

@Component({
  selector: 'app-chat-list',
  standalone: true,
  imports: [
    ChatsBtnComponent,
    ReactiveFormsModule,
    SvgIconComponent,
    AsyncPipe,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './chat-list.component.html',
  styleUrl: './chat-list.component.scss'
})
export class ChatListComponent {
  chatsService = inject(ChatService)

  filterChatsControl = new FormControl('');

  chats$ = this.chatsService.getMyChats()
    .pipe(
      switchMap(chats => {
        return this.filterChatsControl.valueChanges
          .pipe(
            startWith(''),
            map(inputValue => {
              return chats.filter(chat => {
                return `${chat.userFrom.firstName} ${chat.userFrom.lastName}`.toLowerCase().includes(inputValue ?? '')
              })
            })
          )
      })
    )


}
