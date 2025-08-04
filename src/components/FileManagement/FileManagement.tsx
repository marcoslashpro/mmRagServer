import './FileManagement.css'
import FileDisplayContainer from './FileDisplayContainer/FileDisplayContainer.tsx'
import { DefaultFile, File } from './File/File.tsx'
import FileAddContainer from './FileAddContainer/FileAddContainer.tsx'

import { ReactNode, useState } from 'react'
import { Alert } from '@mui/material'


function renderFiles(
  files: Array<string> | undefined,
  removed: boolean,
  setRemoved: Function,
  errorState: string | null,
  setErrorState: Function
) {
  const formatted: Array<ReactNode> = []
  if (!files || files.length === 0) {
    return [renderFile("No files yet!", null, removed, setRemoved, errorState, setErrorState)]
  }

  let filesFormattedNames = formatFileNames(files)

  filesFormattedNames.forEach((fileIds, fileName) => {
    formatted.push(renderFile(fileName, fileIds, removed, setRemoved, errorState, setErrorState))
  })

  return formatted
}

function renderFile(
  content: string,
  key: null| string | string[] = null,
  removed: boolean,
  setRemoved: Function,
  errorState: string | null,
  setErrorState: Function
) {
  if (!key) {
    return (
      <>
        <DefaultFile content={content}></DefaultFile>
      </>
    )
  }

  return (
    <>
      <File
      ids={key}
      content={content}
      removed={removed}
      setRemoved={setRemoved}
      errorState={errorState}
      setErrorState={setErrorState}></File>
    </>
  )
}

export function formatFileNames(fileNames: Array<string> | undefined): Map<string, Array<string>> {
  const formattedNames: Map<string, Array<string>> = new Map()
  if (!fileNames) {
    return formattedNames
  }

  for (let i=0;i<fileNames.length;i++) {
    const name: string | undefined = formatFileName(fileNames[i])
    if (name && formattedNames.get(name) !== undefined) {
      let ids = formattedNames.get(name)
      ids.push(fileNames[i])
      formattedNames.set(name, ids)
    } else if (name) {
      formattedNames.set(name, [fileNames[i]])
    }
  }

  console.log(formattedNames)

  return formattedNames
}

function formatFileName(fileName: string): string | undefined {
  /*
  Takes a S3 bucket object key with structure: 'userId/.ext/fileName/chunk+'
  and from that return fileName.ext
  */
  let count = 0
  let j = 0

  for (let i=0;i<fileName.length;i++) {
    if (fileName[i] === '/') {
      if (count === 0) {
        j = i + 1
      }
      count++
    }

    if (count === 3) {
      return partition(fileName.slice(j, i))
    }
    if (i+1 >= fileName.length) {
      return partition(fileName.slice(j, i+1))
    }
  }
}

function partition(s: string) {
  const sep = s.split('/')
  return sep[1] + sep[0]
}


export function FileManagement({
  open, 
  files, 
  added,
  onAdded,
  removed,
  onRemoved,
  loaded,
  setLoaded,
}) {
  const [filesError, setFilesError] = useState<string | null>(null)
  const formatted = renderFiles(files, removed, onRemoved, filesError, setFilesError)
  return (
    <>
      <dialog
        className='FileManagement'
        open={open}>
          {filesError && <Alert severity='error' variant='filled' onClose={() => {setFilesError(null)}}>{filesError}</Alert>}
          <FileDisplayContainer
            files={formatted}
          ></FileDisplayContainer>
          <br />
          <FileAddContainer
            added={added}
            setAdded={onAdded}
            loaded={loaded}
            setLoaded={setLoaded} />
      </dialog>
    </>
  )
}
