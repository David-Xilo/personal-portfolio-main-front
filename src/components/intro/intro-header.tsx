import React from 'react'
import './intro-header.css'

type ColorScheme = {
  primary: string
  secondary: string
  tertiary?: string
}

interface SectionHeaderProps {
  title: string
  colorScheme: ColorScheme
  variant?: 'simple' | 'enhanced'
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const IntroHeader: React.FC<SectionHeaderProps> = ({
                                                     title,
                                                     colorScheme,
                                                     leftIcon,
                                                     rightIcon
                                                   }) => {
  const getGradientKey = (primary: string, secondary: string, tertiary?: string): string => {
    if (tertiary) {
      return `${primary}-${secondary}-${tertiary}`
    }
    return `${primary}-${secondary}`
  }

  const getReverseGradientKey = (primary: string, secondary: string, tertiary?: string): string => {
    if (tertiary) {
      return `${tertiary}-${primary}`
    }
    return `${secondary}-${primary}`
  }

  const leftIconGradient = getGradientKey(colorScheme.primary, colorScheme.secondary)
  const rightIconGradient = rightIcon && colorScheme.tertiary
    ? getReverseGradientKey(colorScheme.primary, colorScheme.secondary, colorScheme.tertiary)
    : leftIconGradient
  const titleGradient = getGradientKey(colorScheme.primary, colorScheme.secondary, colorScheme.tertiary)

  return (
    <div className="intro-header">
      <div className="intro-header__content">
        {leftIcon && (
          <div className={`intro-header__icon intro-header__icon--${leftIconGradient}`}>
            <div className="intro-header__icon-content">
              {leftIcon}
            </div>
          </div>
        )}

        <h1 className={`intro-header__title intro-header__title--${titleGradient}`}>
          {title}
        </h1>

        {rightIcon && (
          <div className={`intro-header__icon intro-header__icon--${rightIconGradient}`}>
            <div className="intro-header__icon-content">
              {rightIcon}
            </div>
          </div>
        )}
      </div>

      <div className={`intro-header__underline intro-header__underline--${titleGradient}`}></div>
    </div>
  )
}

export { IntroHeader }
