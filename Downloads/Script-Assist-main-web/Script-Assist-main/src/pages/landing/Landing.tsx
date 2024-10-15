import { useState } from 'react';
import { Title, Button, Text, Card, Input } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/app.store';
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi';
import './Landing.scss';

const Landing = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const questions = [
    { question: 'What is SpaceX?', answer: 'SpaceX is an American aerospace manufacturer and space transportation company founded by Elon Musk in 2002.' },
    { question: 'What are the main goals of SpaceX?', answer: 'SpaceX aims to reduce space transportation costs and enable the colonization of Mars.' },
    { question: 'What is the Falcon 9?', answer: 'Falcon 9 is a reusable rocket designed and manufactured by SpaceX.' },
    { question: 'What is Starship?', answer: 'Starship is a fully reusable spacecraft designed for missions to Mars and beyond.' },
    { question: 'How can I get involved?', answer: 'You can follow us on social media, support our missions, or pursue a career.' },
  ];

  const generateStars = () => {
    const stars = [];
    for (let i = 0; i < 100; i++) {
      stars.push(
        <div
          key={i}
          className="star"
          style={{
            left: `${Math.random() * 100}vw`,
            top: `${Math.random() * 100}vh`,
            width: `${Math.random() * 3}px`,
            height: `${Math.random() * 3}px`,
            animationDuration: `${Math.random() * 1 + 0.5}s`,
          }}
        />
      );
    }
    return stars;
  };

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleLanding = () => {
    navigate('/resources');
  };

  return (
    <div className="landing-container">
      {/* Top Navbar */}
      <nav className="navbar" p="md">
        <img
          src="https://www.metri-tech.com/wp-content/uploads/2017/01/spacex-logo.jpg"
          alt="SpaceX Logo"
          className="navbar-logo"
        />
        <div className="navbar-buttons">
          <Button variant="outline" color="white" onClick={logout} className="login-button">
            Logout
          </Button>
        </div>
      </nav>

      <img 
        src="https://2.bp.blogspot.com/-f4hCZ3i0rV0/Vy30KoMzRQI/AAAAAAAAUPc/rbwDFKEtwz4jj9LNjjFj9X9Wg8G4o8q-wCLcB/s1600/Moon%2Banimated%2Bgifs%2B8.gif" 
        alt="Moon" 
        className="moon-image" 
      />

      <div className="stars">{generateStars()}</div>

      <div className="moon"></div>
      <div className="rocket"></div>

      {/* Hero Section */}
      <div className="hero">
        <Title order={1} className="hero-title">
          Welcome to SpaceX
        </Title>
        <Text size="lg" className="hero-text">
          Join us in the journey to explore the stars and beyond.
        </Text>
        
        {/* Resources Button */}
        <Button onClick={handleLanding} className="resources-button" variant="outline" color="white">
          Resources
        </Button>
      </div>

      <div className="hero-cards">
        <Card className="hero-card">
          <Title order={2}>Join the Mission</Title>
          <Text>Learn more about our initiatives and how you can contribute.</Text>
        </Card>
        <Card className="hero-card">
          <Title order={2}>Explore Our Technology</Title>
          <Text>Discover the groundbreaking technology behind SpaceX missions.</Text>
        </Card>
        <Card className="hero-card">
          <Title order={2}>Careers at SpaceX</Title>
          <Text>Be part of our innovative team and help shape the future.</Text>
        </Card>
      </div>

      <div className="qa-footer-section">
        <div className="qa-section">
          <div className="stars">{generateStars()}</div>
          <Title order={2} className="qa-title">Frequently Asked Questions</Title>
          <div className="qa-items">
            {questions.map((item, index) => (
              <div className="qa-item" key={index}>
                <div className="qa-question" onClick={() => handleToggle(index)}>
                  <Text>{item.question}</Text>
                  <span className="qa-icon">{activeIndex === index ? '-' : '+'}</span>
                </div>
                {activeIndex === index && (
                  <Text className="qa-answer">{item.answer}</Text>
                )}
              </div>
            ))}
          </div>
        </div>

        <footer className="footer">
          <div className="stars">{generateStars()}</div>
          <div className="footer-container">
            <div className="footer-left">
              <Text size="lg" weight={500}>Stay Updated</Text>
              <Input className="newsletter-input" placeholder="Enter your email" />
            </div>
            <div className="footer-right">
              <Text className="footer-links">About | Careers | Contact</Text>
              <div className="contact-info">
                <div className="contact-item">
                  <FiMapPin /> <Text>Location: Hawthorne, CA</Text>
                </div>
                <div className="contact-item">
                  <FiMail /> <Text>Email: info@spacex.com</Text>
                </div>
                <div className="contact-item">
                  <FiPhone /> <Text>Phone: +1 (310) 420-8700</Text>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Landing;
