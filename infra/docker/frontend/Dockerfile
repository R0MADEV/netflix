FROM node:18-alpine
WORKDIR /frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
EXPOSE 3000
ENV NEXT_TELEMETRY_DISABLED=1
CMD ["npm", "run", "dev"]
