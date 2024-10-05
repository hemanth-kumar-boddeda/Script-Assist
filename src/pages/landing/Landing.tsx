// Landing.tsx
import { FC } from 'react';
import { Title, Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import './Landing.scss'; // Import the SCSS file specific to the Landing component

const Landing: FC = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/login'); // Navigate to the login page
  };

  return (
    <div className="landing-container">
		      <img src="https://media.licdn.com/dms/image/v2/D4E0BAQGGTW44TB2HcA/company-logo_200_200/company-logo_200_200/0/1690791509118/script_assist_uk_logo?e=2147483647&v=beta&t=I-XgDIRpzPOLst_9J_Kl74q7fvy4xfSvp6ZRMCbQkBc" alt="Script Assist UK Logo" className="logo" /> {/* Add logo */}

      <Title order={1} className="landing-title">Script Assist</Title>
      <p className="landing-text">
	  Script Assist is an online platform that gives doctors and clinics the tools they need to prescribe medical cannabis appropriately, effectively and safely in their private clinical setting. 
      </p>
      <Button className="landing-button" onClick={handleLoginRedirect}>Login</Button>
    </div>
  );
};

export default Landing;
