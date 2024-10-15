import { FC, useState } from 'react';
import { Button, TextInput, PasswordInput, Text, Card } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/app.store'; // Import zustand store
import './Login.scss';
import loginVideo from '../../assets/login.mp4'; // Import the video

const Login: FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Access login function from zustand store
  const login = useAuthStore((state) => state.login);

  const handleLogin = () => {
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    const isLoginSuccessful = login(username, password);

    if (isLoginSuccessful) {
      setError('');
      navigate('/'); // Redirect to landing page after successful login
    } else {
      setError('Invalid username or password');
    }
  };

  return (
   
    <div className="login-container">
      {/* Video background */}
      <video
        className="video-background"
        autoPlay
        muted
        loop
      >
        <source src={loginVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      <Card shadow="sm" padding="lg" className="login-card">
    
        <Text size="lg" weight={500} className="login-title">Login</Text>
        <div className="login-form">
          <TextInput
            label="Username"
            placeholder="Enter your username"
            value={username}
            onChange={(event) => setUsername(event.currentTarget.value)}
            required
            className="login-input" // Ensure it uses the same class
          />
          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => setPassword(event.currentTarget.value)}
            required
            className="login-input" // Ensure it uses the same class
          />
          {error && <Text color="red">{error}</Text>}
          <Button onClick={handleLogin} fullWidth className="login-button" mt="md">
            Submit
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Login;
