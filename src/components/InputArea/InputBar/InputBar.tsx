import './InputBar.css'


export default function InputBar() {
  return (
    <>
      <input 
        type='text'
        required
        className='InputBar'
        placeholder='Enter query...'
      />
    </>
  )
}