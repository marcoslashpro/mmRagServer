import './App.css';
import { Message } from './data.ts'
import { Login, SignUp } from './components/Auth/Auth.tsx';
import Main from './components/Main/Main.tsx'

import React, { useState } from 'react'
import { Route, Routes } from 'react-router';


function App() {
  const [messagesState, setMessagesState] = useState<Array<Message>>(new Array())
  const [errorState, setErrorState] = useState<null | string>(null)

  return (
    <>
    <head>
      <title>Multimodal Rag</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </head>
      <Routes>
        <Route path='/' element={
          <Main 
          messagesState={messagesState}
          setMessagesState={setMessagesState}
          errorState={errorState}
          setErrorState={setErrorState}/>
        }/>
        <Route path='auth'>
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<SignUp />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
