import * as React from 'react'
import {ContactRest, useContactGetApi} from '../../hooks/contact-rest'
import './about.css'

const ContactItem: React.FC<{contact: ContactRest | null}> = ({contact}) => {
  // Handle incomplete contact data with exact original styling preserved
  if (!contact || !contact.name || !contact.email) {
    return (
      <div className="message-warning">
        <p className="message-warning-text">
          Contact information is incomplete
        </p>
        <p className="debug-text">Name: {contact?.name}</p>
        <p className="debug-text">Email: {contact?.email}</p>
      </div>
    )
  }

  // Safe extraction of first letter - exactly as original
  const firstLetter = contact.name?.charAt(0)?.toUpperCase() || '?'

  return (
    <div className="contact-card">
      {/* Header section - maintains exact gradient and spacing */}
      <div className="contact-card-header">
        <div className="contact-profile-section">
          {/* Avatar circle - preserves exact size and background opacity */}
          <div className="contact-profile-avatar">
            <span className="contact-profile-avatar-text">{firstLetter}</span>
          </div>
          <h2 className="contact-profile-name">{contact.name}</h2>
          <p className="contact-profile-subtitle">Casual Human</p>
        </div>
      </div>

      {/* Contact information - maintains exact spacing and layout */}
      <div className="contact-card-body">
        {/* Email row - preserves exact structure */}
        {contact.email && (
          <div className="contact-info-row">
            <div className="contact-info-icon">
              <span className="contact-info-icon-text">@</span>
            </div>
            <div className="contact-info-content">
              <p className="contact-info-label">Email</p>
              <a
                href={`mailto:${contact.email}`}
                className="contact-info-link"
                onClick={() => console.log('Email clicked:', contact.email)}
              >
                {contact.email}
              </a>
            </div>
          </div>
        )}

        {/* GitHub row - exact preservation */}
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
                onClick={() => console.log('GitHub clicked:', contact.github)}
              >
                View Profile
              </a>
            </div>
          </div>
        )}

        {/* LinkedIn row - exact preservation */}
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
                onClick={() =>
                  console.log('LinkedIn clicked:', contact.linkedin)
                }
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

const ContactScreen: React.FC = () => {
  const contactPath = '/about/contact'
  const {status, message, error} = useContactGetApi(contactPath)

  // Handle API error states with layout-conscious error display
  if (status !== 'success') {
    return (
      // Use extracted class that works within the layout system
      <div className="contact-screen-container">
        <div className="error-message-container">
          <p className="error-message-text">
            Unable to load contact information: {error}
          </p>
        </div>
      </div>
    )
  }

  // Successful state with layout-conscious container
  return (
    <div className="contact-screen-container">
      <ContactItem contact={message}/>
    </div>
  )
}

export {ContactScreen}
