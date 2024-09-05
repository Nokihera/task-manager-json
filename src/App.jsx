import React, { useEffect, useState } from "react";
import Heading from "./components/Heading";
import CreateTask from "./components/CreateTask";
import TasksContent from "./components/TasksContent";

const App = () => {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/Tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data))
  }, []);
  return (
    <div className="w-[600px] wholeDiv mx-auto bg-gray-800 mt-3 rounded-xl h-[550px] shadow-xl flex flex-col py-4 px-6 gap-4 overflow-scroll">
      <Heading />
      <CreateTask />
      <TasksContent tasks={tasks} setTasks={setTasks} />
    </div>
  );
};

export default App;
