import './Messages.css'
import Markdown from 'react-markdown'


export default function AIMessage({children}) {
  return (
    <>
      <div className='AIMessage'>
        <Markdown>{children}</Markdown></div>
    </>
  )
}