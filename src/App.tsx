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

  // 呢個 State 用嚟記住 Input 框入面打緊嘅字
  const [inputValue, setInputValue] = useState('');
  const handleAddTodo = () => {
    // 如果輸入框是空的，就什麼都不做（防止加空任務）
    if (inputValue.trim() === '') return;
  
    // 建立一個新的任務物件
    const newTodo: TodoItem = {
      id: Date.now(), // 用時間戳當作臨時 ID，確保唯一性
      text: inputValue,
      completed: false
    };
  
    // 更新數據：把舊的 todos 展開，再加上新的這一粒
    setTodos([...todos, newTodo]);
  
    // 清空輸入框
    setInputValue('');
  };

  const toggleTodo = (id: number) => {
    // 邏輯：搵返嗰粒 ID 匹配嘅任務，將佢個 completed 取反 (true 變 false, false 變 true)
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    
    setTodos(updatedTodos);
  };

  const deleteTodo = (e: React.MouseEvent, id: number) => {
    // 阻止事件冒泡 (防止點擊刪除掣時，同時觸發到 <li> 的 toggleTodo)
    e.stopPropagation();
    
    // 邏輯：保留所有 ID 唔等於目標 ID 嘅任務
    const filteredTodos = todos.filter(todo => todo.id !== id);
    setTodos(filteredTodos);
  };

  return (
    <div className="todo-container" style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h1>My Tasks</h1>
      
      <div className="input-group" style={{ marginBottom: '20px' }}>
        <input 
          type="text" 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="What needs to be done?"
          style={{ padding: '8px', marginRight: '10px' }}
        />
        <button onClick={handleAddTodo} style={{ padding: '8px 16px' }}>Add</button>
      </div>
      
      <ul className="todo-list" style={{ padding: 0 }}>
        {todos.map(todo => (
          <li key={todo.id} 
            onClick={() => toggleTodo(todo.id)}
            style={{ 
              textDecoration: todo.completed ? 'line-through' : 'none', 
              cursor: 'pointer', 
              color: todo.completed ? '#aaa' : '#222',
              padding: '10px',
              borderBottom: '1px solid #eee',
              listStyle: 'none',
              textAlign: 'left',
              // 加多呢兩行，等文字同掣可以排喺同一行嘅兩端
              display: 'flex',
              justifyContent: 'space-between'
            }}>
            
            <span>{todo.text}</span>
          
            <button 
              onClick={(e) => deleteTodo(e, todo.id)}
              style={{ 
                backgroundColor: '#ff4d4f', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px', 
                cursor: 'pointer',
                padding: '2px 8px'
              }}
            >
              Delete
            </button>
           </li>
        ))}
      </ul>
    </div>
  )
}

export default App
