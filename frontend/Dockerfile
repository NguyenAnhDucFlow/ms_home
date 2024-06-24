# # frontend/Dockerfile
# FROM node:18-alpine as build

# WORKDIR /app

# COPY package.json .
# COPY package-lock.json .
# RUN npm install

# COPY . .
# RUN npm run build

# FROM nginx:alpine
# COPY --from=build /app/build /usr/share/nginx/html

# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
FROM nginx:alpine

# Copy the build files from the local build directory to the nginx html directory
COPY build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Run nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
