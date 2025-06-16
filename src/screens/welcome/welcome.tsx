import * as React from 'react'
import {useEffect} from 'react'
import {CLEAR_HIDDEN_NAV} from '../../reducers/hidden-menu-reducer'
import {CLEAR_SUB_NAV, MainMenuProps} from '../../reducers/sub-menu-reducer'
import {Link} from 'react-router-dom'
import './welcome.css'

const WelcomeScreen: React.FC<MainMenuProps> = ({
  subMenuDispatch,
  hiddenMenuDispatch,
}) => {
  useEffect(() => {
    hiddenMenuDispatch({type: CLEAR_HIDDEN_NAV})
    subMenuDispatch({type: CLEAR_SUB_NAV})
  }, [subMenuDispatch, hiddenMenuDispatch])

  return <WelcomeContent />
}
const WelcomeContent: React.FC = () => {
  return (
    <div className="welcome-container">
      {/* Hero section with gradient background */}
      <div className="welcome-hero">
        <div className="welcome-overlay">
          <h1 className="welcome-title">Welcome!</h1>
        </div>
      </div>

      {/* Main content section */}
      <div className="welcome-content">
        <p className="welcome-intro">
          Hello! Welcome to my personal page. I've made this to hold myself accountable
          and start posting my personal projects.
        </p>

        <p className="welcome-navigation">
          You can navigate through my interests and discover something that resonates with you:
        </p>

        {/* Interest cards grid */}
        <div className="welcome-cards">
          <Link to="/tech" className="welcome-card tech-card">
            <div className="welcome-icon">💻</div>
            <h3 className="welcome-card-title">Technology</h3>
            <p className="welcome-card-text">Explore my tech projects and experiments</p>
          </Link>

          <Link to="/games" className="welcome-card games-card">
            <div className="welcome-icon">🎮</div>
            <h3 className="welcome-card-title">Gaming</h3>
            <p className="welcome-card-text">Check out my game development journey</p>
          </Link>

          <Link to="/finance" className="welcome-card finance-card">
            <div className="welcome-icon">📊</div>
            <h3 className="welcome-card-title">Finance</h3>
            <p className="welcome-card-text">Discover financial insights and analysis</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export {WelcomeScreen}
