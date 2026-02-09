export type Language = "it" | "en"
export type Sport = "home" | "calcio" | "volley"

export const translations = {
  it: {
    // Navigation
    registerNow: "Iscriviti Ora",
    adminArea: "Area Admin",
    home: "Home",
    aboutUs: "Chi Siamo",
    shop: "Negozio",
    selectSport: "Seleziona Sport",
    calcio: "Calcio",
    volley: "Volley",

    // Hero Section
    footballTournament: "Football Tournament 2026",
    heroTag: "Il Torneo di Calcio a 5 più Famoso di Salerno",
    heroTitle: "Benvenuti alla",
    heroSubtitle:
      "Il torneo che unisce passione, competizione e divertimento. Partecipa con la tua squadra e vivi un'esperienza indimenticabile sui campi di Salerno.",
    registerTeam: "Registra la Tua Squadra",
    learnMore: "Scopri di Più",

    // Info Cards
    tournamentInfo: "Informazioni Torneo",
    tournamentDates: "Date del Torneo",
    when: "Quando",
    whenDesc: "Prossimamente....",
    matchTimes: "Orari Partite",
    matchTimesDesc: "Prossimamente....",
    location: "Sede",
    where: "Dove",
    whereDesc: "Via Nicola Acocella 7, campetto di Sanfrancesco",
    whoCanParticipate: "Chi Può Partecipare",
    whoDesc: "Squadre di 5-8 giocatori, aperto a tutti gli appassionati di calcio a 5.",
    rules: "Regole",
    rulesDesc:
      "Formato 11 contro 11, tempi da 45 minuti, regole FIFA standard. Minimo 6 giocatori richiesti per registrarsi.",
    contact: "Contatti",
    contactDesc: "Email: sanfracup@gmail.com | Telefono: +39 340 6272496",
    prizes: "Premi",
    prizesDesc: "Prossimamente....",

    // Tournament Rules
    tournamentBasicRules: "Regole Base del Torneo",
    tournamentRules: "Regole del Torneo",
    teamComposition: "Composizione Squadra",
    minPlayers: "Minimo 6 giocatori per squadra",
    maxPlayers: "Massimo 8 giocatori per squadra",
    uniqueNumber: "Ogni giocatore deve avere un numero di maglia unico",
    format: "Formato",
    sixPlayers: "Calcio a 5 giocatori",
    phases: "Fase a gironi seguita da fase eliminatoria",
    referees: "Arbitri professionisti",
    downloadRegulations: "Regolamento Generale del Torneo",
    downloadRegulationsDesc: "Scarica il regolamento completo in formato PDF",

    // Registration
    teamRegistration: "Registrazione Squadra",
    teamRegistrationDesc: "Registra la tua squadra per il Torneo SanfraCup (Minimo 6 giocatori richiesti)",

    // CTA
    readyToJoin: "Pronto a Partecipare?",
    ctaDesc: "Registra la tua squadra ora e preparati a vivere un'esperienza sportiva unica alla SanfraCup!",
    startRegistration: "Inizia la Registrazione",
    registrationsClosed: "Registrazioni Chiuse",
    registrationsClosedDesc:
      "Le registrazioni sono attualmente chiuse. Contatta gli organizzatori per maggiori informazioni.",

    // Footer
    footerText: "© 2026 SanfraCup - Torneo di Calcio a 5 - Salerno",

    // Social Media
    followSocial: "SEGUITECI SUI NOSTRI SOCIAL PER RIMANERE AGGIORNATI!",
    instagram: "Instagram",
    tiktok: "TikTok",
  },
  en: {
    // Navigation
    registerNow: "Register Now",
    adminArea: "Admin Area",
    home: "Home",
    aboutUs: "About Us",
    shop: "Shop",
    selectSport: "Select Sport",
    calcio: "Football",
    volley: "Volleyball",

    // Hero Section
    footballTournament: "Football Tournament 2026",
    heroTag: "The Most Famous 5-a-Side Football Tournament in Salerno",
    heroTitle: "Welcome to",
    heroSubtitle:
      "The tournament that brings together passion, competition and fun. Join with your team and experience an unforgettable experience on the fields of Salerno.",
    registerTeam: "Register Your Team",
    learnMore: "Learn More",

    // Info Cards
    tournamentInfo: "Tournament Information",
    tournamentDates: "Tournament Dates",
    when: "When",
    whenDesc: "Coming Soon....",
    matchTimes: "Match Times",
    matchTimesDesc: "Coming Soon....",
    location: "Location",
    where: "Where",
    whereDesc: "Via Nicola Acocella 7, Sanfrancesco field",
    whoCanParticipate: "Who Can Participate",
    whoDesc: "Teams of 5-8 players, open to all 5-a-side football enthusiasts.",
    rules: "Rules",
    rulesDesc: "11-a-side format, 45-min halves, FIFA standard rules apply. Minimum 6 players required to register.",
    contact: "Contact",
    contactDesc: "Email: sanfracup@gmail.com | Phone: +39 340 6272496",
    prizes: "Prizes",
    prizesDesc: "Coming Soon....",

    // Tournament Rules
    tournamentBasicRules: "Basic Tournament Rules",
    tournamentRules: "Tournament Rules",
    teamComposition: "Team Composition",
    minPlayers: "Minimum 6 players per team",
    maxPlayers: "Maximum 8 players per team",
    uniqueNumber: "Each player must have a unique jersey number",
    format: "Format",
    sixPlayers: "5-a-side football",
    phases: "Group stage followed by knockout phase",
    referees: "Professional referees",
    downloadRegulations: "Full Tournament Regulations",
    downloadRegulationsDesc: "Download the complete regulations in PDF format",

    // Registration
    teamRegistration: "Team Registration",
    teamRegistrationDesc: "Register your team for the SanfraCup Tournament (Minimum 6 players required)",

    // CTA
    readyToJoin: "Ready to Join?",
    ctaDesc: "Register your team now and get ready to experience a unique sporting experience at SanfraCup!",
    startRegistration: "Start Registration",
    registrationsClosed: "Registrations Closed",
    registrationsClosedDesc: "Registrations are currently closed. Contact the organizers for more information.",

    // Footer
    footerText: "© 2026 SanfraCup - 5-a-Side Football Tournament - Salerno",

    // Social Media
    followSocial: "FOLLOW US ON SOCIAL MEDIA TO STAY UPDATED!",
    instagram: "Instagram",
    tiktok: "TikTok",
  },
}

export function getTranslation(lang: Language, key: keyof typeof translations.it): string {
  return translations[lang][key]
}
