import {Component, effect, ElementRef, HostListener, inject, input, Renderer2, signal} from '@angular/core';
import {ChatWorkspaceMessageComponent} from "./chat-workspace-message/chat-workspace-message.component";
import {MessageInputComponent} from "../../../../common-ui/message-input/message-input.component";
import {ChatService} from "../../../../data/servises/chats.service";
import {Chat, Message} from "../../../../data/interfaces/chats.interface";
import {audit, firstValueFrom, fromEvent, interval} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-chat-workspace-messages-wrapper',
  standalone: true,
  imports: [
    ChatWorkspaceMessageComponent,
    MessageInputComponent
  ],
  templateUrl: './chat-workspace-messages-wrapper.component.html',
  styleUrl: './chat-workspace-messages-wrapper.component.scss'
})
export class ChatWorkspaceMessagesWrapperComponent {
  private readonly destroy$ = takeUntilDestroyed();
  chatsService = inject(ChatService)
  hostElement = inject(ElementRef)
  r2 = inject(Renderer2)

  chat = input.required<Chat>()

  groupedMessages = this.chatsService.groupMessagesByDate


  // updateMessages = signal<Message[]>([])


  @HostListener('window:resize')
  onWindowResize() {
    this.resizeFeed()
  }


  async onSendMessage(messageText: string) {
    await firstValueFrom(this.chatsService.sendMessage(this.chat().id, messageText))
    await firstValueFrom(this.chatsService.getChatById(this.chat().id))

  }

  ngAfterViewInit() {
    this.resizeFeed()

    fromEvent(window, 'resize')
      .pipe(
        audit(() => interval(1000)),
        this.destroy$
      )
      .subscribe(() => {
        console.log(123)
        this.resizeFeed()
      })
  }


  resizeFeed() {
    const {top} = this.hostElement.nativeElement.getBoundingClientRect()
    const height = window.innerHeight - top - 25

    this.r2.setStyle(this.hostElement.nativeElement, 'height', `${height}px`)
  }


}
