import './Main.css'

import NavBar from "../NavBar/NavBar.tsx"
import { ChatArea } from "../ChatArea/ChatArea.tsx"
import InputArea from "../InputArea/InputArea.tsx"
import { useNavigate } from 'react-router'
import { useEffect } from 'react'


export default function Main({ messagesState, errorState, setErrorState, setMessagesState }) {
  let navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem('user')) {
      navigate('/auth/signup')
    }
  }, [localStorage])

  return (
    <>
      <div className='Main'>
        <NavBar errorState={errorState} setErrorState={setErrorState}/>
        <ChatArea messages={messagesState} messageError={errorState} setMessageError={setErrorState}/>
        <InputArea
        messagesState={messagesState}
        setMessagesState={setMessagesState}
        errorState={errorState}
        setErrorState={setErrorState}/>
      </div>
    </>
  )
}