// 定義一個任務的數據結構
interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  // 呢個 Array 就係我哋嘅「數據庫」，依家先放一粒 Dummy Data 試吓位
  const [todos, setTodos] = useState<TodoItem[]>([
    { id: 1, text: 'Learn React with Pak-Wai', completed: false },
    { id: 2, text: 'Mastering TypeScript', completed: true },
    { id: 3, text: 'Deploy to AWS Lightsail', completed: false }
  ]);

  return (
    <div className="todo-container">
      <h1>My Tasks</h1>
      
      {/* 呢度之後會放 Input 框 */}
      
      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
