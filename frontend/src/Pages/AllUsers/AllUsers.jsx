import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './AllUsers.css';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        const sortedUsers = response.data.sort((a, b) => a.name.localeCompare(b.name));
        setUsers(sortedUsers);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="all-users">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Company Name</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  onClick={() => handleUserSelect(user)}
                  className={selectedUser && selectedUser.id === user.id ? 'selected' : ''}
                >
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.company.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="buttons">
            <Link to={`/user-posts/${selectedUser ? selectedUser.id : ''}`}>
              <button
                className={selectedUser ? 'active' : ''}
                disabled={!selectedUser}
              >
                Posts
              </button>
            </Link>
            <Link to={`/user-todos/${selectedUser ? selectedUser.id : ''}`}>
              <button
                className={selectedUser ? 'active' : ''}
                disabled={!selectedUser}
              >
                Todos
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default AllUsers;
