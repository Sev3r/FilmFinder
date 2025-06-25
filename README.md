
# Movie Watchlist App

Een moderne, responsive web applicatie voor het zoeken en beheren van films met persoonlijke watchlists. Gebouwd met React, TypeScript en de TMDB API.

## 🎬 Projectbeschrijving

Deze Movie Watchlist App stelt gebruikers in staat om:
- Films te zoeken via de TMDB (The Movie Database) API
- Films toe te voegen aan een "Want to Watch" lijst
- Films te markeren als bekeken in een "Watched" lijst
- Gepersonaliseerde suggesties te ontvangen gebaseerd op bekeken films
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
   - Vervang de lege `TMDB_API_KEY` constant met jouw API key:
     ```typescript
     const TMDB_API_KEY = 'jouw-api-key-hier';
     ```

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
- **Afbeeldingen:** `https://image.tmdb.org/t/p/w500`

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
- Sticky navigation header
- Loading states en error handling

## 🔧 Development

### Project Structuur
```
src/
├── components/ui/     # Herbruikbare UI componenten
├── hooks/            # Custom React hooks
├── pages/            # App pagina's
│   └── Index.tsx     # Hoofdpagina
├── lib/              # Utility functies
└── index.css         # Globale styles
```

### Scripts
- `npm run dev` - Start development server
- `npm run build` - Build voor productie
- `npm run preview` - Preview productie build

## 🐛 Troubleshooting

### Veelvoorkomende Problemen

1. **"API Key Required" error:**
   - Controleer of je TMDB API key correct is ingesteld
   - Zorg ervoor dat de API key geldig is

2. **Geen films worden getoond:**
   - Controleer je internetverbinding
   - Verify TMDB API status
   - Check browser console voor errors

3. **Watchlist verdwijnt:**
   - Controleer browser localStorage instellingen
   - Zorg dat cookies/localStorage niet worden geblokkeerd

## 📄 Licentie

Dit project is gebouwd voor educatieve doeleinden. TMDB API data is eigendom van The Movie Database.

## 🤝 Bijdragen

Bijdragen zijn welkom! Open een issue of pull request voor verbeteringen.

---

**Gemaakt met ❤️ en veel koffie ☕**
