import { useState } from 'react'

const TopAnecdote = ({points, anecdotes}) => {
  var highestIndex = points.indexOf(Math.max(...points))
  if (Math.max(...points) === 0) {
    return (
      <div>
        All anecdotes have 0 points
      </div>
    )
  }
  return (
    <div>
      {anecdotes[highestIndex]}
      <br></br>
      has {Math.max(...points)} votes
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)

  var p = new Uint8Array(anecdotes.length+1)
  const [points, setPoints] = useState(p)

  const randomAnecdote = () => {
    let x = selected
    while (x === selected) {
      x = Math.random() * anecdotes.length
      x = Math.floor(x)
    }
    setSelected(x)
  }

  const voteAnecdote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
      {text}
    </button>
  )

  return (


    <div>
      <h1>
        Anecdote of the day
      </h1>
      <div>
        {anecdotes[selected]}
      </div>
      <div>
        has {points[selected]} votes
      </div>

      <Button 
        handleClick={voteAnecdote}
        text='vote'
      />

      <Button
        handleClick={randomAnecdote}
        text='next anecdote'
      />

      <h1>
        Anecdote with most votes
      </h1>
      <TopAnecdote
        points={points}
        anecdotes={anecdotes}
      />
    </div>
  )
}

export default App