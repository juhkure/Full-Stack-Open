const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
       name: 'Fundamentals of React',
       exercises: 10,
       id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return (
    <div>
      <h1>Half Stack application development</h1>
      <Course course={course} />
    </div>
  )

  /*
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  ) */
}

const Course = (props) => {
  return (
    <div>
      <Header course={props.name} />
      <Content parts={props.course.parts} />
      <Total parts={props.course.parts} />
    </div>
  )
}

const Header = (props) => {
  return (
    <div>
      <h1>
        {props.course}
      </h1>
    </div>
  )
}

const Content = ({parts}) => {
  console.log(parts)
  return (
    <div>
      {parts.map(part =>
        <Part name={part.name} exercises={part.exercises} />
      )}
    </div>
  )
}

/*
      <Part part={props.parts[0].name} exercises={props.parts[0].exercises} />
      <Part part={props.parts[1].name} exercises={props.parts[1].exercises} />
      <Part part={props.parts[2].name} exercises={props.parts[2].exercises} />
*/

const Part = ({name, exercises}) => {
  return (
    <div>
      <p>
        {name} {exercises}
      </p>
    </div>
  )
}

const Total = ({parts}) => {
  let sum = 0
  parts.forEach(part => {
    sum += part.exercises
  });
  return (
    <div>
      <b>
        Total of {sum} exercises
      </b>
    </div>
  )
}

export default App