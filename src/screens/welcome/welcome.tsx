import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {CLEAR_HIDDEN_NAV} from '../../reducers/hidden-menu-reducer'
import {CLEAR_SUB_NAV, MainMenuProps} from '../../reducers/sub-menu-reducer'
import {IntroHeader} from 'components/intro/intro-header'
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
  const welcomeCards = [
    {
      to: '/tech',
      className: 'tech-card',
      icon: '💻',
      title: 'Technology',
      text: 'Explore my tech projects and experiments',
    },
    {
      to: '/games',
      className: 'games-card',
      icon: '🎮',
      title: 'Gaming',
      text: 'Hobby game development',
    },
    {
      to: '/finance',
      className: 'finance-card',
      icon: '📊',
      title: 'Finance',
      text: 'Discover technical projects applied to finance',
    },
  ]

  return (
    <div className="welcome-container">
      <IntroHeader
        title="Welcome!"
        colorScheme={{primary: 'cyan', secondary: 'purple'}}
      />

      <div className="welcome-content">
        <p className="welcome-intro">
          Hello! Welcome to my personal page. I've made this to hold myself
          accountable and start posting my personal projects.
        </p>

        <p className="welcome-navigation">
          You can navigate through my interests and discover something that
          resonates with you:
        </p>

        <div className="welcome-cards">
          {welcomeCards.map(card => (
            <Link
              key={card.to}
              to={card.to}
              className={`welcome-card ${card.className}`}
            >
              <div className="welcome-icon">
                <span role="img" aria-label={`${card.title} icon`}>
                  {card.icon}
                </span>
              </div>
              <h3 className="welcome-card-title">{card.title}</h3>
              <p className="welcome-card-text">{card.text}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export {WelcomeScreen}
