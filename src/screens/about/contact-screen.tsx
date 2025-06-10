import * as React from 'react'

import {ContactRest, useContactGetApi} from '../../hooks/contact-rest'


const ContactItem: React.FC<{contact: ContactRest | null}> = ({contact}) => {
  if (!contact) {
    return null
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header section with background gradient */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-8">
        <div className="text-center">
          {/* Profile area - you could add an avatar here later */}
          <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-2xl font-bold text-white">
              {contact.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">{contact.name}</h2>
          <p className="text-blue-100">Software Engineer</p>
        </div>
      </div>

      {/* Contact information section */}
      <div className="px-6 py-6 space-y-4">
        {/* Email contact */}
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-gray-600 text-sm font-medium">@</span>
            </div>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">Email</p>
            <a
              href={`mailto:${contact.email}`}
              className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
            >
              {contact.email}
            </a>
          </div>
        </div>

        {/* GitHub profile */}
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-gray-600 text-sm font-medium">GH</span>
            </div>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">GitHub</p>
            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
            >
              View Profile
            </a>
          </div>
        </div>

        {/* LinkedIn profile */}
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-gray-600 text-sm font-medium">in</span>
            </div>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">LinkedIn</p>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
            >
              Connect
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

const ContactScreen: React.FC = () => {
  const contactPath = '/about/contact'
  const {status, message, error} = useContactGetApi(contactPath)

  if (status !== 'success') {
    return (
      <div className="max-w-md mx-auto mt-8 p-6 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-800">Unable to load contact information: {error}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <ContactItem contact={message}/>
    </div>
  )
}

export {ContactScreen}
