import React from "react";

const TasksContent = ({ tasks, setTasks }) => {
  const handleOnChange = async (id, currentStatus) => {
    const updatedStatus = !currentStatus;

    try {
      const res = await fetch(`http://localhost:3000/Tasks/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          done: updatedStatus,
        }),
      });

      if (res.ok) {
        // Update the task list in the state
        const updatedTasks = tasks.map((task) =>
          task.id === id ? { ...task, done: updatedStatus } : task
        );
        setTasks(updatedTasks);
      } else {
        console.error("Failed to update task status");
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/Tasks/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        // Update the task list in the state
        const updatedTasks = tasks.filter((task) => task.id !== id);
        setTasks(updatedTasks);
      } else {
        console.error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };
  const doneTasksLength = tasks.filter((task) => task.done===true).length;

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-lg text-white">Tasks ({doneTasksLength})</h1>
      {tasks.length === 0 ? (
        <p className="text-white text-center text-lg underline">No tasks yet</p>
      ):(
        tasks.map((task) => (
          <div
            key={task.id}
            className="flex gap-3 bg-white rounded-lg justify-between px-3 py-2"
          >
            <input
              type="checkbox"
              onChange={() => handleOnChange(task.id, task.done)} // Use onChange instead of onClick
              checked={task.done}
            />
            <p>{task.description}</p>
            <button onClick={() => handleDelete(task.id)}>
              <i className="fa-solid fa-trash text-red-500"></i>
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default TasksContent;
