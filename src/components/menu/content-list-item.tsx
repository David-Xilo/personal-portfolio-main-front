import React, {useState} from 'react'
import {ArrowUpIcon} from 'components/icons/arrow-up-icon'
import {ArrowDownIcon} from 'components/icons/arrow-down-icon'
import './content-list.css'

interface ContentListItemProps {
  title: string
  description: string
  children?: React.ReactNode
}

const ContentListItem: React.FC<ContentListItemProps> = ({
  title,
  description,
  children,
}) => {
  const [expanded, setExpanded] = useState(false)

  const toggleExpanded = () => {
    setExpanded(prev => !prev)
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      toggleExpanded()
    }
  }

  return (
    <div
      className={`content-list-item ${expanded ? 'expanded' : ''}`}
      onClick={toggleExpanded}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-expanded={expanded}
      aria-label={`${expanded ? 'Collapse' : 'Expand'} ${title}`}
    >
      <div className="content-list-item-arrow">
        {expanded ? <ArrowUpIcon /> : <ArrowDownIcon />}
      </div>
      <div className="content-list-item-content">
        <h1 className="content-list-item-title">{title}</h1>
        <p className="content-list-item-description">{description}</p>
      </div>

      {expanded && children && (
        <div className="content-list-item-children">{children}</div>
      )}
    </div>
  )
}

export {ContentListItem}
