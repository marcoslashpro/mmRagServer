import './File.css'
import DeleteBtn from '../DeleteBtn/DeleteBtn.tsx'


export function File({ content, ids, removed, setRemoved, errorState, setErrorState }) {
  return (
    <>
      <li 
      key={ids} 
      className={'File'}>
        {content}<DeleteBtn
        ids={ids}
        removed={removed}
        setRemoved={setRemoved}
        errorState={errorState}
        setErrorState={setErrorState} /></li>
    </>
  )
}


export function DefaultFile({ content }) {
  return (
    <>
      <li className='File'>{content}</li>
    </>
  )
}