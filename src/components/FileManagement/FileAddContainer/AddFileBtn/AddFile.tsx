import './AddFile.css'


export function AddFile() {
  return (
    <>
      <input
      type='file'
      required
      className='AddFile'
      placeholder='+'/>
    </>
  )
}

export function AddFileBtn({ loaded }) {
  if (loaded === null) {
    return (
      <button
        type='submit'
        className='AddFileBtn'>Add file
      </button>
    )
  } else if (loaded === false) {
    return (
      <button
        type='submit'
        className='AddFileBtn'>Please select a file
      </button>
    )
  } else {
    return (
      <button
        type='submit'
        className='AddFileBtn'>Adding...
      </button>
    )
  }
}