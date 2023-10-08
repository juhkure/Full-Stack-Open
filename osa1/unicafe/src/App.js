import { useState } from 'react'

const Statistics = ({ good, neutral, bad, all, average, percentage }) => {
  if (all === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (

    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={all} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={percentage} text2={"%"} />
      </tbody>
    </table>
  )
}

const StatisticLine = (props) => {
  return (
    <Display amount={props.value} text={props.text} text2={props.text2} />
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [percentage, setPercentage] = useState(0)

  

  const increaseGood = () => {
    setGood(good + 1)
    setAll(all + 1)
    setAverage((good + 1 - bad) / (all + 1))
    setPercentage((good + 1) / (all + 1) * 100)
  }
  const increaseNeutral = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
    setAverage((good - bad) / (all + 1))
    setPercentage((good) / (all + 1) * 100)
  }
  const increaseBad = () => {
    setBad(bad + 1)
    setAll(all + 1)
    setAverage((good - bad - 1) / (all + 1))
    setPercentage((good) / (all + 1) * 100)
  }
  


  return (
    <div>

      <h1>Give feedback</h1>

      <Button
        handleClick={increaseGood}
        text='good'
      />
      <Button
        handleClick={increaseNeutral}
        text='neutral'
      />
      <Button
        handleClick={increaseBad}
        text='bad'
      />


      <h1>Statistics</h1>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        percentage={percentage}
      />

    </div>
  )
}

const Display = ({ text, amount, text2 }) => {
  return (
    <tr>
      <td>{text}</td>
      <td> {amount} {text2}</td>
    </tr>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)
export default App