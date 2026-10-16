# ChatRTC – Comunicació en Temps Real amb Socket.IO

Pràctica de 2n DAW per a l'assignatura d'Entorn Servidor i RTC (Real-Time Communication). Desenvolupament d'un xat en temps real mitjançant Node.js, Express i Socket.IO, sense necessitat de recarregar la pàgina ni realitzar consultes periòdiques (*polling*).

---

## 🚀 Requisits i Instal·lació

1. **Requisits previs**:
   - [Node.js](https://nodejs.org/) (versió 18 o superior recomanada)
   - npm

2. **Instal·lació de dependències**:
   ```bash
   npm install
   ```

3. **Execució del servidor**:
   ```bash
   node app.js
   ```
   *Alternativament, en mode desenvolupament amb reinici automàtic:*
   ```bash
   node --watch app.js
   ```

4. **Accés a l'aplicació**:
   Obre el teu navegador a [http://localhost:3000](http://localhost:3000).

---

## 🛠️ Funcionalitats Implementades (Part Obligatòria)

### 1. Entrada al xat (Login)
- Formulari inicial que sol·licita un àlies abans d'accedir al xat.
- Validació tant al client com al servidor: el nom no pot estar buit ni contenir únicament espais en blanc, amb un límit màxim de **20 caràcters**.
- El xat es manté amagat i deshabilitat fins que l'usuari s'identifica correctament.
- Un cop dins, es mostra de manera visible el nom amb què s'està participant a la capçalera.

### 2. Interfície del xat
- **Capçalera**: Inclou el títol del xat, el nom de l'usuari actiu i un indicador dinàmic de l'**estat de connexió** (`Connectat` en verd / `Desconnectat` en vermell).
- **Zona de missatges**: Àrea amb alçada fitada i desplaçament vertical automàtic (*scroll*), permetent consultar converses extenses còmodament.
- **Formulari d'enviament**: Camp de text (amb límit de 500 caràcters) i botó "Send", funcional tant fent clic com prement la tecla `Enter`.
- **Estructura separada**: Codi CSS organitzat a `style.css` servit de forma estàtica amb `express.static`.

### 3. Enviament i Recepció de Missatges
- Comunicació bidireccional en temps real amb Socket.IO mitjançant l'esdeveniment `chat message`.
- Format de cada missatge: `[HH:mm] NomUsuari: Text del missatge`.
- Protecció contra vulnerabilitats XSS inserint contingut exclusivament mitjançant `textContent`.

### 4. Validació al Servidor i Gestió de la Connexió
- **Validació en el backend (`app.js`)**: El servidor verifica estrictament els tipus de dades, comprova que els camps no estiguin buits i valida la longitud màxima (20 caràcters per al nom i 500 per al missatge).
- **Hora generada pel servidor**: Per garantir la coherència i evitar manipulacions del client, l'hora del missatge (`new Date().toLocaleTimeString(...)`) és generada íntegrament pel servidor abans de difondre el missatge.
- **Gestió de caigudes de xarxa / desconnexió**:
  - En desconnectar-se el servidor o perdre la connexió (`disconnect`), l'estat passa automàticament a **Desconnectat**, i es desactiven el camp d'escriptura i el botó d'enviar.
  - **Es preserva el text** que l'usuari estigués teclejant en el moment del tall.
  - Quan es restableix la connexió (`connect`), els camps es tornen a habilitar automàticament sense duplicar receptors d'esdeveniments.

---

## 📋 Resposta a les qüestions de l'enunciat

> **Indiqueu quines ampliacions heu completat:**  
> S'ha completat al 100% la **Part Obligatòria**, complint tots els requeriments d'entrada al xat, validacions al client i servidor, generació de timestamps al backend, estats de connexió, i interfície amb estils modulars.

---

## 📹 Vídeo i Captures de Comprovació

*Per adjuntar en el lliurament de l'activitat:*
- Captures o vídeo demostratiu amb dues pestanyes independents mostrant:
  1. Entrada amb dos noms diferents.
  2. Enviament bidireccional de missatges entre ambdues sessions.
  3. Comprovació de l'estat de connexió en aturar el servidor (`Ctrl + C`) i tornar-lo a iniciar.
  4. Comprovació de les validacions (intents d'enviament de camps buits o excessius).
