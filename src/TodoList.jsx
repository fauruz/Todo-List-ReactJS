import React, { useState, useEffect } from 'react';
import './index.css';

function TodoList() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState('');

  // Load tasks from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('tasks');
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}, [tasks]);

  const addTask = (taskText) => {
    const task = {
      id: Date.now(),
      text: taskText,
      completed: false
    };
    setTasks([...tasks, task]);
  };

  const removeTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const toggleTask = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskText = input.trim();
    if (taskText) {
      addTask(taskText);
      setInput('');
    }
  };

  return (
    <div className="container">
      <h1>Todo List <i className="fas fa-clipboard-list"></i></h1>
      <form id="addTaskForm" onSubmit={handleSubmit}>
        <input
          id="taskInput"
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Add your task"
        />
        <button type="submit">Add</button>
      </form>
      <div id="todoList">
        {tasks.map(task => (
          <div key={task.id} className={`task ${task.completed ? 'completed' : ''}`}>
            <div className="checkbox-wrapper-15">
              <input
                className="inp-cbx"
                id={`cbx-${task.id}`}
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                style={{ display: 'none' }}
              />
              <label className="cbx" htmlFor={`cbx-${task.id}`}>
                <span>
                  <svg width="12px" height="9px" viewBox="0 0 12 9">
                    <polyline points="1 5 4 8 11 1"></polyline>
                  </svg>
                </span>
                <span>{task.text}</span>
              </label>
            </div>
            <div className="delete-button" onClick={() => removeTask(task.id)}>x</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodoList;

