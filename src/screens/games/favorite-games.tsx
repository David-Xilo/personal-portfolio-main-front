import React, { useEffect, useRef } from 'react'
import './games.css'
import {InfiniteCarousel} from 'components/carousel/infinite-carousel'

// Game interface
interface FavoriteGame {
  title: string
  genre: string
  description?: string
  rating?: number,
  emoji?: string
  color?: string
}

const InfiniteGameCard: React.FC<{ game: FavoriteGame }> = ({ game }) => {
  console.log('Rendering game card:', game.title)

  return (
    <div className="infinite-game-card">
      {/* Image section with gradient background */}
      <div
        className="infinite-game-image"
        style={{
          background: game.color || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }}
      >
        <span style={{ fontSize: '2.5rem' }}>
          {game.emoji || '🎮'}
        </span>
      </div>

      {/* Content section */}
      <div className="infinite-game-content">
        <h3 className="infinite-game-title">
          {game.title}
        </h3>
        <p className="infinite-game-genre">
          {game.genre}
        </p>
        {game.description && (
          <p className="infinite-game-description">
            {game.description}
          </p>
        )}
      </div>
    </div>
  )
}

const FavoriteGamesCarousel: React.FC = () => {

  // Your favorite games with detailed descriptions
  const favoriteGames: FavoriteGame[] = [
    {
      title: "The Witcher 3: Wild Hunt",
      genre: "Open World RPG",
      description: "An incredible narrative-driven RPG that taught me the importance of meaningful player choices and world-building in game design.",
      rating: 4,
      emoji: "⚔️",
      color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    {
      title: "Civilization VI",
      genre: "Turn-Based Strategy",
      rating: 4,
      emoji: "🏛️",
      color: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      description: "The perfect blend of complexity and accessibility. Every decision feels important and strategic - great inspiration for UI design.",
    },
    {
      title: "Hollow Knight",
      genre: "Metroidvania",
      rating: 4,
      emoji: "🗡️",
      color: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      description: "A masterclass in atmospheric design and tight gameplay mechanics. Every area feels unique and memorable.",
    },
    {
      title: "Portal 2",
      genre: "Puzzle Platformer",
      rating: 4,
      emoji: "🔵",
      color: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      description: "Brilliant puzzle design that gradually introduces complexity. The perfect example of 'easy to learn, hard to master.'",
    },
    {
      title: "Factorio",
      genre: "Automation & Management",
      rating: 4,
      emoji: "⚙️",
      color: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      description: "The ultimate game for systematic thinkers. Building efficient systems mirrors good software architecture principles.",
    }
  ]

  return (
    <div className="py-8 px-4">

      {/* Infinite games carousel */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-center mb-6" style={{color: 'var(--color-text-primary)'}}>
          Games That Shape My Development Philosophy 🎮
        </h2>
        <InfiniteCarousel
          items={favoriteGames}
          renderItem={(game, index) => {
            console.log('Rendering item at index:', index, game.title)
            return <InfiniteGameCard game={game} />
          }}
          size="medium"
          className="mb-4"
          showArrows={true}
          showIndicators={true}
        />
        <p className="text-center text-sm max-w-lg mx-auto" style={{color: 'var(--color-text-secondary)'}}>
          Navigate infinitely with arrows or click the dots below • Use keyboard arrow keys for quick browsing •
          From first to last, last to first - it never ends!
        </p>
      </div>
    </div>
  )
}

export {FavoriteGamesCarousel}

