import { useState } from 'react'

const App = () => {
  const [counter, setCounter] = useState(0)

  const increaseByOne = () => setCounter(counter + 1)
  const setToZero = () => setCounter(0)
  const decreaseByOne = () => setCounter(counter - 1)



  return (
    <div>
      <Display laskuri={counter}/>

      <Button
        handleClick={increaseByOne}
        text='plus'
      />
      <Button
        handleClick={setToZero}
        text='zero'
      />
      <Button
        handleClick={decreaseByOne}
        text='minus'
      />
    </div>
  )
}

const Display = ({ laskuri }) => <div>{laskuri}</div>

const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>
      {text}
    </button>
)

export default App