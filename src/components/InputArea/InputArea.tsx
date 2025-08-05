import './InputArea.css'
import InputBar from './InputBar/InputBar.tsx'
import SumbitBtn from './SumbitBtn/SumbitBtn.tsx'
import { Message } from '../../data.ts'


export default function InputArea({ messagesState, setMessagesState, errorState, setErrorState}) {
  async function sendMessage(message: Message): Promise<Response | undefined> {
    const chatURL = `https://0jl0v93oi5.execute-api.eu-central-1.amazonaws.com/chat`
    const payload = {
      body: JSON.stringify({query: message.content}),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('user')}`
      },
      method: "POST"
    }
    try {
      let response  = await fetch(chatURL, payload)
      return response
    } catch (e) {
      setErrorState("Something went wrong, please try again later...")
      return 
    } 
  }


  async function handleSubmit(e) {
    e.preventDefault()
    let message = new Message(e.target[0].value, 'user')
    let newMessages: Array<Message> = messagesState.slice()
    newMessages.push(message)
    newMessages.push(new Message('', 'pending'))
    setMessagesState(newMessages)
    e.target.reset()
    const res = await sendMessage(message)
    if (!res) {
      return
    } else if (!res.ok) {
      setErrorState("Server is momentarly down. Please try again later")
      let rollBackMessages = newMessages.slice()
      for (let i=0;i<2;i++) {
        // Last message is the pending one, the second to last the user message
        rollBackMessages.pop()
      }
      setMessagesState(rollBackMessages)
      return
    }
    const aiResponse = await res.json()
    let aiMessage = new Message(aiResponse, 'assistant')
    let updatedMessages = newMessages.slice()
    updatedMessages.pop()
    updatedMessages.push(aiMessage)
    setMessagesState(updatedMessages)
    }


  return (
    <>
      <form
      className='InputArea'
      onSubmit={(e) => {handleSubmit(e)}}>
        <InputBar />
        <SumbitBtn />
      </form>
    </>
  )
}