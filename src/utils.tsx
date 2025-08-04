import { Message } from "./data";

export function rollBackMessageState(messagesState: Message[], idx: number): Message[] {
  let rollBackMessages = messagesState.slice()
  for (let i=0;i<idx;i++) {
    // Last message is the pending one, the second to last the user message
    rollBackMessages.pop()
  }
  return rollBackMessages
}