import Task from "./Task"

const Tasks = ({tasks, onDelete, onToggle}) => {

  return (
    <>
       {tasks.map((task) => (
            <Task 
            task={task} 
            onDelete={onDelete} 
            onToggle={onToggle} 
            key={task.id}>
            </Task>
       ))}
    </>
  )
}

export default Tasks