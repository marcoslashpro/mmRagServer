import './FileAddContainer.css'
import { AddFile, AddFileBtn } from './AddFileBtn/AddFile.tsx'
import Alert from '@mui/material/Alert';
import { useState } from 'react';


export default function FileAddContainer({ added, setAdded, loaded, setLoaded }) {
  const [error, setError] = useState<null | string>(null)

  async function handleSubmit(e): Promise<undefined> {
    e.preventDefault()
    const file = e.target[0].files[0]  // Only handles one file

    if (!file) {
      setLoaded(null)
      return
    }

    let data = new FormData()
    data.append("file", file, file.name)

    const uploadUrl = `https://0jl0v93oi5.execute-api.eu-central-1.amazonaws.com/files/upload/`
    const payload = {
      body: data,
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('user')}`
      },
      method: "POST"
    }
    setLoaded(true)


    try {
      const res = await fetch(uploadUrl, payload)
      if (!res.ok) {
        const message = await res.json().catch(() => res.text())
        setError(message['detail'])
        setLoaded(null)
        setAdded(null)
        return
    }
    } catch (e) {
      setError("Error while comunicating with the server")
      setLoaded(null)
      setAdded(null)
    }
    setAdded(!added)
    setLoaded(null)
  }

  return (
    <>
      <form
      className='FileAddContainer'
      onSubmit={(e) => handleSubmit(e)}>
        <AddFile />
        <AddFileBtn loaded={loaded}/>
      </form>
      {error && <Alert variant='filled' severity='error' onClose={() => {setError(null)}}>{error}</Alert>}
    </>
  )
}