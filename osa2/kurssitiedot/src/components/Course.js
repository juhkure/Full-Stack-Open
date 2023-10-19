export const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export const Header = (props) => {
  return (
    <div>
      <h1>
        {props.course}
      </h1>
    </div>
  )
}

export const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />
      )}
    </div>
  )
}

export const Part = ({ name, exercises }) => {
  return (
    <div>
      <p>
        {name} {exercises}
      </p>
    </div>
  )
}

export const Total = ({ parts }) => {
  const sumTotal = parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
    <div>
      <b>
        Total of {sumTotal} exercises
      </b>
    </div>
  )
}

export default Course