
# Movie Watchlist App

Een moderne, responsive web applicatie voor het zoeken en beheren van films met persoonlijke watchlists. Gebouwd met React, TypeScript en de TMDB API.

## 🎬 Projectbeschrijving

Deze Movie Watchlist App stelt gebruikers in staat om:
- Films te zoeken via de TMDB (The Movie Database) API
- Films toe te voegen aan een "Want to Watch" lijst
- Films te markeren als bekeken in een "Watched" lijst
- Gepersonaliseerde suggesties te ontvangen gebaseerd op bekeken films
- **Gedetailleerde filminformatie te bekijken in een popup-venster**
- **Film trailers te bekijken met volledige audio-ondersteuning**
- Hun watchlists lokaal op te slaan
- Te schakelen tussen dark en light mode
- De app te gebruiken op desktop, tablet en mobiele apparaten

## 🚀 Gebruikte Technologieën

- **React 18** - Voor de gebruikersinterface
- **TypeScript** - Voor type-safe development
- **Tailwind CSS** - Voor styling en responsive design
- **shadcn/ui** - Voor UI componenten
- **Lucide React** - Voor pictogrammen
- **TMDB API** - Voor film data en informatie
- **YouTube Embed API** - Voor trailer integratie
- **Vite** - Voor development en build tooling

## 📦 Installatie-instructies

### Vereisten
- Node.js (versie 16 of hoger)
- npm of yarn package manager
- TMDB API key (gratis verkrijgbaar op [themoviedb.org](https://www.themoviedb.org/settings/api))

### Installatie stappen

1. **Clone het project:**
   ```bash
   git clone <repository-url>
   cd movie-watchlist-app
   ```

2. **Installeer dependencies:**
   ```bash
   npm install
   ```

3. **API Key configuratie:**
   - Ga naar [TMDB API Settings](https://www.themoviedb.org/settings/api)
   - Maak een gratis account aan als je er nog geen hebt
   - Genereer een API key
   - Open `src/pages/Index.tsx`
   - De API key is al ingesteld: `42a407a31ab21dca87db67cb353fefe4`

4. **Start de development server:**
   ```bash
   npm run dev
   ```

5. **Open de applicatie:**
   - Ga naar `http://localhost:8080` in je browser

## 🔗 API-brongebruik

### TMDB API
De app gebruikt The Movie Database (TMDB) API voor alle film gerelateerde data:

- **Base URL:** `https://api.themoviedb.org/3`
- **Endpoints gebruikt:**
  - `/movie/popular` - Voor populaire films
  - `/search/movie` - Voor film zoekfunctionaliteit  
  - `/discover/movie` - Voor gepersonaliseerde suggesties
  - `/movie/{id}` - Voor gedetailleerde filminformatie
  - `/movie/{id}/videos` - Voor trailers en video content
- **Afbeeldingen:** 
  - Posters: `https://image.tmdb.org/t/p/w500`
  - Backdrops: `https://image.tmdb.org/t/p/w1280`

### YouTube API Integration
- Trailers worden ingebed via YouTube's embed API
- Volledige audio-ondersteuning voor alle trailers
- Automatische filtering voor officiële trailers

### Rate Limiting
De TMDB API heeft rate limiting:
- 40 requests per 10 seconden
- De app implementeert geen rate limiting, dus gebruik met mate

### Data Usage
Alle API responses worden lokaal gecached waar mogelijk om de gebruikerservaring te verbeteren en API calls te minimaliseren.

## ✨ Functies van de App

### 🔍 Film Zoeken
- Zoek films op titel via de TMDB database
- Bekijk populaire films bij het opstarten
- Gedetailleerde film informatie inclusief poster, rating en releasejaar

### 📝 Watchlist Beheer
- **Want to Watch lijst:** Voeg films toe die je wilt bekijken
- **Watched lijst:** Markeer films als bekeken
- Automatische verwijdering uit watchlist wanneer gemarkeerd als bekeken
- Lokale opslag - geen account vereist

### 🎯 Gepersonaliseerde Suggesties
- Suggesties gebaseerd op genres van bekeken films
- Intelligente aanbevelingen met hoge ratings
- Automatische updates wanneer nieuwe films worden bekeken

### 🎬 **Gedetailleerde Film Popup**
- **Klik op een film** om een uitgebreide popup te openen
- **Filmachtergrond en poster** - Visueel aantrekkelijke weergave
- **Basisinformatie** - Releasejaar, speelduur, en IMDb-rating
- **Genres** - Kleurgecodeerde genre-tags
- **Volledige samenvatting** - Uitgebreide filmomschrijving
- **Interactieve knoppen** - Direct toevoegen aan lijsten vanuit popup

### 🎥 **Trailer Integratie**
- **YouTube trailers** direct in de popup afspelen
- **Volledige audio-ondersteuning** - Klik op play voor geluid
- **HD-kwaliteit** trailers waar beschikbaar
- **Automatische trailer detectie** - Alleen officiële trailers worden getoond
- **Responsive video player** - Werkt op alle apparaten

### 🌙 Dark/Light Mode
- Volledig themeable interface
- Automatische detectie van systeemvoorkeur
- Smooth overgangen tussen thema's

### 📱 Responsive Design
- **Mobile-first** ontwerp
- Optimaal voor smartphones (320px+)
- Tablet ondersteuning (768px+)
- Desktop ervaring (1024px+)
- Touch-friendly interface elementen

### 💾 Data Persistentie
- LocalStorage voor offline functionaliteit
- Geen account registratie vereist
- Data blijft behouden tussen sessies

### 🎨 Gebruikersinterface
- Moderne, intuïtieve interface
- Hover effecten en smooth animaties
- Card-based movie display
- **Modal dialogs** voor gedetailleerde weergave
- Sticky navigation header
- Loading states en error handling

## 🔧 Development

### Project Structuur
```
src/
├── components/ui/     # Herbruikbare UI componenten
├── hooks/            # Custom React hooks
├── pages/            # App pagina's
│   └── Index.tsx     # Hoofdpagina (669 regels - overweeg refactoring)
├── lib/              # Utility functies
└── index.css         # Globale styles
```

### Scripts
- `npm run dev` - Start development server
- `npm run build` - Build voor productie
- `npm run preview` - Preview productie build

## 🆕 Recente Updates

### Versie 2.0 - Uitgebreide Film Details
- ✅ **Film Details Popup** - Volledig nieuwe modal interface
- ✅ **Trailer Integratie** - YouTube trailers met audio
- ✅ **Verbeterde UI** - Backdrop afbeeldingen en betere lay-out
- ✅ **Genre Weergave** - Kleurgecodeerde genre tags
- ✅ **Runtime Display** - Speelduur in uur:minuut formaat

### Versie 1.0 - Basis Functionaliteit
- ✅ TMDB API integratie
- ✅ Film zoeken en weergave
- ✅ Watchlist management
- ✅ Dark/light mode
- ✅ Responsive design
- ✅ Lokale data opslag

## 🐛 Troubleshooting

### Veelvoorkomende Problemen

1. **"API Key Required" error:**
   - API key is al geconfigureerd in de code
   - Als de error blijft bestaan, controleer internetverbinding

2. **Geen films worden getoond:**
   - Controleer je internetverbinding
   - Verify TMDB API status
   - Check browser console voor errors

3. **Trailers spelen niet af:**
   - Controleer of YouTube niet geblokkeerd is
   - Sommige trailers zijn mogelijk niet beschikbaar in je regio
   - Klik expliciet op de play-knop voor audio

4. **Watchlist verdwijnt:**
   - Controleer browser localStorage instellingen
   - Zorg dat cookies/localStorage niet worden geblokkeerd

5. **Popup opent niet:**
   - Controleer of popups niet geblokkeerd zijn in je browser
   - Refresh de pagina als er JavaScript errors zijn

## 🚀 Toekomstige Uitbreidingen

### Geplande Features
- **User Authentication** - Supabase integratie voor cross-device sync
- **Movie Reviews** - Gebruikersreviews en ratings
- **Advanced Filtering** - Filter op genre, jaar, rating, etc.
- **Watchlist Export** - Export naar verschillende formaten
- **Social Features** - Deel watchlists met vrienden
- **Offline Mode** - Cached data voor offline gebruik

### Technische Verbeteringen
- **Code Refactoring** - Index.tsx opsplitsen in kleinere componenten
- **Performance** - Lazy loading en virtualization
- **Testing** - Unit en integration tests
- **CI/CD** - Automated testing en deployment

## 📄 Licentie

Dit project is gebouwd voor educatieve doeleinden. TMDB API data is eigendom van The Movie Database.

## 🤝 Bijdragen

Bijdragen zijn welkom! Open een issue of pull request voor verbeteringen.

---

**Gemaakt met ❤️ en veel koffie ☕**
**Nu met 🎬 trailers en uitgebreide filmdetails!**
