#Setup

Node.js (versio)
Projektin luonti: npm init
Käynnistys: npm start
Express-kirjaston käyttöön otto: npm install express (versio: "^4.18.2")
Nodemonin asennus: npm install --save-dev nodemon (kehitysaikainen riippuvuus)
Määritellään npm-skripti: "dev": "nodemon index.js"
Asennetaan cors: npm install cors
Asennetaan mongoose: npm install mongoose
Asennetaan dotenv: npm install dotenv 
Asennukset: mongodb??

#Käynnistys
Kloonaa repo
npm install
npm start tai npm run dev
npm install mongoose-paginate-v2 -> poista!!!

#Validointi
https://pypi.org/project/csvvalidator/
https://github.com/alimanfoo/csvvalidator -> SIISTI TIEDOSTOJA


#datan vieminen tietokantaan (CMD:n kautta)
C:\Program Files\MongoDB\Tools>mongoimport --uri "mongodb+srv://juliamalin:xxxxxxxx@cluster0.qakohat.mongodb.net/Journey?retryWrites=true&w=majority" --collection journeys --type csv --file "C:\training\Bikeapp\valid_rows2021-05.csv" --headerline

 C:\Program Files\MongoDB\Tools>mongoimport --uri "mongodb+srv://juliamalin:xxxxxxxx@cluster0.qakohat.mongodb.net/Journey?retryWrites=true&w=majority" --collection journeys --type csv --file "C:\training\Bikeapp\valid_rows2021-06.csv" --headerline

  C:\Program Files\MongoDB\Tools>mongoimport --uri "mongodb+srv://juliamalin:xxxxxxxx@cluster0.qakohat.mongodb.net/Journey?retryWrites=true&w=majority" --collection journeys --type csv --file "C:\training\Bikeapp\valid_rows2021-07.csv" --headerline


  //git käsittelee päätteet

  git config core.autocrlf true
