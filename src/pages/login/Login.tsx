// Login.tsx
import { FC, useState } from 'react';
import { Button, TextInput, Title } from '@mantine/core';
import { useAuthStore } from '../../store/app.store';
import { useNavigate } from 'react-router-dom';
import './login.scss'; // Import the SCSS file specific to the Login component

const Login: FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const isLoggedIn = login(username, password);  // Check authentication

    if (isLoggedIn) {
      navigate('/resources'); // Redirect to resources page after successful login
    } else {
      alert('Invalid username or password'); // Alert if the login failed
    }
  };

  return (
    <div className="login-container"> {/* Container for styling */}
      <Title order={3} className="login-title">Login</Title>
      <form className="login-form" onSubmit={handleLogin}>
        <TextInput
          className="login-input" // Add the class for styling
          label="Username"
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextInput
          className="login-input" // Add the class for styling
          label="Password"
          placeholder='Password'
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" className="login-button">Login</Button> {/* Add class for styling */}
      </form>
     
    </div>
  );
};

export default Login;
