import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  inject,
  input,
  Renderer2
} from '@angular/core';
import { audit, firstValueFrom, fromEvent, interval } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ChatWorkspaceMessageComponent } from './index';
import { MessageInputComponent } from '../../../../index';
import { Chat, ChatService } from '@tt/data-access/chats';

@Component({
  selector: 'app-chat-workspace-messages-wrapper',
  imports: [ChatWorkspaceMessageComponent, MessageInputComponent],
  templateUrl: './chat-workspace-messages-wrapper.component.html',
  styleUrl: './chat-workspace-messages-wrapper.component.scss',
  standalone: true
})
export class ChatWorkspaceMessagesWrapperComponent implements AfterViewInit {
  chatsService = inject(ChatService);
  hostElement = inject(ElementRef);
  r2 = inject(Renderer2);

  chat = input.required<Chat>();

  groupedMessages = this.chatsService.groupMessagesByDate;

  // updateMessages = signal<Message[]>([])

  @HostListener('window:resize')
  onWindowResize() {
    this.resizeFeed();
  }

  async onSendMessage(messageText: string) {
    await firstValueFrom(
      this.chatsService.sendMessage(this.chat().id, messageText)
    );
    await firstValueFrom(this.chatsService.getChatById(this.chat().id));
  }

  ngAfterViewInit() {
    this.resizeFeed();

    fromEvent(window, 'resize')
      .pipe(
        audit(() => interval(1000)),
        takeUntilDestroyed()
      )
      .subscribe(() => {
        console.log(123);
        this.resizeFeed();
      });
  }

  resizeFeed() {
    const { top } = this.hostElement.nativeElement.getBoundingClientRect();
    const height = window.innerHeight - top - 25;

    this.r2.setStyle(this.hostElement.nativeElement, 'height', `${height}px`);
  }
}
