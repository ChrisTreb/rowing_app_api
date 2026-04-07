# ---- Base image ----
FROM node:20-alpine

# ---- Create app directory ----
WORKDIR /app

# ---- Install dependencies ----
COPY package*.json ./
RUN npm install

# ---- Copy source code ----
COPY . .

# ---- Environment ----
ENV NODE_ENV=production
ENV PORT=3000

# ---- Expose port ----
EXPOSE 3000

# ---- Start app ----
CMD ["node", "src/server.js"]