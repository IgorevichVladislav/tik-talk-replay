import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, switchMap, timer } from 'rxjs';
import { Chat, LastMessageRes, Message } from '../../../index';
import { ProfileService } from '../../../index';


@Injectable({
  providedIn: 'root',
})
export class ChatService {
  http = inject(HttpClient);
  me = inject(ProfileService).me;

  activeChatMessages = signal<Message[]>([]);

  groupMessagesByDate = computed(() => {
    const groupDate = this.activeChatMessages().reduce((acc, message) => {
      if (!acc[message.createdAt]) {
        acc[message.createdAt] = [];
      }
      acc[message.createdAt].push(message);

      return acc;
    }, {} as Record<string, Message[]>);
    return Object.entries(groupDate);
  });

  baseApiUrl = 'https://icherniakov.ru/yt-course/';
  chatUtl = `${this.baseApiUrl}chat/`;
  messageUrl = `${this.baseApiUrl}message/`;

  createChat(userId: number) {
    return this.http.post<Chat>(`${this.chatUtl}${userId}`, {});
  }

  getChatById(chatId: number) {
    return this.http.get<Chat>(`${this.chatUtl}${chatId}`).pipe(
      map((chat) => {
        const patchedMessages = chat.messages.map((message) => {
          return {
            ...message,
            user:
              chat.userFirst.id === message.userFromId
                ? chat.userFirst
                : chat.userSecond,
            myMessage: this.me()?.id === message.userFromId,
          };
        });

        this.activeChatMessages.set(patchedMessages);

        return {
          ...chat,
          companion:
            chat.userFirst.id === this.me()?.id
              ? chat.userSecond
              : chat.userFirst,
          messages: patchedMessages,
        };
      })
    );
  }

  getMyChats() {
    return this.http.get<LastMessageRes[]>(`${this.chatUtl}get_my_chats/`);
  }

  sendMessage(chatId: number, message: string) {
    return this.http.post<Message>(
      `${this.messageUrl}send/${chatId}`,
      {},
      {
        params: {
          message,
        },
      }
    );
  }

  //Добавляем метод для периодического получения сообщений:
  getPeriodicMessages(chatId: number, intervalMs: number = 5000) {
    return (
      timer(0, intervalMs)
        //timer(0, intervalMs): Запускает первый запрос сразу, затем каждые intervalMs мс.
        .pipe(
          switchMap(() => this.getChatById(chatId))
          //switchMap(() => this.getChatById(chatId)): Каждый раз запрашивает данные с сервера.
        )
    );
  }
}
