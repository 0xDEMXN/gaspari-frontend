# Gaspari Frontend

Step essenziali per avviare il frontend:

## 1. Clonare la repository

Apri una nuova finestra del Terminale, assicurati di essere nella directory di destinazione che preferisci ed esegui:
```yaml
git clone https://github.com/0xDEMXN/gaspari-frontend
```

## 2. Inizializzazione

Per inizializzare il progetto, esegui questi comandi, uno per volta:
```yaml
cd gaspari-frontend # posizionati all'interno della directory del progetto
yarn # installa tutte le dipendenze e gli script che servono
cp .env.example .env # fai una copia del file environment di esempio
```

## 3. Configurare le API

Se non hai apportato alcuna modifica al backend, dovresti già essere pronto per l'avvio, altrimenti modifica la seguente stringa dal file `.env` con il tuo URL per le API.
```yaml
VITE_API_URL = http://localhost:8000/api
```

## 4. Avvio

Per avviare il frontend, esegui il seguente comando:
```yaml
yarn dev
```

Se hai fatto tutto correttamente, sulla tua console apparirà un link al quale troverai la pagina di gestione dei profili utente.