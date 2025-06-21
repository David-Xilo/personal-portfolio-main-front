import * as React from 'react'
import { useState, useEffect, useRef } from 'react'
import { ContactRest, useContactGetApi } from '../../hooks/contact-rest'
import './about.css'

interface ContactItemProps {
  contact: ContactRest | null;
  variant?: 'default' | 'compact' | 'minimal';
  maxWidth?: string;
}

const ContactItem: React.FC<ContactItemProps> = ({
                                                   contact,
                                                   variant = 'default',
                                                   maxWidth
                                                 }) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState<number>(0)

  // Monitor container width changes for additional responsive behavior
  useEffect(() => {
    const updateWidth = () => {
      if (cardRef.current) {
        setContainerWidth(cardRef.current.offsetWidth)
      }
    }

    // Set initial width
    updateWidth()

    // Update on resize
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  // Handle incomplete contact data with responsive error display
  if (!contact || !contact.name || !contact.email) {
    return (
      <div
        className={`message-warning ${variant === 'compact' ? 'message-warning--compact' : ''}`}
        style={{ maxWidth }}
      >
        <p className="message-warning-text">
          Contact information is incomplete
        </p>
        {variant !== 'minimal' && (
          <>
            <p className="debug-text">Name: {contact?.name || 'Missing'}</p>
            <p className="debug-text">Email: {contact?.email || 'Missing'}</p>
          </>
        )}
      </div>
    )
  }

  // Safe extraction of first letter
  const firstLetter = contact.name?.charAt(0)?.toUpperCase() || '?'

  // Dynamic class names based on variant and container width
  const getCardClasses = () => {
    let classes = 'contact-card'

    if (variant === 'compact') classes += ' contact-card--compact'
    if (variant === 'minimal') classes += ' contact-card--minimal'
    if (containerWidth > 0 && containerWidth < 320) classes += ' contact-card--narrow'

    return classes
  }

  // Determine what contact info to show based on variant and space
  const shouldShowField = (field: keyof ContactRest): boolean => {
    if (variant === 'minimal') {
      // In minimal mode, only show email
      return field === 'email'
    }
    if (variant === 'compact' && containerWidth < 280) {
      // In very narrow compact mode, prioritize email and one social link
      return field === 'email' || (field === 'github')
    }
    return true
  }

  return (
    <div
      ref={cardRef}
      className={getCardClasses()}
      style={{ maxWidth }}
    >
      {/* Header section with conditional content based on variant */}
      <div className="contact-card-header">
        <div className="contact-profile-section">
          {/* Avatar - hide in minimal variant when very narrow */}
          {!(variant === 'minimal' && containerWidth < 250) && (
            <div className="contact-profile-avatar">
              <span className="contact-profile-avatar-text">{firstLetter}</span>
            </div>
          )}

          <h2 className="contact-profile-name">{contact.name}</h2>

          {/* Subtitle - hide in compact/minimal variants when space is tight */}
          {variant === 'default' || containerWidth > 300 ? (
            <p className="contact-profile-subtitle">Casual Human</p>
          ) : null}
        </div>
      </div>

      {/* Contact information with smart field filtering */}
      <div className="contact-card-body">
        {/* Email row - always show if data exists */}
        {contact.email && shouldShowField('email') && (
          <div className="contact-info-row">
            <div className="contact-info-icon">
              <span className="contact-info-icon-text">@</span>
            </div>
            <div className="contact-info-content">
              <p className="contact-info-label">Email</p>
              <a
                href={`mailto:${contact.email}`}
                className="contact-info-link"
                title={contact.email} // Tooltip for truncated text
              >
                {/* Truncate long emails in narrow containers */}
                {containerWidth < 280 && contact.email.length > 25
                  ? `${contact.email.substring(0, 22)}...`
                  : contact.email
                }
              </a>
            </div>
          </div>
        )}

        {/* GitHub row - conditionally shown */}
        {contact.github && shouldShowField('github') && (
          <div className="contact-info-row">
            <div className="contact-info-icon">
              <span className="contact-info-icon-text">GH</span>
            </div>
            <div className="contact-info-content">
              <p className="contact-info-label">GitHub</p>
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-info-link"
                title="View GitHub Profile"
              >
                View Profile
              </a>
            </div>
          </div>
        )}

        {/* LinkedIn row - conditionally shown */}
        {contact.linkedin && shouldShowField('linkedin') && (
          <div className="contact-info-row">
            <div className="contact-info-icon">
              <span className="contact-info-icon-text">in</span>
            </div>
            <div className="contact-info-content">
              <p className="contact-info-label">LinkedIn</p>
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-info-link"
                title="Connect on LinkedIn"
              >
                Connect
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

interface ContactScreenProps {
  /** Optional variant to control how the contact card renders */
  variant?: 'default' | 'compact' | 'minimal';
  /** Optional class name for the container */
  className?: string;
  /** Optional maximum width constraint */
  maxWidth?: string;
}

const ContactScreen: React.FC<ContactScreenProps> = ({
                                                       variant = 'default',
                                                       className = '',
                                                       maxWidth
                                                     }) => {
  const contactPath = '/about/contact'
  const { status, message, error } = useContactGetApi(contactPath)

  // Handle API error states with responsive error display
  if (status !== 'success') {
    return (
      <div className={`contact-screen-container ${className}`}>
        <div className="error-message-container" style={{ maxWidth }}>
          <p className="error-message-text">
            Unable to load contact information: {error}
          </p>
        </div>
      </div>
    )
  }

  // Successful state with responsive container
  return (
    <div className={`contact-screen-container ${className}`}>
      <ContactItem
        contact={message}
        variant={variant}
        maxWidth={maxWidth}
      />
    </div>
  )
}

// Export both components for different use cases
export { ContactScreen, ContactItem }