# NodeJs

# Koristi zvaničnu Node.js runtime sliku kao osnovu
FROM node:14

# Postavi radni direktorijum u kontejneru
WORKDIR /app

# Kopiraj package.json i package-lock.json (ako postoji)
COPY package*.json ./

# Instaliraj zavisnosti aplikacije
RUN npm install

# Kopiraj ostatak aplikacionog koda
COPY . .

# Izloži port na kojem će vaša aplikacija raditi
EXPOSE 3000

# Definiši komandu za pokretanje aplikacije
CMD ["npm", "start"]