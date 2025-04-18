import { Injectable } from '@angular/core';
import { ChatWsService } from '../interface/chat-ws-service.interface';

@Injectable({ providedIn: 'root' })

export class ChatWsNativeService implements ChatWsService {

  #socket: WebSocket | null = null;

  connect(): void {
    //Если сокет существует, закончи функцию и не создавай новый сокет
     //Если connect дернут несколько раз с разных мест, то новый сокет не будет создаваться.
    if (this.#socket) return
    this.#socket = new WebSocket(`url`, ['authToken']);

    this.#socket.onmessage = (event: MessageEvent) => {
      //TODO обработка сообщения event.data
      // event.data = JSON.parse(event.data);
    }
    this.#socket.onclose = () => {
      console.log('Connection closed');

    }

  }

  sendMessage(text: string, chatId: number): void {
    this.#socket?.send(JSON.stringify({
      text,
      chat_id: chatId,
    }));
  }

  disconnect(): void {
    this.#socket?.close();
  }
}
