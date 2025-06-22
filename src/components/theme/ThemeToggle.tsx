import React, { useEffect, useState } from 'react'
import { SunIcon } from './sun-icon'
import { MoonIcon } from './moon-icon'

interface ThemeToggleProps {
  className?: string
}

type Theme = 'light' | 'dark'

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme')
      return savedTheme === 'dark' ? 'dark' : 'light'
    }
    return 'light'
  })

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark-theme')
    } else {
      document.documentElement.classList.remove('dark-theme')
    }

    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
  }

  const isDarkMode = theme === 'dark'
  const nextTheme = isDarkMode ? 'light' : 'dark'

  return (
    <button
      onClick={toggleTheme}
      className={`theme-toggle-button ${className}`}
      aria-label={`Switch to ${nextTheme} mode`}
    >
      {isDarkMode ? <SunIcon /> : <MoonIcon />}
    </button>
  )
}

export { ThemeToggle }
