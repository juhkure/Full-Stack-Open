import Hello from "./Hello"

const App = () => {
  const nimi = 'Pekka'
  const ika = 10
  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Maya" age={26 + 10} />
      <Hello name={nimi} age={ika} />
    </div>
  )
}

export default App