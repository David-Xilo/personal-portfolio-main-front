import React from 'react'
import './games.css'
import {InfiniteCarousel} from 'components/carousel/infinite-carousel'
import {useGamesPlayedGetApi} from '../../hooks/games-rest'

interface FavoriteGameVisuals {
  emoji: string
  color: string
}

interface FavoriteGame {
  title: string
  genre: string
  description?: string
  rating?: number
}

const GENRE_VISUAL_MAP: Record<string, FavoriteGameVisuals> = {
  "RPG": {
    emoji: "⚔️",
    color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
  },
  "strategy": {
    emoji: "🏛️",
    color: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
  },
  "table top": {
    emoji: "🧭",
    color: "linear-gradient(135deg, #feca57 0%, #ff9ff3 100%)"
  },
  "default": {
    emoji: "🎮",
    color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
  }
}

const useGameVisuals = (genre: string): FavoriteGameVisuals => {
  // Use useMemo to avoid recalculating on every render
  // This is a pure computation, so we don't need useEffect
  return React.useMemo(() => {
    // Normalize genre string to handle case sensitivity and extra spaces
    const normalizedGenre = genre.trim()

    // Return the mapped visuals or fall back to default
    return GENRE_VISUAL_MAP[normalizedGenre] || GENRE_VISUAL_MAP["default"]
  }, [genre])
}

const FavoriteGameCard: React.FC<{ game: FavoriteGame }> = ({ game }) => {
  const visuals = useGameVisuals(game.genre)

  return (
    <div className="infinite-game-card">
      {/* Header section with title and emoji */}
      <div className="infinite-game-header">
        <h3 className="infinite-game-title">
          {game.title}
        </h3>

        {/* Small circular emoji container */}
        <div
          className="infinite-game-emoji-circle"
          style={{
            background: visuals.color
          }}
        >
          <span className="infinite-game-emoji">
            {visuals.emoji}
          </span>
        </div>
      </div>

      {/* Content section with genre and conditional description */}
      <div className="infinite-game-content">
        <p className="infinite-game-genre">
          {game.genre}
        </p>

        {/* Description that will hide on smaller containers */}
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

  const {status, message, error} = useGamesPlayedGetApi('/games/played/carousel')
  if (status !== 'success') {
    return <div>Found error {error}</div>
  }

  return (
    <div className="py-8 px-4">

      {/* Infinite games carousel */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-center mb-6" style={{color: 'var(--color-text-primary)'}}>
          Games that left a mark on me
        </h2>
        <InfiniteCarousel
          items={message}
          renderItem={(game, index) => {
            console.log('Rendering item at index:', index, game.title)
            return <FavoriteGameCard game={game} />
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

