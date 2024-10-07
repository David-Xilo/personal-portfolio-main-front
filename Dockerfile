# Use an official Node.js runtime as the base image
FROM node:20.5.1-bookworm

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the application code to the container
COPY . .

# Define build-time environment variables
ARG REACT_APP_API_URL=http://localhost:4000
ARG NODE_ENV=production

# Make the build arguments available as environment variables
ENV REACT_APP_API_URL=${REACT_APP_API_URL}
ENV NODE_ENV=${NODE_ENV}

# Build the React app for production
RUN npm run build

# Expose the port on which the app will run
EXPOSE 3000

# Define the command to start the app
CMD ["npm", "start"]