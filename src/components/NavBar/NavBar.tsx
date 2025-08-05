import './NavBar.css'
import { FileManagement } from '../FileManagement/FileManagement.tsx'
import { AuthManagement } from '../Auth/Auth.tsx'
import { useEffect, useState } from 'react'


export default function NavBar({ errorState, setErrorState }) {
  const [fileDisplay, setFileDisplay] = useState<boolean>(false)

  const [files, setFiles] = useState(new Map())
  const [removed, setRemoved] = useState(false)
  const [added, setAdded] = useState(null)
  const [loaded, setLoaded] = useState<null | boolean>(null)

  async function fetchFiles(): Promise<any | undefined> {
    const filesUrl = 'https://0jl0v93oi5.execute-api.eu-central-1.amazonaws.com/files/retrieve/user/'
    const payload = {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('user')}`,
      },
      method: "GET"
    }
    try {
      const response = await fetch(filesUrl, payload)
      const json = await response.json()
      console.log(json)
      return json
    } catch {
      setErrorState("Unable to load files")
      return
    };
  };

  useEffect(() => {
    async function load(): Promise<undefined> {
      const files = await fetchFiles()
      if (files) {
        setFiles(files)
      }
    }
    load()
  }, [setFiles, fileDisplay, removed, added, setLoaded, setAdded, setRemoved])

  const handleFileDisplay = () => {
    if (fileDisplay === false) {
    } else if (fileDisplay === true) {
    }
  }

  return (
    <>
    <div className='NavBar'>
      <button
        className={"ModalHandler"}
        onClick={() => setFileDisplay(!fileDisplay)}>🔍</button>
      <FileManagement
        open={fileDisplay}
        files={files}
        added={added}
        onAdded={setAdded}
        removed={removed}
        onRemoved={setRemoved}
        loaded={loaded}
        setLoaded={setLoaded}
        />
      <AuthManagement />
    </div>
    </>
  )
}