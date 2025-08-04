import './DeleteBtn.css'
import { useState,  } from 'react'


export default function DeleteBtn({ ids, removed, setRemoved, errorState, setErrorState }) {
  const [btnClicked, setBtnClicked] = useState(false)

  async function handleClick(ids: Array<string>) {
    setBtnClicked(true)
    let deleteUrl = `${process.env.REACT_APP_URL}/files/delete/?`

    for (let i=0;i<ids.length;i++) {
      if (i === 0) {
        deleteUrl = deleteUrl.concat(`file_id=${ids[i]}`)
      } else {
        deleteUrl = deleteUrl.concat(`&file_id=${ids[i]}`)
      }
    }

    const payload = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('user')}`
      },
      method: "GET"
    }
    try {
      const response = await fetch(deleteUrl, payload)
      if (!response.ok) {
        setBtnClicked(false)
        setRemoved(false)
        setErrorState("Error while removing the file")
        return
      }
      setRemoved(true)
    } catch (e) {
      setBtnClicked(false)
      setRemoved(false)
      setErrorState("Failed to comunicate with the server")
    }
  }

  return (
    <>
      <span>
        <button
          key={ids}
          onClick={() => handleClick(ids)}
          className='DeleteBtn'>
            {btnClicked ? "Removing..." : "❌"}
        </button>
      </span>
    </>
  )
}