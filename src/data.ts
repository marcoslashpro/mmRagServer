export class Message {
  content: string;
  type: string;

  constructor(content: string, type: string) {
    this.content = content;
    this.type = type;
  }
}

export class messageState {
  messages: Array<Message> = []
}


export const Removed = {
  REMOVED: false,
  PENDING: false
}