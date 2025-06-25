import React from 'react'
import './intro-cards.css'

type ColorOption =
  | 'purple'
  | 'pink'
  | 'cyan'
  | 'violet'
  | 'emerald'
  | 'teal'
  | 'blue'
  | 'green'

interface IntroductionCardProps {
  color: ColorOption
  title: string
  icon: React.ReactNode
  children: React.ReactNode
}

const IntroductionCard: React.FC<IntroductionCardProps> = ({
  color,
  title,
  icon,
  children,
}) => {
  return (
    <div className={`intro-card intro-card--${color}`}>
      <div className="intro-card__icon-container">
        {icon && <div className="intro-card__icon">{icon}</div>}
      </div>

      <h3 className="intro-card__title">{title}</h3>

      <div className="intro-card__description">{children}</div>
    </div>
  )
}

export {IntroductionCard}
