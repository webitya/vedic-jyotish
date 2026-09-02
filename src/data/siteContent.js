export const clinicInfo = {
  name: "Vedic Jyotish Kendra",
  tagline: "Ancient Wisdom. Meaningful Guidance.",
  practitioner: "Dr. Acharya Mohit Ji",
  companyName: "AstroforU.com",
  role: "Jyotishacharya & Astrological Counsellor",
  experience: "20+ Years Clinical Practice",
  qualifications: [
    {
      degree: "M.A. in Jyotish Acharya",
      institution: "Ranchi University (RU)",
      type: "Master of Arts in Classical Jyotish Shastra",
    },
    {
      degree: "Postgraduate (P.G) & MBA-HR",
      institution: "IIHMR & SMU",
      type: "Health Management & Human Resource Management",
    },
    {
      degree: "UG - Business Administration",
      institution: "Amity Noida",
      type: "International Business",
    },
    {
      degree: "Professorship in Vedic Astrology",
      institution: "Ongoing Academic Pursuit",
      type: "Advanced Scholarly Research & Preparation",
    },
  ],
  phone: "7004433677",
  formattedPhone: "+91 70044 33677",
  email: "Vedicjyotishkendra5@gmail.com",
  coordinator: {
    name: "Aditya Sinha",
    phone: "8860359754",
    formattedPhone: "+91 88603 59754",
  },
  address: {
    line1: "H1-208, Opp. Harmu Ground",
    landmark: "Shajanand Chowk (between Harmu Chowk & Shajanand Chowk)",
    city: "Ranchi",
    state: "Jharkhand",
    pincode: "834002",
  },
  socialLinks: {
    facebook: {
      name: "Vedic Jyotish Shastra",
      url: "https://facebook.com",
    },
    youtube: {
      name: "VEDSAR SANSAR",
      url: "https://youtube.com",
    },
  },
};

export const serviceCategories = [
  {
    id: "astrology",
    title: "Astrology Consultation",
    shortDescription: "Comprehensive birth chart calculations and dasha analysis across crucial life stages.",
    services: [
      {
        id: "birth-chart",
        slug: "birth-chart",
        name: "Birth Chart Analysis",
        subtitle: "Janam Kundali",
        shortSummary: "Mathematical analysis of your Lagna chart, divisional charts, planetary transits, and Vimshottari dasha periods.",
        description: "In-depth mathematical and interpretive analysis of your Lagna chart, divisional charts (Navamsha, Dashamsha), planetary transits (Gochara), and Vimshottari dasha periods to understand life purpose, strengths, and upcoming phases.",
        icon: "Compass",
        bhavasAnalyzed: "1st to 12th Bhavas (All Houses), Lagna Lord, Moon Sign, Nakshatra",
        karakaPlanets: "Sun (Atmakaraka), Moon (Mind), Jupiter (Wisdom), Saturn (Karma)",
        methodology: "Parashari Ganita, Shadbala strength matrices, Ashtakavarga points, and divisional chart confirmations.",
        inclusions: [
          "Complete Lagna, Chandra, and Navamsha (D9) chart calculation",
          "Vimshottari Mahadasha & Antardasha timeline assessment",
          "Identification of functional benefics, yogakaraka, and maraka planets",
          "Practical, non-fatalistic Vedic remedial guidance"
        ]
      },
      {
        id: "marriage-problems",
        slug: "marriage-problems",
        name: "Marriage Problem",
        subtitle: "Vivah & Kundali Milan",
        shortSummary: "Gun Milan, Mangal Dosh evaluation, 7th house and Venus/Jupiter analysis for relationship harmony.",
        description: "Comprehensive Gun Milan, Mangal Dosh evaluation, 7th house, Venus, and Jupiter analysis. Remedial counseling for marital delays, partner compatibility, misunderstandings, and relationship restoration.",
        icon: "Heart",
        bhavasAnalyzed: "7th House (Partnership), 2nd (Family Harmony), 4th (Domestic Peace), 8th (Mangalya), 12th (Intimacy)",
        karakaPlanets: "Venus (Karaka for Men), Jupiter (Karaka for Women), Mars (Kuja Dosh factors)",
        methodology: "Ashtakoota Milan (36 Gunas), Navamsha (D9) 7th lord strength, Upapada Lagna analysis.",
        inclusions: [
          "Deep-dive Kundali matching beyond generic points",
          "Evaluation of genuine vs cancelled Mangal Dosh",
          "Timing of marriage and partner temperament analysis",
          "Remedial rituals and astrological counseling for conflict resolution"
        ]
      },
      {
        id: "child-birth",
        slug: "child-birth",
        name: "Child Birth",
        subtitle: "Santan Yoga",
        shortSummary: "Analysis of the 5th house, Jupiter, Saptamsha (D7) chart, and timing for progeny wellness.",
        description: "Analysis of the 5th house, Jupiter (Guru karaka), Saptamsha (D7) divisional chart, and planetary influences impacting conception, timing of childbirth, and progeny wellness.",
        icon: "CircleUser",
        bhavasAnalyzed: "5th House (Children & Intelligence), 9th House (Fortunes), 2nd House (Lineage)",
        karakaPlanets: "Jupiter (Putra Karaka), Sun and Venus (Beeja & Kshetra Sphuta analysis)",
        methodology: "Beeja Sphuta for men, Kshetra Sphuta for women, Saptamsha (D7) chart evaluation.",
        inclusions: [
          "Identification of astrological obstacles to conception",
          "Timing of favorable dasha periods for childbirth",
          "Santan Gopal mantra and classical Vedic remedial prescriptions",
          "Health and planetary protection guidance for expectant mothers"
        ]
      },
      {
        id: "medical-astrology",
        slug: "medical-astrology",
        name: "Medical Astrology",
        subtitle: "Swasthya & Dasha",
        shortSummary: "Planetary afflictions affecting vitality, 6th and 8th house diagnostics, and tri-dosha balance.",
        description: "Identification of planetary afflictions affecting vitality, 6th and 8th house diagnostic tendencies, ayurvedic tri-dosha balance in the chart, and timing for medical interventions.",
        icon: "Shield",
        bhavasAnalyzed: "1st House (Physical Body & Vitality), 6th House (Diseases), 8th House (Longevity & Chronic Issues)",
        karakaPlanets: "Sun (Immunity & Bone), Moon (Mental Health & Fluids), Mars (Blood & Surgeries), Saturn (Chronic Ailments)",
        methodology: "Tri-dosha (Vata, Pitta, Kapha) planetary constitution analysis and dasha-transit correlation.",
        inclusions: [
          "Identification of vulnerable anatomical systems based on planetary signatures",
          "Timing windows for favorable surgical or medical procedures",
          "Planetary pacification rituals (Graha Shanti)",
          "Integration with healthy Ayurvedic lifestyle recommendations"
        ]
      },
      {
        id: "past-life",
        slug: "past-life",
        name: "Past Life",
        subtitle: "Purva Janma Karma",
        shortSummary: "Exploration of Rahu-Ketu nodal axis, revealing unfulfilled karmic imprints and ancestral debts.",
        description: "Exploration of Rahu-Ketu nodal axis, 9th and 12th houses, revealing unfulfilled karmic imprints, ancestral debts (Rin), and spiritual paths for inner resolution.",
        icon: "BookOpen",
        bhavasAnalyzed: "9th House (Past Karma & Dharma), 12th House (Moksha & Subconscious), 5th House (Purva Punya)",
        karakaPlanets: "Rahu (Desires & Unfinished Karma), Ketu (Spiritual Liberation & Karmic Residue), Saturn (Karmic Teacher)",
        methodology: "Nodal axis analysis, D20 (Vimsamsha) chart evaluation, and classical Rin Dosha diagnostics.",
        inclusions: [
          "Uncovering recurring karmic blockages in personal and financial life",
          "Understanding the spiritual purpose behind major life tests",
          "Traditional prayers, tarpan, and dana to resolve ancestral debts",
          "Meditation and spiritual practices tailored to your Ishta Devata"
        ]
      },
      {
        id: "study-education",
        slug: "study-education",
        name: "Study",
        subtitle: "Vidya & Intellect",
        shortSummary: "Guidance for students based on Mercury, Jupiter, 4th and 5th house strengths for academic streams.",
        description: "Guidance for students based on Mercury, Jupiter, 4th and 5th house strengths to identify optimal academic streams, concentration remedies, and competitive examination timings.",
        icon: "GraduationCap",
        bhavasAnalyzed: "4th House (Foundational Education), 5th House (Intellect & Memory), 9th House (Higher Education & Research)",
        karakaPlanets: "Mercury (Analytical Skills & Trade), Jupiter (Wisdom & Knowledge), Mars (Technical & Engineering)",
        methodology: "Chaturvimsamsha (D24) educational chart analysis, Mercury-Jupiter aspect evaluation.",
        inclusions: [
          "Scientific stream selection (Engineering, Medical, Commerce, Law, Arts, Research)",
          "Timing for national and international competitive examinations",
          "Remedies for study concentration, memory retention, and anxiety",
          "Auspicious timing for admissions and relocation for studies"
        ]
      },
    ],
  },
  {
    id: "finance-career",
    title: "Financial & Professional Guidance",
    shortDescription: "Strategic life planning through astrological timing for career progression, business, and investments.",
    services: [
      {
        id: "career",
        slug: "career",
        name: "Career",
        subtitle: "Vyapar & Leadership",
        shortSummary: "Evaluation of the 10th house, Sun, Saturn, and Dashamsha (D10) chart for professional inclinations.",
        description: "Evaluation of the 10th house, Sun, Saturn, and Dashamsha (D10) chart to identify true professional inclinations, leadership roles, job transitions, and business expansion timing.",
        icon: "Briefcase",
        bhavasAnalyzed: "10th House (Karma & Career), 6th House (Service & Employment), 7th House (Partnerships & Business)",
        karakaPlanets: "Sun (Authority & Government), Saturn (Discipline & Career Path), Mercury (Commerce)",
        methodology: "Dashamsha (D10) divisional chart assessment, 10th house lord dasha timing, Amatyakaraka analysis.",
        inclusions: [
          "Identification of optimal career domains (Service vs Independent Business)",
          "Timing for job changes, promotions, and leadership elevations",
          "Analysis of overseas career opportunities",
          "Remedies for workplace obstacles and professional stagnation"
        ]
      },
      {
        id: "financial-problems",
        slug: "financial-problems",
        name: "Financial Problem",
        subtitle: "Dhana Yoga & Debt Relief",
        shortSummary: "Deep examination of wealth accumulation vs debt houses to break financial stagnation.",
        description: "Deep examination of 2nd (wealth accumulation) and 11th (gains) houses versus 12th and 6th houses. Actionable guidance to break financial stagnation and overcome debt burdens.",
        icon: "TrendingUp",
        bhavasAnalyzed: "2nd House (Accumulated Wealth), 11th House (Income & Gains), 6th House (Debts & Loans), 12th House (Expenditures)",
        karakaPlanets: "Jupiter (Dhana Karaka), Venus (Material Prosperity), Mercury (Financial Management)",
        methodology: "Dhana Yoga and Daridra Yoga balance, Hora (D2) chart evaluation, Ashtakavarga wealth bindus.",
        inclusions: [
          "Diagnosis of root astrological causes behind persistent financial leaks",
          "Timing the liquidation of loans and debt settlements",
          "Auspicious periods for property purchases and major investments",
          "Traditional Lakshmi and Kuber remedial practices"
        ]
      },
      {
        id: "stock-market",
        slug: "stock-market",
        name: "Stock Market",
        subtitle: "Speculative Analysis",
        shortSummary: "Planetary strength analysis of Mercury, Rahu, and 5th house lords to assess speculative suitability.",
        description: "Planetary strength analysis of Mercury (trade), Rahu (speculation), and 5th house lords to assess risk tolerance, favorable trading cycles, and speculative investment suitability.",
        icon: "BarChart3",
        bhavasAnalyzed: "5th House (Speculation & Intuition), 8th House (Sudden Gains), 11th House (Profits)",
        karakaPlanets: "Mercury (Stock Brokerage & Analytics), Rahu (Sudden Swings & Modern Markets), Moon (Market Sentiment)",
        methodology: "5th-8th-11th house interlinks, Sarvatobhadra Chakra analysis, transit conjunctions.",
        inclusions: [
          "Assessing whether trading or long-term equity investing is suitable in your chart",
          "Identification of sectors aligned with your dominant planets (e.g. Metals, Tech, Real Estate)",
          "Cautionary timing windows to avoid high-risk speculative exposure",
          "Personalized astrological muhurta for starting investment portfolios"
        ]
      },
      {
        id: "court-case",
        slug: "court-case",
        name: "Court Case",
        subtitle: "Legal Resolution",
        shortSummary: "Examination of litigation houses and Mars/Saturn combinations to evaluate trial outcomes and settlements.",
        description: "Examination of 6th house (litigation), 8th house, and Mars/Saturn combinations to evaluate trial outcomes, amicable settlement windows, and dispute mitigation remedies.",
        icon: "Scale",
        bhavasAnalyzed: "6th House (Litigation & Opponents), 8th House (Court Verdicts & Vulnerability), 10th House (Judges & Law Authorities)",
        karakaPlanets: "Mars (Combative Power), Saturn (Justice & Legal Delays), Jupiter (Legal Counsel & Fair Verdict)",
        methodology: "Shatru Hanta Yoga evaluation, 6th lord dasha transits, Prashna Kundali (horary) confirmation.",
        inclusions: [
          "Predictive assessment of legal settlement timing vs prolonging litigation",
          "Identifying optimal dates for hearings, filings, and mediation talks",
          "Baglamukhi and Hanuman remedial protections against unjust opposition",
          "Peaceful dispute reconciliation guidance"
        ]
      },
    ],
  },
  {
    id: "vastu",
    title: "Vastu Consultation",
    shortDescription: "Harmonizing living and workspace environments with authentic Vedic directional principles.",
    services: [
      {
        id: "vastu-shastra",
        slug: "vastu-shastra",
        name: "Commercial & Residential Vastu",
        subtitle: "Bhoomi & Sthapatya Veda",
        shortSummary: "Non-destructive spatial energy corrections for residences, offices, and plots based on the 16 cardinal zones.",
        description: "Non-destructive spatial energy corrections for residences, commercial offices, factories, and plots. Balancing the 16 cardinal zones, Pancha Tattva (Five Elements), and Brahma Sthan for health, prosperity, and peace.",
        icon: "Home",
        bhavasAnalyzed: "4th House (Property & Comfort), 10th House (Workplace Aura), 8th House (Geopathic Stress)",
        karakaPlanets: "Mars (Bhoomi Karaka), Venus (Architectural Beauty), Saturn (Building Integrity)",
        methodology: "Pancha Mahabhuta balancing, 16 directional zones, Devata energy mapping, non-demolition remedies.",
        inclusions: [
          "Comprehensive site layout and floor plan energy audits",
          "Residential Vastu for master bedroom, kitchen, entrance, and puja room",
          "Commercial Vastu for retail shops, corporate offices, clinics, and manufacturing units",
          "Remedies using brass energy plates, color therapy, and elemental redistributions without structural demolition"
        ]
      },
    ],
  },
  {
    id: "spiritual-practices",
    title: "Spiritual & Traditional Practices",
    shortDescription: "Remedial rituals, ancestral peace, vibrational harmony, and sacred mineral sciences.",
    services: [
      {
        id: "pitri-dosh",
        slug: "pitri-dosh",
        name: "Pitri Dosh",
        subtitle: "Ancestral Rectification",
        shortSummary: "Identification of ancestral debt combinations and guidance on authentic traditional remedial protocols.",
        description: "Comprehensive identification of planetary combinations signifying ancestral debts (Pitri Rin) and guidance on authentic traditional tarpan, dana, and prayer protocols.",
        icon: "Flame",
        bhavasAnalyzed: "9th House (Ancestral Lineage & Dharma), Sun (Pitri Karaka), 5th House (Progeny Karma)",
        karakaPlanets: "Sun (Father/Ancestors), Rahu (Eclipse Factor), Jupiter (Divine Blessings)",
        methodology: "Sun-Rahu conjunction analysis, 9th house affliction diagnostics, Brihat Parashara remedial shlokas.",
        inclusions: [
          "Precise identification of which ancestral debt is affecting family progress",
          "Prescription of authentic Shraddha, Tarpan, and charity protocols",
          "Specialized temple visit guidance (Gaya, Haridwar, or local sacred spaces)",
          "Protective mantras for generational peace and progeny prosperity"
        ]
      },
      {
        id: "numerology",
        slug: "numerology",
        name: "Numerology",
        subtitle: "Anka Jyotish",
        shortSummary: "Calculation of Psychic, Destiny, and Name Vibrations to harmonize personal and business names.",
        description: "Calculation of Psychic Number, Destiny Number, and Name Vibrations. Harmonizing business and individual names to sync with planetary energies.",
        icon: "Hash",
        bhavasAnalyzed: "Planetary numerological grids, Pythagorean & Cheiro systems, Birth Chart coordination",
        karakaPlanets: "Ruling planet for each numerical frequency (1: Sun, 2: Moon, 3: Jupiter, etc.)",
        methodology: "Coordination of Chaldean name frequencies with Vedic Lagna and Janma Nakshatra.",
        inclusions: [
          "Analysis of Driver (Mulank) and Conductor (Bhagyank) numbers",
          "Commercial brand, company name, and product naming optimization",
          "Personal name spelling balance for enhanced career and social luck",
          "Favorable numbers, dates, and color synchronization"
        ]
      },
      {
        id: "occult-mysticism",
        slug: "occult-mysticism",
        name: "Occult & Mysticism",
        subtitle: "Gudh Vidya",
        shortSummary: "Traditional esoteric knowledge and protective Vedic practices to cleanse persistent negative energetic influences.",
        description: "Traditional esoteric knowledge and protective Vedic practices to cleanse persistent negative energetic influences, evil eye (Nazar Dosh), and psychological blockages.",
        icon: "Eye",
        bhavasAnalyzed: "8th House (Mysticism & Hidden Energies), 12th House (Subconscious), Rahu-Ketu axis",
        karakaPlanets: "Ketu (Moksha & Esoteric Sight), Mars (Protective Shield), Saturn (Karmic Defense)",
        methodology: "Vedic Kavacha recitation, Raksha Sutra consecration, and positive aura cleansing.",
        inclusions: [
          "Identification of psychic stress, evil eye (Nazar), and energetic blockages",
          "Installation of authentic consecrated brass Vedic Yantras",
          "Personalized protective Vedic Kavachas and daily ritual discipline",
          "Mental clarity and spiritual rejuvenation techniques"
        ]
      },
      {
        id: "gemstone-therapy",
        slug: "gemstone-therapy",
        name: "Gem Stone Therapy",
        subtitle: "Ratna Vigyan",
        shortSummary: "Precise prescription of Vedic gemstones (Navratna) based on functional benefics and ascendant lords.",
        description: "Precise prescription of Vedic gemstones (Navratna) based on functional benefics and ascendant lords. Guidance on weight (Ratti), metal setting, purifying rituals, and wearing muhurta.",
        icon: "Gem",
        bhavasAnalyzed: "1st House (Lagna Lord), 5th House (Trikona Lord), 9th House (Bhagya Lord)",
        karakaPlanets: "Navagraha primary gems (Ruby, Pearl, Red Coral, Emerald, Yellow Sapphire, Diamond, Blue Sapphire, Hessonite, Cat's Eye)",
        methodology: "Anukul Graha philosophy (strengthening functional benefics only, never natural malefic lords).",
        inclusions: [
          "Ascendant-based gemstone calculation with exact carat and ratti recommendations",
          "Verification guidelines to distinguish untreated natural gems from synthetic stones",
          "Detailed metal selection (Gold, Silver, Panchadhatu, Ashtadhatu)",
          "Step-by-step Shuddhikaran (purification) and Prana Pratishtha muhurta timing"
        ]
      },
    ],
  },
];

export const allServices = serviceCategories.flatMap(category => 
  category.services.map(service => ({
    ...service,
    categoryTitle: category.title,
    categoryId: category.id,
  }))
);

export const galleryCategories = [
  { id: "all", name: "All Records" },
  { id: "chamber", name: "Consultation Chamber" },
  { id: "treatises", name: "Classical Treatises" },
  { id: "gemstones", name: "Natural Gemstones" },
  { id: "rudraksha", name: "Sacred Rudraksha" },
  { id: "yantras", name: "Vastu & Yantras" },
];

export const galleryItems = [
  {
    id: 1,
    title: "Consultation Chamber",
    category: "Consultation Environment",
    categoryId: "chamber",
    description: "A serene, traditional consultation space designed for confidential and in-depth astrological analysis in Ranchi.",
    aspect: "tall",
    image: "https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 2,
    title: "Vedic Manuscripts & Ephemeris",
    category: "Classical Study",
    categoryId: "treatises",
    description: "Referencing classical Sanskrit treatises (Brihat Parashara Hora Shastra, Jaimini Sutras) and exact mathematical Panchang calculations.",
    aspect: "wide",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 3,
    title: "Natural Untreated Gemstones",
    category: "Gemstone Therapy",
    categoryId: "gemstones",
    description: "Selection of laboratory-certified precious gems (Yellow Sapphire, Blue Sapphire, Emerald, Ruby) evaluated for optical clarity and planetary resonance.",
    aspect: "square",
    image: "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 4,
    title: "Sacred Himalayan Rudraksha",
    category: "Vedic Tradition",
    categoryId: "rudraksha",
    description: "Authentic Himalayan and Indonesian Rudraksha beads selected according to individual Mukhi properties and astrological suitability.",
    aspect: "square",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 5,
    title: "Astronomical & Natal Chart Calculations",
    category: "Mathematical Astrology",
    categoryId: "treatises",
    description: "Accurate planetary degree calculations, Shadbala strength matrices, and divisional chart plotting for precise life timing.",
    aspect: "wide",
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 6,
    title: "Traditional Brass Yantras & Sacred Geometry",
    category: "Vastu & Energy",
    categoryId: "yantras",
    description: "Energized geometrical yantras utilized for spatial harmonization and residential Vastu remedies.",
    aspect: "tall",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
  },
];

export const blogArticles = [
  {
    id: "navamsha-marriage",
    slug: "navamsha-marriage",
    title: "Understanding the Navamsha (D9) Chart in Relationship Harmony",
    category: "Astrological Foundations",
    readTime: "6 min read",
    date: "August 2026",
    excerpt: "While the Rashi chart represents outer reality, the Navamsha reveals inner psychological alignment, dharma, and the true trajectory of marriage and partnerships.",
    content: `In Vedic astrology, the primary birth chart (Lagna or D1) depicts the physical manifestation of circumstances. However, the Navamsha (D9 chart), formed by dividing each zodiac sign into nine equal segments of 3°20', serves as the microscope of the soul.

1. The True Significance of the 7th House in D9
A promising 7th house in the birth chart can sometimes produce friction if the Navamsha 7th lord is afflicted or in a dusthana (6th, 8th, or 12th house). Conversely, a challenging birth chart placement often finds resolution if the Navamsha chart is robust and harmoniously positioned.

2. Jupiter and Venus Placement
For male natives, Venus reflects the spouse's temperament and partnership karma; for female natives, Jupiter represents the husband's qualities and moral conduct. Evaluating both in the D9 chart provides nuanced clarity that standard horoscope matching frequently overlooks.

3. The Maturation of D9 Energies
Vedic tradition teaches that while youth is dominated by the Rashi chart, as a person matures past age 30, the energies of the Navamsha chart become increasingly dominant in shaping priorities, emotional responses, and life results.`,
  },
  {
    id: "vastu-residential-principles",
    slug: "vastu-residential-principles",
    title: "Vastu Principles for Creating Harmonious Energy in Modern Homes",
    category: "Vastu Shastra",
    readTime: "7 min read",
    date: "July 2026",
    excerpt: "How aligning your residential spaces with the five natural elements (Pancha Mahabhuta) fosters mental peace, financial stability, and family well-being.",
    content: `Vastu Shastra is not superstition; it is the ancient Indian science of spatial architecture and elemental alignment. By balancing the 16 compass directions with Earth, Water, Fire, Air, and Space, a home becomes an amplifier of positive vitality.

1. The North-East (Ishanya) — The Zone of Clarity
Governed by Water and Jupiter, the North-East corner dictates spiritual peace, intellect, and vision. Keeping this area light, uncluttered, and open enhances meditative clarity and family health. Avoid heavy storage, overhead water tanks, or kitchen stoves in this quadrant.

2. The South-East (Agneya) — The Fire Element & Vitality
The fire direction governs physical vitality, digestion, and financial liquidity. Placing the kitchen burner or high-energy electrical apparatus in the South-East ensures that the home's operational energy remains vibrant and unobstructed.

3. The South-West (Nairutya) — Earth Element & Stability
Governed by Earth and Rahu, the South-West represents stability, leadership, and emotional grounding. The master bedroom is ideally located here, with higher elevation and heavier furnishings to anchor the family head's decision-making power.`,
  },
  {
    id: "vimshottari-dasha-timing",
    slug: "vimshottari-dasha-timing",
    title: "The Science of Planetary Periods (Vimshottari Dasha) in Decision Making",
    category: "Vedic Principles",
    readTime: "5 min read",
    date: "June 2026",
    excerpt: "Why timing is the most critical dimension in Vedic astrology, and how understanding your active Mahadasha helps navigate career, investments, and life transitions.",
    content: `Even the most auspicious birth chart placements remain dormant until activated by the planetary clockwork known as the Vimshottari Dasha system. Based on a 120-year human cycle linked to the Moon's nakshatra at birth, this system explains why identical efforts yield vastly different outcomes at different periods in life.

1. Mahadasha and Antardasha Synergy
A Mahadasha establishes the overarching macro-climate of one's life for years at a time (e.g., Saturn 19 years, Mercury 17 years, Venus 20 years). The Antardasha (sub-period) dictates the immediate events and shifts in focus.

2. Functional Benefics vs. Natural Benefics
A planet that is naturally gentle (such as Jupiter or Venus) may behave as a functional adversary if it lords over challenging houses for a specific ascendant. Understanding this distinction prevents misplaced expectations and allows proactive lifestyle adjustments.

3. Strategic Timing for Career & Financial Investments
Initiating major business ventures or significant capital investments during the dasha of planets connected to the 10th and 11th houses maximizes growth potential while mitigating unexpected volatility.`,
  },
];

export const policies = [
  {
    id: "consultation",
    title: "Consultation Policy",
    description: "Guidelines regarding the nature, process, and ethics of our astrological counsel.",
    points: [
      "All consultations with Ach. Dr. Mohit Shah are conducted on a one-on-one, confidential basis.",
      "Astrological advice is offered as a guiding framework rooted in classical Vedic treatises to aid personal clarity and ethical decision-making.",
      "Exact birth details (Date, Exact Time, and Place of Birth) are essential for precise astronomical calculations and chart synthesis.",
      "In-person consultations are held at the Ranchi Kendra by prior appointment only.",
    ],
  },
  {
    id: "appointment",
    title: "Appointment & Rescheduling",
    description: "Protocol for scheduling, timing, and date adjustments.",
    points: [
      "Appointments must be scheduled in advance through our official contact numbers (7004433677 or Coordinator 8860359754).",
      "Clients are requested to arrive 10 minutes prior to their scheduled slot or join online promptly.",
      "Rescheduling requests should be communicated at least 24 hours in advance to accommodate other waiting seekers.",
    ],
  },
  {
    id: "privacy",
    title: "Confidentiality & Privacy",
    description: "Our steadfast commitment to protecting your personal information.",
    points: [
      "Birth charts, personal histories, family discussions, and questions shared during consultations remain strictly confidential.",
      "Your contact numbers and personal records are never shared with or sold to third-party commercial marketing entities.",
      "Data shared via forms or WhatsApp is stored solely for the purpose of chart retrieval during subsequent follow-up sessions.",
    ],
  },
  {
    id: "disclaimer",
    title: "Professional Disclaimer",
    description: "Clarification of ethical boundaries and legal definitions.",
    points: [
      "Vedic astrology, Vastu Shastra, and related disciplines provide spiritual guidance and planetary probabilities based on classical heritage.",
      "Consultations are not a substitute for qualified professional medical treatment, psychiatric care, or licensed legal counsel.",
      "No claims of absolute fatalism are made; individual freewill (Purushartha) and ethical karma remain central to human life.",
    ],
  },
  {
    id: "gemstone-policy",
    title: "Gemstones & Mineral Policy",
    description: "Standards regarding gemstone authenticity and upcoming e-commerce services.",
    points: [
      "All gemstones recommended during consultations are assessed purely on astrological merit and functional ascendant rules.",
      "Upon launch of our curated collection, every gemstone and Rudraksha will be accompanied by authentic government-approved gemological laboratory certificates.",
      "Transparent weight, clarity, cut, and non-treatment disclosures will be provided with every specimen.",
    ],
  },
];
