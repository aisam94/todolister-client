import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

function App() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await api.get(`/todos`);
    console.log(response);
    setTodos(response.data.data);
  };

  const addTodo = async () => {
    if (title.trim() === '') return;
    await api.post(`/todos`, { title, description });
    setTitle('');
    setDescription('');
    fetchTodos();
  };

  const toggleComplete = async (id, current) => {
    await api.post(`/todos/${id}`, { isCompleted: !current });
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await api.delete(`/todos/${id}`);
    fetchTodos();
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h1>ToDo List</h1>

      <input
        type="text"
        placeholder="Add a new task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: '70%', padding: '10px', marginRight: '10px' }}
      />
      <br/>
      <br/>
      <input
        type="text"
        placeholder="Add a new description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ width: '70%', padding: '10px', marginRight: '10px' }}
      />
      <br/>
      <br/>
      <button onClick={addTodo}>Add</button>

      <ul style={{ marginTop: '20px' }}>
        {todos.map((todo) => (
          <li key={todo.id} style={{ marginBottom: '10px' }}>
            <input
              type="checkbox"
              checked={todo.is_completed}
              onChange={() => toggleComplete(todo.id, todo.is_completed)}
            />
            <span
              style={{
                marginLeft: '10px',
                textDecoration: todo.completed ? 'line-through' : 'none',
              }}
            >
              {todo.title}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              style={{ marginLeft: '10px', color: 'red' }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App
