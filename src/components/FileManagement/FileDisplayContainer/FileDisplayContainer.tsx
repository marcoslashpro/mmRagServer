import './FileDisplayContainer.css'


export default function FileDisplayContainer({ files }) {
  return (
    <>
      <ul className={"FileDisplayContainer"}>{files}</ul>
    </>
  )
}