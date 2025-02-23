import React, {useState} from 'react'

interface ContentListItemProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

const ContentListItem: React.FC<ContentListItemProps> = ({
title,
description,
children
}) => {
  const [expanded, setExpanded] = useState(false)

  const toggleExpanded = () => {
    setExpanded((prev) => !prev)
  }

  return(
    <div
      className={`
      relative mx-auto my-4 bg-cyan-950 shadow-custom rounded w-[90%] p-8 text-white
        ${expanded ? 'h-full' : 'h-[90%]'}`}
    >
      <button
        onClick={toggleExpanded}
        className="absolute top-2 right-2 bg-blue-500 text-white rounded p-1 hover:bg-blue-600"
      >
        {expanded ? 'Collapse' : 'Open'}
      </button>
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-sm">{description}</p>
      </div>

      {expanded && children && (
        <div className="mt-4">
          {children}
        </div>
      )}
    </div>
  )
}

export {ContentListItem}
