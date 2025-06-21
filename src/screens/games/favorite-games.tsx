import React from 'react'
import './games.css'
import {InfiniteCarousel} from 'components/carousel/infinite-carousel'
import {useGamesPlayedGetApi} from '../../hooks/games-rest'
import {UserGroupIcon} from 'components/icons/user-group-icon'
import {BuildingLibraryIcon} from 'components/icons/building-library-icon'
import {PuzzlePieceIcon} from 'components/icons/puzzle-piece-icon'
import {TrophyIcon} from 'components/icons/trophy-icon'

interface FavoriteGameVisuals {
  emoji: React.ReactNode
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
    emoji: <UserGroupIcon />,
    color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
  },
  "strategy": {
    emoji: <BuildingLibraryIcon />,
    color: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
  },
  "table top": {
    emoji: <PuzzlePieceIcon />,
    color: "linear-gradient(135deg, #feca57 0%, #ff9ff3 100%)"
  },
  "default": {
    emoji: <TrophyIcon />,
    color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
  }
}

const useGameVisuals = (genre: string): FavoriteGameVisuals => {
  // Use useMemo to avoid recalculating on every render
  // This is a pure computation, so we don't need useEffect
  return React.useMemo(() => {
    const normalizedGenre = genre.trim()

    return GENRE_VISUAL_MAP[normalizedGenre] || GENRE_VISUAL_MAP["default"]
  }, [genre])
}

const FavoriteGameCard: React.FC<{ game: FavoriteGame }> = ({ game }) => {
  const visuals = useGameVisuals(game.genre)

  return (
    <div className="infinite-game-card">
      <div className="infinite-game-header">
        <h3 className="infinite-game-title">
          {game.title}
        </h3>

          <div className="infinite-game-icon">
            {visuals.emoji}
          </div>
      </div>

      <div className="infinite-game-content">
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

  const {status, message, error} = useGamesPlayedGetApi('/games/played/carousel')
  if (status !== 'success') {
    return <div>Found error {error}</div>
  }

  return (
    <div className="py-8 px-4">

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-center mb-6" style={{color: 'var(--color-text-primary)'}}>
          Games I love
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
      </div>
    </div>
  )
}

export {FavoriteGamesCarousel}

