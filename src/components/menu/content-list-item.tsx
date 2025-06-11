import React, {useState} from 'react'
import {ArrowUpIcon} from 'components/menu/arrow-up-icon'
import {ArrowDownIcon} from 'components/menu/arrow-down-icon'

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

  return (
    <div className="content-list-item">
      <button onClick={toggleExpanded} className="content-list-item-button">
        {expanded ? <ArrowUpIcon /> : <ArrowDownIcon />}
      </button>
      <div>
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
