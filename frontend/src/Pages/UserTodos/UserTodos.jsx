import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './UserTodos.css';
import TodosCard from '../../Component/TodosCard/TodosCard';

const UserTodos = () => {
  const { userId } = useParams();
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}/todos`);
        setTodos(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching todos:', error);
        setLoading(false);
      }
    };

    fetchTodos();
  }, [userId]);

  return (
    <div className="user-todos">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2>User Todos</h2>
          <div className="todos-container">
            {todos.map((todo) => (
              <TodosCard key={todo.id} todo={todo} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default UserTodos;
