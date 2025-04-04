export default function HelloWorld() {
  return (
    <>
      <HeaderHello text="Hello World"/>
      <ParagraphHello />
    </>
  )
}

function HeaderHello({text = 'Hello, World!'}) {
  return (
    <h1>{text.toUpperCase()}</h1>
  )
}

function ParagraphHello() {
  return (
    <p className="size-10 bg-blue-600 justify-center p-9 w-2xl columns-lg float-right rounded-sm px-px font-mono"> Hehe</p>
  )
}