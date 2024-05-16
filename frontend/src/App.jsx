import './App.css';
import { Route, Routes } from 'react-router-dom';
import AllUsers from './Pages/AllUsers/AllUsers';
import UserPosts from './Pages/UserPosts/UserPosts';
import UserTodos from './Pages/UserTodos/UserTodos';

function App() {
  return (
    <>
      <Routes>
        <Route path="/user-posts/:userId" element={<UserPosts />} />
        <Route path="/user-todos/:userId" element={<UserTodos />} />
        <Route path="/" element={<AllUsers />} />
      </Routes>
    </>
  );
}

export default App;
