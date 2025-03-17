import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { SvgIconComponent } from '@tt/common-ui';
import { MessageInputComponent } from '../../ui/message-input/message-input.component';
import { ChatWorkspaceHeaderComponent } from './chat-workspace-header/chat-workspace-header.component';
import { ChatWorkspaceMessagesWrapperComponent } from './chat-workspace-messages-wrapper/chat-workspace-messages-wrapper.component';
import { ChatService } from '@tt/data-access/chats';

@Component({
  selector: 'app-chat-workspace',
  standalone: true,
  imports: [
    ChatWorkspaceHeaderComponent,
    ChatWorkspaceMessagesWrapperComponent,
    MessageInputComponent,
    AsyncPipe,
    SvgIconComponent,
  ],
  templateUrl: './chat-workspace.component.html',
  styleUrl: './chat-workspace.component.scss',
})
export class ChatWorkspaceComponent {
  route = inject(ActivatedRoute);
  router = inject(Router);
  chatsService = inject(ChatService);

  activeChat$ = this.route.params.pipe(
    switchMap(({ id }) => {
      if(id === 'new') {
        return this.route.queryParams.pipe(
          switchMap(({userId}) => {
            console.log(userId)
            return this.chatsService.createChat(userId).pipe(
              switchMap(chat => {
                 this.router.navigate(['chats', chat.id])
                return of(null)
              })
            )
          })
        )
      }


      return this.chatsService.getChatById(id)})
  );
}
