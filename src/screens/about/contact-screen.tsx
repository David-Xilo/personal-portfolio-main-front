import * as React from 'react'

import {ContactRest, useContactGetApi} from '../../hooks/contact-rest'


const ContactItem: React.FC<{contact: ContactRest | null}> = ({contact}) => {
  if (!contact || !contact.name || !contact.email) {
    return (
      <div className="max-w-md mx-auto mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-black">Contact information is incomplete</p>
        <p className="text-black">{contact?.name}</p>
        <p className="text-black">{contact?.email}</p>
      </div>
    )
  }

  const firstLetter = contact.name?.charAt(0)?.toUpperCase() || '?'

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-8">
        <div className="text-center">
          <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-2xl font-bold text-white">
              {firstLetter}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">{contact.name}</h2>
          <p className="text-blue-100">Software Developer</p>
        </div>
      </div>

      {/* Ensure the contact section has proper click event handling */}
      <div className="px-6 py-6 space-y-4">
        {contact.email && (
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-gray-600 text-sm font-medium">@</span>
              </div>
            </div>
            <div className="flex-1 min-w-0"> {/* min-w-0 prevents layout issues */}
              <p className="text-sm font-medium text-gray-900">Email</p>
              <a
                href={`mailto:${contact.email}`}
                className="text-blue-600 hover:text-blue-800 transition-colors duration-200 block"
                onClick={() => console.log('Email clicked:', contact.email)}
              >
                {contact.email}
              </a>
            </div>
          </div>
        )}

        {contact.github && (
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-gray-600 text-sm font-medium">GH</span>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">GitHub</p>
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition-colors duration-200 block cursor-pointer"
                onClick={() => console.log('GitHub clicked:', contact.github)}
              >
                View Profile
              </a>
            </div>
          </div>
        )}

        {contact.linkedin && (
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-gray-600 text-sm font-medium">in</span>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">LinkedIn</p>
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition-colors duration-200 block cursor-pointer"
                onClick={() => console.log('LinkedIn clicked:', contact.linkedin)}
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
