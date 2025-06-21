import React from 'react'

type ColorScheme = {
  primary: string
  secondary: string
  tertiary?: string
}

interface SectionHeaderProps {
  title: string
  colorScheme: ColorScheme
  variant?: 'simple' | 'enhanced'
  leftIcon?: string | React.ReactNode // emoji string or SVG element
  rightIcon?: string // emoji string (only for enhanced variant)
}

const colorClasses = {
  // Icon background gradients
  iconGradients: {
    'cyan-blue': 'bg-gradient-to-br from-cyan-500 to-blue-500',
    'emerald-teal': 'bg-gradient-to-br from-emerald-500 to-teal-500',
    'blue-emerald': 'bg-gradient-to-br from-blue-500 to-emerald-500',
    'purple-pink': 'bg-gradient-to-br from-purple-500 to-pink-500',
    'cyan-purple': 'bg-gradient-to-br from-cyan-500 to-purple-500'
  },
  // Title text gradients
  titleGradients: {
    'cyan-blue': 'bg-gradient-to-r from-cyan-400 to-blue-400',
    'emerald-teal-blue': 'bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-400',
    'purple-pink-cyan': 'bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400'
  },
  // Underline gradients
  underlineGradients: {
    'cyan-blue': 'bg-gradient-to-r from-cyan-500 to-blue-500',
    'emerald-teal-blue': 'bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500',
    'purple-pink-cyan': 'bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500'
  }
}

const IntroHeader: React.FC<SectionHeaderProps> = ({
                                                       title,
                                                       colorScheme,
                                                       variant = 'enhanced',
                                                       leftIcon,
                                                       rightIcon
                                                     }) => {
  const isSimple = variant === 'simple'

  // Build gradient keys based on color scheme
  const iconGradientKey = `${colorScheme.primary}-${colorScheme.secondary}` as keyof typeof colorClasses.iconGradients
  const titleGradientKey = colorScheme.tertiary
    ? `${colorScheme.primary}-${colorScheme.secondary}-${colorScheme.tertiary}` as keyof typeof colorClasses.titleGradients
    : `${colorScheme.primary}-${colorScheme.secondary}` as keyof typeof colorClasses.titleGradients

  // Get the appropriate gradient classes
  const leftIconGradient = colorClasses.iconGradients[iconGradientKey] || colorClasses.iconGradients['cyan-blue']
  const rightIconGradient = rightIcon && colorScheme.tertiary
    ? colorClasses.iconGradients[`${colorScheme.tertiary}-${colorScheme.primary}` as keyof typeof colorClasses.iconGradients] || colorClasses.iconGradients['cyan-blue']
    : ''
  const titleGradient = colorClasses.titleGradients[titleGradientKey] || colorClasses.titleGradients['cyan-blue']
  const underlineGradient = colorClasses.underlineGradients[titleGradientKey] || colorClasses.underlineGradients['cyan-blue']

  // Conditional classes based on variant
  const containerClasses = 'text-center mb-8'
  const headerFlexClasses = 'inline-flex items-center gap-3 mb-4'
  const iconSizeClasses = 'w-12 h-12'
  const iconRoundingClasses = isSimple ? 'rounded-xl' : 'rounded-2xl'
  const iconContentClasses = isSimple ? 'w-6 h-6' : 'text-2xl'
  const titleSizeClasses = 'text-4xl'
  const underlineSizeClasses = 'w-24'

  return (
    <div className={containerClasses}>
      <div className={headerFlexClasses}>
        {leftIcon && (
          <div className={`
            ${iconSizeClasses} 
            ${leftIconGradient} 
            ${iconRoundingClasses} 
            flex items-center justify-center
            ${!isSimple ? 'transform rotate-3' : ''}
          `}>
            {typeof leftIcon === 'string' ? (
              <span className={iconContentClasses}>{leftIcon}</span>
            ) : (
              <div className={`${iconContentClasses} text-white`}>
                {leftIcon}
              </div>
            )}
          </div>
        )}

        <h1 className={`
          ${titleSizeClasses} 
          font-bold 
          ${titleGradient} 
          bg-clip-text text-transparent
          inline-flex
        `}>
          {title}
        </h1>

        {rightIcon && (
          <div className={`
            ${iconSizeClasses} 
            ${rightIconGradient} 
            ${iconRoundingClasses} 
            flex items-center justify-center transform -rotate-3
          `}>
            <span className={iconContentClasses}>{rightIcon}</span>
          </div>
        )}
      </div>

      {/* Underline */}
      <div className={`${underlineSizeClasses} h-1 ${underlineGradient} mx-auto rounded-full`}></div>
    </div>
  )
}

export { IntroHeader }
