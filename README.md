#BikeApp

Bike App on sovellus, joka on suunniteltu tarjoamaan tietoa pyöräasemista ja matkoista. Sen avulla käyttäjät voivat saada tiedot pyöräillyistä matkoista, tarkastella asemien ​​tietoja sekä lisätä matkoja. 

##OMINAISUUDET
- Pyöräiltyjen matkojen etsiminen lähtö- tai saapumisaseman nimen perusteella tai matkan keston perusteella
- Pyöräasemien haku nimen perusteella
- Mahdollisuus tarkastella yksityiskohtaisia ​​tietoja pyöräasemista (nimi, osoite, lähtevien ja saapuvien matkoja lkm, lähtevien ja saapuvien matkojen keskimääräinen pituus, asemalta lähtevien matkoja top5 paluuasemat, asemalle saapuvien matkojen top5 lähtöasemat)
- Mahdollisuus lisätä uusi matka antamalla lomakkeelle matkan tiedot

##KÄYTETYT TEKNIIKAT
Back End: Node.js, Express.js, JavaScript, MongoDB aggregation framework syntax 
Front End: React, HTML, CSS, JavaScript, Redux
Tietokanta: MongoDB

Valitsin Back Endiin Node.js:n sekä tietokannaksi Mongon, koska olin juuri perehtynyt niihin ja halusin harjoitella niiden käyttöä lisää. Front Endin puolella käytin Reactia, koska se oli entuudestaan tuttu ja siksi siltä puolelta itsellä vahvimmin hallussa. Ohjelmointikielenä käytin pääosin JavaScriptiä. 

##ASENNUS
1. Sovellus on viety Renderiin ja löytyy osoitteessa https://bikeapp-usnx.onrender.com/

2. Localhostissa:
- Avaa komentotulkki
- Kloonaa repository: git clone https://github.com/juliamalin/Bikeapp
- Määritä ympäristömuuttujat: tee ./BikeappServer-kansioon .env-tiedosto: .env-tiedostoon tulee merkata MONGODB_URI sekä PORT=3001 (tiedosto ei gitissä)
- Suorita polussa ./BikeappServer komento: npm install
- Käynnistä serveri polussa ./BikeappServer: node index.js <MongoTietokannan salasana>
- Huom! Frontille tehty build ja frontin API-tiedostossa käytetty suhteellistä URL-osoitetta, koko sovellus siis toimii localhost:3001:ssä!


##TESTIT
Datan oikeellisuutta testaavat testit löytyvät seuraavasta polusta: ./BikeappServer/
Huom! vaatii toimiakseen .env-tiedoston, johon asetettuna ympäristömuuttuja MONGODB_URI
Avaa terminaali VSCodessa: View > Terminal
Kirjoita terminaaliin: node datasettest.js (polussa./BikeappServer)
Testaus käynnistyy

Virhekäsittelyä löytyy uusien matkojen lisäämiseen tarkoitetun lomakkeen osalta Clientin puolella addJourney-tiedostossa.

##TODO
- Testit, jotka testaavat API-toimintoja frontin sekä back endin puolella
- Käyttöliittymän testaus
- Uuden matkan lisäämisen yhteydessä aika tallentuu tietokantaan vielä väärin, tämän korjaaminen

##HUOM!!
Sovelluksen koodi löytyy Gitissä Bikeapp-repositoryn haarasta 'master'

