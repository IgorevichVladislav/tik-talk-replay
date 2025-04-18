export interface ChatConnectionWSParams {
  url: string;
  token: string;
}

export interface ChatWsService {
  connect: () => void;
  sendMessage: (textMessage: string, chatId: number) => void;
  disconnect: () => void;
}
