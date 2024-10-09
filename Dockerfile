# Use an official Node.js runtime as the base image
FROM node:20.5.1-bookworm AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the application code to the container
COPY . .

# Build the React app for production
RUN npm run build

RUN ls -la /app/dist

RUN npm install -g serve

# Expose the port on which the app will run
EXPOSE 3000

# Define the command to start the app
CMD ["serve", "-s", "dist", "-l", "3000"]