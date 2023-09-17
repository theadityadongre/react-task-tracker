import Header from "./component/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./component/Footer";
import Tasks from "./component/Tasks";
import { useEffect, useState } from "react"
import AddTask from "./component/AddTask";
import About from "./component/About";

function App() {
  const [tasks, setTasks] = useState([])

  const [toggleAddbutton, setToggleAddButton] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch("http://localhost:5005/tasks")
      const data = await res.json();
      setTasks(data);
    }
    fetchTasks();
  }, [])

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5005/tasks/${id}`)
    const data = await res.json();
    return data;
  }

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5005/tasks/${id}`, {
      method: "DELETE"
    })

    setTasks(tasks.filter((task) => task.id !== id))
  }

  const toggleReminder = async (id) => {
    console.log("log")
    const fetchedData = await fetchTask(id);
    const updateTask = { ...fetchedData, reminder: !fetchedData.reminder }

    const res = await fetch(`http://localhost:5005/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(updateTask)
    })

    const data = res.json();

    setTasks(tasks.map((task) => task.id === id ?
      { ...task, reminder: data.reminder } : task))
  }

  const addTask = async (task) => {
    const res = await fetch("http://localhost:5005/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(task)
    })

    const data = await res.json();
    setTasks([...tasks, data])

    // const id = Math.floor(Math.random() * 1000);
    // const newTask = { id, ...task }
    // setTasks([...tasks, newTask]);
  }

  return (
    <Router>
      <div className='container'>
        <Header
          toggleAdd={() => setToggleAddButton(!toggleAddbutton)}
          addButtonChangeText={toggleAddbutton} />
        <Routes>
          <Route path="/" element={
            <>
              {toggleAddbutton && <AddTask onAdd={addTask} />}
              {tasks.length > 0 ? (<Tasks
                tasks={tasks}
                onDelete={deleteTask}
                onToggle={toggleReminder} />) : ("No task to show")}
            </>
          }
          />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}


export default App;
