import React from 'react'
import {useState, useEffect, useRef} from 'react'
import {ContactRest, useContactGetApi} from '../../api/hooks/contact-rest'
import Loader from '../loader/loader'
import './contact-item.css'

interface ContactItemProps {
  contact: ContactRest | null
  variant?: 'default' | 'compact'
  maxWidth?: string
}

const ContactItem: React.FC<ContactItemProps> = ({
  contact,
  variant = 'default',
  maxWidth,
}) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState<number>(0)

  useEffect(() => {
    const updateWidth = () => {
      if (cardRef.current) {
        setContainerWidth(cardRef.current.offsetWidth)
      }
    }

    updateWidth()

    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  if (!contact || !contact.name || !contact.email) {
    return (
      <div
        className={`message-warning ${variant === 'compact' ? 'message-warning--compact' : ''}`}
        style={{maxWidth}}
      >
        <p className="message-warning-text">
          Contact information is incomplete
        </p>
      </div>
    )
  }

  const getCardClasses = () => {
    let classes = 'contact-card'

    if (variant === 'compact') classes += ' contact-card--compact'
    if (containerWidth > 0 && containerWidth < 320)
      classes += ' contact-card--narrow'

    return classes
  }

  const emailFontSize = variant === 'compact' ? 'contact-email-compact' : ''

  return (
    <div ref={cardRef} className={getCardClasses()} style={{maxWidth}}>
      <div className="contact-card-header">
        <div className="contact-profile-section">
          <h2 className="contact-profile-name">{contact.name}</h2>

          {variant === 'default' || containerWidth > 300 ? (
            <p className="contact-profile-subtitle">Casual Human</p>
          ) : null}
        </div>
      </div>

      <div className="contact-card-body">
        {contact.email && (
          <div className="contact-info-row">
            <div className="contact-info-icon">
              <span className="contact-info-icon-text">@</span>
            </div>
            <div className="contact-info-content">
              <p className="contact-info-label">Email</p>
              <a
                href={`mailto:${contact.email}`}
                className={`contact-info-link ${emailFontSize}`}
                title={contact.email}
              >
                {containerWidth < 280 && contact.email.length > 25
                  ? `${contact.email.substring(0, 22)}...`
                  : contact.email}
              </a>
            </div>
          </div>
        )}

        {contact.github && (
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

        {contact.linkedin && (
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

        {contact.credly && (
          <div className="contact-info-row">
            <div className="contact-info-icon">
              <span className="contact-info-icon-text">C</span>
            </div>
            <div className="contact-info-content">
              <p className="contact-info-label">Credly</p>
              <a
                href={contact.credly}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-info-link"
                title="Connect on LinkedIn"
              >
                Certifications
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

interface ContactScreenProps {
  variant?: 'default' | 'compact'
  className?: string
  maxWidth?: string
}

const ContactScreen: React.FC<ContactScreenProps> = ({
  variant = 'default',
  className = '',
  maxWidth,
}) => {
  const contactPath = '/about/contact'
  const {status, message, error} = useContactGetApi(contactPath)

  if (status === 'loading' || status === '') {
    return (
      <div className={`contact-screen-container ${className}`}>
        <Loader />
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className={`contact-screen-container ${className}`}>
        <div className="error-message-container" style={{maxWidth}}>
          <p className="error-message-text">
            Unable to load contact information: {error}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={`contact-screen-container ${className}`}>
      <ContactItem contact={message} variant={variant} maxWidth={maxWidth} />
    </div>
  )
}

export {ContactScreen, ContactItem}
