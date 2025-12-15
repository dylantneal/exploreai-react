import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';
import ParticleNetwork from '../components/ui/ParticleNetwork';
import Button from '../components/ui/Button';
import styles from '../styles/pages/NotFound.module.css';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <ParticleNetwork particleCount={40} connectionDistance={100} />
      
      <div className={styles.content}>
        <h1 className={styles.errorCode}>404</h1>
        <h2 className={styles.title}>Page Not Found</h2>
        <p className={styles.message}>
          The page you're looking for doesn't exist or has been moved. 
          Let's get you back on track.
        </p>
        
        <div className={styles.actions}>
          <Button to="/" size="large">
            <Home size={18} />
            Go Home
          </Button>
          <Button to="/research" variant="secondary" size="large">
            <Search size={18} />
            Explore Research
          </Button>
        </div>

        <div className={styles.links}>
          <p>Or try one of these:</p>
          <ul>
            <li><Link to="/insights">View Insights</Link></li>
            <li><Link to="/about">About Clarity Lab</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

