import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './UserPosts.css';

const UserPosts = () => {
  const { userId } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, [userId]);

  const postsPerPage = 5;
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="user-posts">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2>User Posts</h2>
          <ul>
            {currentPosts.map((post) => (
              <li key={post.id}>
                <strong>{post.title}</strong>
                <p>{post.body}</p>
              </li>
            ))}
          </ul>
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <button key={index + 1} onClick={() => paginate(index + 1)}>
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default UserPosts;
