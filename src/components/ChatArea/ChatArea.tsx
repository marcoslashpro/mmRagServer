import './ChatArea.css'
import HumanMessage from './Messages/HumanMessage.tsx'
import AIMessage from './Messages/AIMessage.tsx'
import { ReactNode } from 'react'
import { Message } from '../../data.ts'
import { Alert } from '@mui/material';


function renderMessage(content: string, type: string, key: string | number) {
  if (type === 'user') {
    return (
      <HumanMessage key={key}>{content}</HumanMessage>
    )
  } else if (type === 'assistant') {
    return (
      <AIMessage>{content}</AIMessage>
    )
  } else if (type === 'pending') {
    return (
      <AIMessage>...</AIMessage>
    )
  } else {
    throw new Error('Invalid message type: ' + type)
  }
}

export function renderMessages(messages: Array<Message>): Array<ReactNode> {
  let convo: Array<ReactNode> = []

  for (let i=0;i<messages.length;i++) {
    convo.push(
      renderMessage(
        messages[i].content,
        messages[i].type,
        i
      )
    );
  }

  return convo
}

export function ChatArea({ messages, messageError, setMessageError }) {
  const convo = renderMessages(messages)

  return (
    <>
      <div className="ChatArea">
        {messageError && <Alert severity='error' variant='filled' onClose={() => setMessageError(null)}>{messageError}</Alert>}
        {convo}
      </div>
    </>
  )
}