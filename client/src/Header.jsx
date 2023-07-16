import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import './App.css';
import { UserContext } from './UserContext';

export default function Header() {
  const { userInfo, setUserInfo } = useContext(UserContext);
  try {
    useEffect(() => {
      fetch('http://localhost:4000/profile', { credentials: 'include' }).then(
        (response) => {
          response.json().then((userInfo) => {
            setUserInfo(userInfo);
          });
        }
      );
    }, []);
  } catch (err) {
    throw new Error(err);
  }

  function logout() {
    try {
      fetch('http://localhost:4000/logout', {
        credentials: 'include',
        method: 'POST',
      });
      setUserInfo(null);
      Swal.fire({
        icon: 'success',
        text: 'You are logged out!',
      });
    } catch (err) {
      throw err;
    }
  }

  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo">
        MyBlog
      </Link>
      <nav>
        {username && (
          <>
            <Link to="/create">Create new post</Link>
            <Link to={'/'} onClick={logout}>
              Logout
            </Link>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
