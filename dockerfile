# Utiliser une image Node.js officielle basée sur Alpine pour construire l'application
FROM node:20-alpine

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste de l'application dans le conteneur
COPY . .

# Construire l'application pour la production
RUN npm run build

# Installer 'serve' globalement
RUN npm install -g serve

# Exposer le port 3000
EXPOSE 3000

# Lancer 'serve' pour servir l'application construite
CMD ["serve", "-s", "build"]
