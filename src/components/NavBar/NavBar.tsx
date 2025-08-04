import './NavBar.css'
import { FileManagement } from '../FileManagement/FileManagement.tsx'
import { AuthManagement } from '../Auth/Auth.tsx'
import { useEffect, useState } from 'react'
import { url } from '../../constants.ts'


export default function NavBar({ errorState, setErrorState }) {
  const [fileDisplay, setFileDisplay] = useState<boolean>(false)
  const [authDisplay, setAuthDisplay] = useState<"flex" | "none">("none")

  const [files, setFiles] = useState(new Map())
  const [removed, setRemoved] = useState(false)
  const [added, setAdded] = useState(null)
  const [loaded, setLoaded] = useState<null | boolean>(null)

  async function fetchFiles(): Promise<any | undefined> {
    const filesUrl = url + '/files/retrieve/user/'
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
      switch (authDisplay) {
        case 'flex': setAuthDisplay("none"); setFileDisplay(true)
        case 'none': setFileDisplay(true)
      }
    } else if (fileDisplay === true) {
      switch (authDisplay) {
        case 'flex': break
        case 'none': setFileDisplay(false)
      }
    }
  }

  const handleAuthDisplay = () => {
    if (authDisplay === 'none') {
      if (fileDisplay === true) {
        setAuthDisplay("flex")
        setFileDisplay(false)
      } else {
        setAuthDisplay("flex")
      }
    } else if (authDisplay === 'flex') {
      setAuthDisplay("none")
    }
  }

  return (
    <>
    <div className='NavBar'>
      <button
        className={"ModalHandler"}
        onClick={() => handleFileDisplay()}>🔍</button>
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
      <button className='AuthBtn' onClick={() => handleAuthDisplay()}>
        🔑
      </button>
      <AuthManagement display={authDisplay}/>
    </div>
    </>
  )
}