import React from 'react'

type ColorOption = 'purple' | 'pink' | 'cyan' | 'violet' | 'emerald' | 'teal' | 'blue' | 'green'

interface IntroductionCardProps {
  color: ColorOption
  title: string
  icon: React.ReactNode
  children: React.ReactNode // Description text
}

const colorClasses = {
  purple: {
    gradient: 'bg-gradient-to-br from-purple-800/50 to-purple-900/50',
    border: 'border-purple-500/30 hover:border-purple-400/60',
    shadow: 'hover:shadow-xl hover:shadow-purple-500/20',
    iconBg: 'bg-purple-500/30',
    iconBgSolid: 'bg-purple-500/20',
    title: 'text-purple-300',
    icon: 'text-purple-400',
    borderSolid: 'border-slate-600/30 hover:border-purple-500/50'
  },
  pink: {
    gradient: 'bg-gradient-to-br from-pink-800/50 to-pink-900/50',
    border: 'border-pink-500/30 hover:border-pink-400/60',
    shadow: 'hover:shadow-xl hover:shadow-pink-500/20',
    iconBg: 'bg-pink-500/30',
    iconBgSolid: 'bg-pink-500/20',
    title: 'text-pink-300',
    icon: 'text-pink-400',
    borderSolid: 'border-slate-600/30 hover:border-pink-500/50'
  },
  cyan: {
    gradient: 'bg-gradient-to-br from-cyan-800/50 to-cyan-900/50',
    border: 'border-cyan-500/30 hover:border-cyan-400/60',
    shadow: 'hover:shadow-xl hover:shadow-cyan-500/20',
    iconBg: 'bg-cyan-500/30',
    iconBgSolid: 'bg-cyan-500/20',
    title: 'text-cyan-300',
    icon: 'text-cyan-400',
    borderSolid: 'border-slate-600/30 hover:border-cyan-500/50'
  },
  violet: {
    gradient: 'bg-gradient-to-br from-violet-800/50 to-violet-900/50',
    border: 'border-violet-500/30 hover:border-violet-400/60',
    shadow: 'hover:shadow-xl hover:shadow-violet-500/20',
    iconBg: 'bg-violet-500/30',
    iconBgSolid: 'bg-violet-500/20',
    title: 'text-violet-300',
    icon: 'text-violet-400',
    borderSolid: 'border-slate-600/30 hover:border-violet-500/50'
  },
  emerald: {
    gradient: 'bg-gradient-to-br from-emerald-800/50 to-emerald-900/50',
    border: 'border-emerald-500/30 hover:border-emerald-400/60',
    shadow: 'hover:shadow-xl hover:shadow-emerald-500/20',
    iconBg: 'bg-emerald-500/30',
    iconBgSolid: 'bg-emerald-500/20',
    title: 'text-emerald-300',
    icon: 'text-emerald-400',
    borderSolid: 'border-slate-600/30 hover:border-emerald-500/50'
  },
  teal: {
    gradient: 'bg-gradient-to-br from-teal-800/50 to-teal-900/50',
    border: 'border-teal-500/30 hover:border-teal-400/60',
    shadow: 'hover:shadow-xl hover:shadow-teal-500/20',
    iconBg: 'bg-teal-500/30',
    iconBgSolid: 'bg-teal-500/20',
    title: 'text-teal-300',
    icon: 'text-teal-400',
    borderSolid: 'border-slate-600/30 hover:border-teal-500/50'
  },
  blue: {
    gradient: 'bg-gradient-to-br from-blue-800/50 to-blue-900/50',
    border: 'border-blue-500/30 hover:border-blue-400/60',
    shadow: 'hover:shadow-xl hover:shadow-blue-500/20',
    iconBg: 'bg-blue-500/30',
    iconBgSolid: 'bg-blue-500/20',
    title: 'text-blue-300',
    icon: 'text-blue-400',
    borderSolid: 'border-slate-600/30 hover:border-blue-500/50'
  },
  green: {
    gradient: 'bg-gradient-to-br from-green-800/50 to-green-900/50',
    border: 'border-green-500/30 hover:border-green-400/60',
    shadow: 'hover:shadow-xl hover:shadow-green-500/20',
    iconBg: 'bg-green-500/30',
    iconBgSolid: 'bg-green-500/20',
    title: 'text-green-300',
    icon: 'text-green-400',
    borderSolid: 'border-slate-600/30 hover:border-green-500/50'
  }
}

const IntroductionCard: React.FC<IntroductionCardProps> = ({
                                                             color,
                                                             title,
                                                             icon,
                                                             children
                                                           }) => {
  const iconSizeClasses = 'w-12 h-12'
  const iconTextSize = 'w-6 h-6'

  const colors = colorClasses[color]

  const backgroundClasses = colors.gradient

  const borderClasses = colors.border

  const shadowClasses = colors.shadow

  const iconBgClasses = colors.iconBg

  return (
    <div
      className={`
        ${backgroundClasses} 
        rounded-xl p-6 border 
        ${borderClasses} 
        transition-all duration-300 
        hover:transform hover:scale-105 
        ${shadowClasses}
      `}
    >
      <div
        className={`
          ${iconSizeClasses} 
          ${iconBgClasses} 
          rounded-xl
          flex items-center justify-center mb-4
        `}
      >
        {icon && (
          <div className={`${iconTextSize} ${colors.icon}`}>
            {icon}
          </div>
        )}
      </div>

      <h3 className={`text-lg font-bold ${colors.title} mb-3`}>
        {title}
      </h3>

      <div className="text-slate-300 text-sm leading-relaxed">
        {children}
      </div>
    </div>
  )
}

export { IntroductionCard }

