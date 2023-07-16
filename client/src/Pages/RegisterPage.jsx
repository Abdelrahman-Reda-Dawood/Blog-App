import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function register(ev) {
    ev.preventDefault();
    
    try {
      const response = await fetch('http://localhost:4000/register', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.status === 200) {
        Swal.fire({
          text: 'Registeration done successfully',
          icon: 'success',
        }).then(() => {
          navigate('/login');
        });
      } else {
        Swal.fire({
          text: 'registration failed, check your information',
          icon: 'error',
        });
      }
    } catch (err) {
      throw err;
    }
  }

  return (
    <div>
      <h1 className="title">Register</h1>
      <form className="register" onSubmit={register}>
        <input
          type="text"
          placeholder="UserName"
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button>Register</button>
      </form>
    </div>
  );
}
