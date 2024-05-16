import React from 'react';
import './TodosCard.css';

const TodosCard = ({ todo }) => {
  return (
    <div className={`todo-card ${todo.completed ? 'completed' : ''}`}>
      <h3>{todo.title}</h3>
      <p>Status: {todo.completed ? 'Completed' : 'Not Completed'}</p>
    </div>
  );
};

export default TodosCard;
