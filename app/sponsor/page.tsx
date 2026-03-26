"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { ArrowLeft } from "lucide-react"
import SponsorCard from "@/components/sponsor-card"
import { type Language, type Sport } from "@/lib/i18n"

const sponsors = [
  {
    id: "grill-house",
    name: "Grill House",
    subtitle: "Partner Ufficiale",
    backText: "Il principale punto di riferimento per gli amanti della carne.",
    description: "A due passi dal Corso, GRILL HOUSE rappresenta oggi, per Salerno, il principale punto di riferimento per gli amanti della carne. Nasce con l'obiettivo di fondere un ambiente giovanile e di intrattenimento con una cucina diversificata e di qualità. Un'offerta che spazia dagli antipasti alla carne, dai primi ai dolci, tutti rigorosamente artigianali, oltre ad un vasto assortimento di birre. La location moderna e tecnologica consente di trascorrere ore piacevoli avvolti in un'atmosfera calda e luminosa.",
    address: "Via Giovan Angelo Papio, 39, 84122 Salerno SA",
    image: "/images/sponsors/grill-house.jpg",
    features: ["Carne alla brace", "Cucina artigianale", "Birre artigianali"]
  },
  {
    id: "mythos",
    name: "Mythos",
    subtitle: "Partner Ufficiale",
    backText: "Un angolo di Grecia nel cuore di Salerno.",
    description: "Dal 2001 Mythos Ristorante Greco è un angolo di Grecia nel cuore di Salerno. I colori, l'atmosfera, la musica del locale accompagnano la tradizione culinaria greca. I piatti tipici e genuini, seguendo esclusivamente le ricette originali, sono preparati con prodotti freschi. Inoltre, Mythos Ristorante Greco propone prodotti di importazione greca, frutto dell'esperienza ultradecennale e della continua ricerca, al fine di offrire una completa esperienza ellenica. La qualità dei prodotti e l'ambiente confortevole e caratteristico, insieme alla gentilezza e disponibilità del personale, ha reso negli anni Mythos Ristorante Greco un punto di riferimento per palati delicati e curiosi.",
    address: "Via Roma, 62 / Via Dalmazia, 39 - Salerno",
    image: "/images/sponsors/mythos.png",
    features: ["Cucina greca", "Prodotti freschi", "Dal 2001"]
  },
  {
    id: "caffe-grieco",
    name: "Caffe Grieco",
    subtitle: "Partner Ufficiale",
    backText: "Molto più di un caffè.",
    description: "La storia di Grieco Industria del Caffè inizia nel 1952 quando Alfonso Grieco, fondatore dell'azienda, realizza la sua prima miscela di caffè, all'interno dell'antica torrefazione nella città di Salerno. Da allora crescita e sviluppo hanno caratterizzato il lungo percorso di evoluzione ed oggi nel nuovo stabilimento di via Acquasanta, nella zona orientale della città si svolge la produzione. La scelta delle materie prime accuratamente selezionate ed il tradizionale procedimento di tostatura portano alla realizzazione di un espresso dolce, corposo e aromatico.",
    address: "Via Roberto Wenner, 5, 84131 Salerno SA",
    image: "/images/sponsors/grieco.jpg",
    features: ["Espresso italiano", "Dal 1952", "Tostatura tradizionale"]
  },
  {
    id: "quanto-basta",
    name: "Quanto Basta",
    subtitle: "Partner Ufficiale",
    backText: "Un'oasi gastronomica nel cuore di Salerno.",
    description: "Il Ristorante Pizzeria Quanto Basta si trova in pieno centro a Salerno. Il nostro ristorante pizzeria tipico italiano, situato nel cuore del centro, è un'accogliente oasi gastronomica che celebra l'autentica cucina italiana. Con un'atmosfera accogliente, offriamo ai nostri clienti un'esperienza culinaria indimenticabile. Il nostro menu comprende una vasta selezione di piatti tradizionali italiani, dalle classiche pizze fragranti e croccanti ai piatti di pasta fatti in casa con salse ricche e saporite. Utilizziamo solo ingredienti freschi e di alta qualità per garantire che i nostri piatti riflettano appieno il gusto e la tradizione della vera cucina italiana. Il nostro personale cordiale e professionale si impegna a offrire un servizio impeccabile, creando un'esperienza gastronomica autentica e memorabile per i nostri clienti.",
    address: "Corso Giuseppe Garibaldi, 201, 84122 Salerno Italia",
    image: "/images/sponsors/quanto-basta.png",
    features: ["Cucina italiana", "Pizza artigianale", "Centro storico"]
  },
  {
    id: "dcg",
    name: "DCG",
    subtitle: "Partner Ufficiale",
    backText: "Cinque generazioni di eccellenza nell'edilizia.",
    description: "La D.C.G. è un'impresa operante nel settore dell'edilizia da cinque generazioni. Esegue prevalentemente attività di costruzione di immobili, occupandosi di lavori in proprio ed in appalto con committenze private. Ha un organico tecnico ed amministrativo e sede legale a Salerno. Ha lavorato in provincia di Potenza e sta attualmente operando oltre che in Salerno e provincia anche nella città di Milano.",
    address: "Salerno",
    image: "/images/sponsors/dcg.png",
    features: ["Edilizia", "5 generazioni", "Costruzioni"]
  },
  {
    id: "da-giacomo",
    name: "Da Giacomo Grafferia Napoletana",
    subtitle: "Partner Ufficiale",
    backText: "Le migliori graffe di Salerno.",
    description: "Ottima friggitoria che propone il marchio Zio Savino Qualità (famoso network campano) anche a Salerno nelle vicinanze del lungomare. Le graffe (comunemente chiamate zeppole) sono una specialità napoletana soprattutto nel periodo del carnevale. Ma da Giacomo le trovi tutti i giorni dalle 17 fino a notte inoltrata. Vengono cotte al momento dell'ordine e possono essere gustate lisce o farcite con diverse creme di propria produzione. L'impasto è soffice e profumato e la frittura è leggera e assolutamente non unta. Il personale è attento, simpatico e professionale. Da gustare anche i cornetti, davvero ottimi e le brioche.",
    address: "Via Alfredo de Marsico n 5, Salerno",
    image: "/images/sponsors/da-giacomo.png",
    features: ["Graffe napoletane", "Zio Savino Qualità", "Friggitoria"]
  },
  {
    id: "rsa-calvanico",
    name: "RSA Calvanico",
    subtitle: "Partner Ufficiale",
    backText: "Un'oasi di tranquillità per gli anziani.",
    description: "La Residenza Socio Assistenziale per Anziani di Calvanico si trova in Largo Sacerdote Gismondi, 72, nel comune di Calvanico, in provincia di Salerno, immersa tra verdi montagne e lussureggianti vallate. Questa struttura, a soli 18 km da Salerno, rappresenta un'oasi di tranquillità e serenità, facilmente raggiungibile anche dai grandi centri urbani e dai comuni della Valle dell'Irno. Realizzata su tre livelli, la residenza è concepita modernamente per soddisfare le esigenze dei suoi ospiti. Dispone di ampi spazi all'aperto per il tempo libero e camere arredate in modo funzionale e confortevole, dotate di tutti i servizi necessari. Gli ospiti sono quotidianamente assistiti da un team altamente qualificato, composto da personale medico, paramedico e operatori socio-assistenziali specializzati in geriatria.",
    address: "Largo Sacerdote Gismondi, 72, Calvanico SA",
    image: "/images/sponsors/rsa-calvanico.png",
    features: ["Residenza anziani", "Assistenza geriatrica", "Valle dell'Irno"]
  },
  {
    id: "murano-barber-club",
    name: "Murano Barber Club",
    subtitle: "Partner Ufficiale",
    backText: "Tradizione e eccellenza contemporanea.",
    description: "Murano Barber Club è il salone dove la tradizione della barberia incontra l'eccellenza contemporanea. Nato dalla visione di Gianluca Murano, barber con esperienze internazionali, il club è oggi un punto di riferimento per chi cerca uno stile autentico, ambienti curati e servizi su misura. Con tre sedi operative in Campania – ad Avellino, Monteforte Irpino e Salerno – Murano Barber Club propone un servizio di grooming completo, realizzato da professionisti che mettono al centro il cliente e la sua personalità. Servizi offerti: Taglio uomo su misura, rasatura tradizionale all'italiana con panno caldo, Luxury Beard Trim, cura del cuoio capelluto, trattamenti anticaduta e antiforfora.",
    address: "Corso Giuseppe Garibaldi n.171, Salerno",
    image: "/images/sponsors/murano-barber.jpg",
    features: ["Barberia", "Grooming", "Rasatura tradizionale"]
  },
  {
    id: "my-training-academy",
    name: "My Training Academy",
    subtitle: "Partner Ufficiale",
    backText: "Formazione sportiva di eccellenza.",
    description: "Training Academy è l'accademia di formazione professionale sportiva di riferimento per chi vuole trasformare la propria passione in una carriera di successo. Specializzata nella preparazione di tecnici altamente qualificati, offre certificazioni riconosciute ai massimi livelli del settore. Con oltre 500 corsisti formati e affiliazioni con enti riconosciuti dal CONI, i nostri programmi rappresentano un vero trampolino di lancio nel mondo dello sport, garantendo competenze di alto livello e opportunità concrete di inserimento lavorativo. La nostra missione è formare i migliori allenatori e professionisti del panorama nazionale, grazie a programmi di eccellenza tenuti da docenti esperti e figure di spicco del settore.",
    address: "Via Rocco Cocchia n 77, Salerno",
    image: "/images/sponsors/my-training-academy.jpg",
    features: ["Formazione sportiva", "Certificazioni CONI", "500+ corsisti"]
  },
  {
    id: "professional-cosmetics",
    name: "Professional Cosmetics",
    subtitle: "Partner Ufficiale",
    backText: "Bellezza e benessere ogni giorno.",
    description: "Professional Cosmetics offre una vasta gamma di cosmetici e prodotti per la cura della persona, selezionati per garantire qualità, sicurezza ed efficacia. Situato a Salerno, il negozio propone soluzioni per la skincare, il make-up e la cura dei capelli, adatte sia all'uso quotidiano sia a esigenze più specifiche. Grazie alla professionalità e all'attenzione verso il cliente, Professional Cosmetics rappresenta un punto di riferimento sul territorio per chi desidera prendersi cura del proprio benessere e della propria bellezza ogni giorno.",
    address: "Piazza Grasso Monsignore Gregorio Maria, 17, 84131 Salerno (SA)",
    image: "/images/sponsors/professional-cosmetics.png",
    features: ["Skincare", "Make-up", "Cura capelli"]
  },
  {
    id: "goa-abbigliamento",
    name: "Goa Abbigliamento",
    subtitle: "Partner Ufficiale",
    backText: "Stile e tendenza per ogni occasione.",
    description: "Goa è un negozio di abbigliamento uomo e donna che propone capi moderni e di tendenza, selezionati per offrire qualità, stile e comfort in ogni occasione. Situato a Salerno, il punto vendita offre un'ampia scelta di outfit, dagli abiti casual per il tempo libero alle soluzioni più eleganti, accompagnando i clienti nella scelta del look più adatto alla propria personalità. Grazie all'attenzione ai dettagli e alle ultime novità della moda, Goa rappresenta un punto di riferimento per chi desidera vestirsi con stile ogni giorno.",
    address: "Via Rocco Cocchia, 23, 84129 Salerno SA",
    image: "/images/sponsors/goa-abbigliamento.png",
    features: ["Abbigliamento uomo", "Abbigliamento donna", "Tendenze moda"]
  },
  {
    id: "sti-polli",
    name: "Sti Polli",
    subtitle: "Partner Ufficiale",
    backText: "Il pollo è il re dello street food.",
    description: "Il pollo in tutte le sue varianti è il re dello street food. StiPolli è il posto ideale per gli amanti della carne bianca. Qui potrete gustare il pollo allo spiedo in tutte le sue declinazioni, cotto con forno a legna. Avrete la possibilità di scegliere una varietà di prodotti che vanno dal classico pollo allo spiedo alle gustosissime alette, dal pulled pork alle costine di maiale, passando per gli straccetti impanati e fritti. Inoltre potrete trovare ribs di maiale, salsicce dolci e piccanti, stinco di maiale, spiedini misti, porchetta, patate al forno di vario tipo, varietà di contorni, verdure, carciofi arrostiti, fritture, crocchè, arancini, e tante altre gustosità.",
    address: "Via Nizza 214, Salerno",
    image: "/images/sponsors/sti-polli.png",
    features: ["Pollo allo spiedo", "Forno a legna", "Street food"]
  }
]

export default function SponsorPage() {
  const [currentSport, setCurrentSport] = useState<Sport>("home")
  const [currentLang, setCurrentLang] = useState<Language>("it")

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar 
        currentLang={currentLang} 
        onLanguageChange={setCurrentLang} 
        currentSport={currentSport} 
        onSportChange={setCurrentSport} 
      />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center pt-20 overflow-hidden">
        {/* Background Logo */}
        <motion.div 
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 flex items-center justify-center opacity-30">
            <img 
              src="/images/sanfra-transparent.png"
              alt=""
              className="w-full h-full object-contain"
            />
          </div>
        </motion.div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute top-0 left-4"
          >
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Torna alla Home</span>
            </Link>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-spacema tracking-tight mb-4"
          >
            <span className="text-white">I Nostri</span>{' '}<span className="text-yellow-400">Sponsor</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl md:text-2xl text-yellow-400 font-spacema mb-6"
          >
            Summer Edition 2026
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Grazie ai nostri partner che rendono possibile la Sanfra Cup
          </motion.p>
        </div>
      </section>

      {/* Sponsors Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-16">
            {sponsors.map((sponsor, index) => (
              <motion.div
                key={sponsor.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex flex-col md:flex-row items-center gap-8 md:gap-16"
              >
                {/* Card on the left */}
                <div className="flex-shrink-0">
                  <SponsorCard
                    title={sponsor.name}
                    subtitle={sponsor.subtitle}
                    description={sponsor.description}
                    backText={sponsor.backText}
                    image={sponsor.image}
                    features={sponsor.features}
                  />
                </div>

                {/* Info on the right */}
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-3xl md:text-4xl font-spacema text-white mb-4">
                    {sponsor.name}
                  </h2>
                  <p className="text-gray-400 text-lg leading-relaxed mb-4">
                    {sponsor.description}
                  </p>
                  {sponsor.address && (
                    <p className="text-yellow-400 text-sm flex items-center gap-2 justify-center md:justify-start">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                      {sponsor.address}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-yellow-500/10 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">© 2026 Sanfra Cup. Tutti i diritti riservati.</p>
        </div>
      </footer>
    </div>
  )
}
