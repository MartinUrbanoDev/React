
import React, { useState } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import { addTask, deleteTask, startEditingTask, editTask } from './utils/TaskUtils';
import { EditInput } from './svg/EditInput';
import { Trash } from './svg/Trash';

function App() {
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState(null);

  const handleAddTask = () => {
    setTasks(addTask(tasks, newTask));
    setNewTask('');
  };

  const handleDeleteTask = (id) => {
    setTasks(deleteTask(tasks, id));
  };

  const handleStartEditingTask = (task) => {
    startEditingTask(task, setEditingTask, setNewTask);
  };

  const handleEditTask = () => {
    setTasks(editTask(tasks, editingTask, newTask));
    setEditingTask(null);
    setNewTask('');
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (editingTask) {
        handleEditTask()
      } else {
        handleAddTask()
      }
    }
  }

  return (
    <div className="min-h-screen bg-[#2D2D2D] flex items-center justify-center">
      <div className="bg-[#f7efef] p-6 rounded shadow-md w-full max-w-md border-8 border-b border-r border-l border-green-500">
        <h1 className="text-2xl font-bold mb-4">Todo List</h1>
        <div className="flex mb-4">
          <input
            type="text"
            className="focus:shadow-md focus:shadow-blue-400 pl-12 w-full py-4 bg-blue-200 rounded-xl outline-none transition-all duration-300 ease-in-out"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className="bg-blue-500 text-white p-2 ml-2 rounded-lg transition transform active:scale-95"
            onClick={editingTask ? handleEditTask : handleAddTask}
          >
            {editingTask ? 'Edit Task' : 'Add Task'}
          </button>
        </div>
        <ul>
          {tasks.map(task => (
            <li key={task.id} className="flex justify-between items-center mb-2">
              <span>{task.text}</span>
              <div>
                <button
                  className="bg-orange-500 text-white p-2 mr-2 rounded-full transition transform active:scale-90"
                  onClick={() => handleStartEditingTask(task)}
                >
                  <EditInput />
                </button>
                <button
                  className="bg-red-500 text-white p-2 rounded-full transition transform active:scale-90"
                  onClick={() => handleDeleteTask(task.id)}
                >
                  <Trash />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
