export type Language = 'fr' | 'tn' | 'en';

export type BikeCategory = 'road' | 'mtb' | 'ebike' | 'gravel';

export type AssemblyStageIndex = 1 | 2 | 3 | 4 | 5 | 6;

/**
 * Direct WhatsApp booking link for Maher Habouria / Velo Reglo without any pre-edited text or form.
 */
export const DIRECT_WHATSAPP_URL = 'https://wa.me/';

export interface ServiceOption {
  id: string;
  code: string;
  name: Record<Language, string>;
  detail: Record<Language, string>;
  basePriceTnd: number;
  durationHours: number;
  recommendedFor: BikeCategory[];
}

export interface StageSpecCard {
  id: string;
  badgeCode: string;
  title: Record<Language, string>;
  subtitle: Record<Language, string>;
  protocol: Record<Language, string>;
  metric: string;
  tiltDeg: number;
  serviceId: string;
}

export interface WorkshopReelItem {
  id: string;
  category: BikeCategory;
  brand: string;
  model: string;
  title: Record<Language, string>;
  summary: Record<Language, string>;
  drivetrain: string;
  torque: string;
  views: string;
  imageSrc: string;
  operations: Record<Language, string[]>;
}

export interface AssemblyStepCopy {
  stepNumber: string;
  pillLabel: string;
  kicker: string;
  backdropWord: string;
  title: string;
  description: string;
  cta: string;
  toolCode: string;
  torqueSpec: string;
  rightCalloutTitle: string;
  rightCalloutBody: string;
  expertChecklist: [string, string, string];
}

export const BIKE_CATEGORY_MULTIPLIERS: Record<BikeCategory, number> = {
  road: 1.0,
  gravel: 1.1,
  mtb: 1.15,
  ebike: 1.3,
};

export const SERVICE_OPTIONS: ServiceOption[] = [
  {
    id: 'complete_overhaul',
    code: 'VR-01',
    name: {
      fr: 'Révision Complète "Bien Réglo"',
      tn: 'Révision كاملة « Vélo Bien Réglo »',
      en: 'Complete "Bien Réglo" Overhaul',
    },
    detail: {
      fr: 'Démontage intégral sur pied Park Tool, graissage roulements céramiques, serrage au couple.',
      tn: 'حلّان vélo كامل على support Park Tool الأزرق\u200F، تشحيم roulements céramiques وتكبيس بـ clé dynamométrique\u200F.',
      en: 'Full teardown on Park Tool stand, ceramic bearing lubrication, precision torque calibration.',
    },
    basePriceTnd: 140,
    durationHours: 3.5,
    recommendedFor: ['road', 'mtb', 'gravel', 'ebike'],
  },
  {
    id: 'drivetrain_ultrasonic',
    code: 'VR-02',
    name: {
      fr: 'Transmission Ultrason & Cire Course',
      tn: 'تنظيف transmission بـ ultrasons و cire de course',
      en: 'Ultrasonic Drivetrain & Race Wax',
    },
    detail: {
      fr: 'Nettoyage bain ultrason cassette/chaîne, alignement patte DAG-3 au dixième de millimètre.',
      tn: 'غسيل cassette و chaîne في حوض ultrasons\u200F، وتعديل patte de dérailleur بآلة DAG-3 بالمليمتر.',
      en: 'Ultrasonic bath for cassette & chain, DAG-3 derailleur hanger alignment to 0.1mm.',
    },
    basePriceTnd: 75,
    durationHours: 1.5,
    recommendedFor: ['road', 'mtb', 'gravel'],
  },
  {
    id: 'hydraulic_suspension',
    code: 'VR-03',
    name: {
      fr: 'Purge Hydraulique & Service Suspension',
      tn: 'Purge freins hydrauliques وصيانة fourche و amortisseur',
      en: 'Hydraulic Bleed & Suspension Service',
    },
    detail: {
      fr: 'Purge freins disque haute température, remplacement joints racleurs fourche/amortisseur.',
      tn: 'Purge متاع freins à disque\u200F، وتبديل joints racleurs متاع fourche و amortisseur\u200F.',
      en: 'High-temp disc brake bleed, fork/shock dust wiper seal & oil replacement.',
    },
    basePriceTnd: 110,
    durationHours: 2.5,
    recommendedFor: ['mtb', 'gravel', 'ebike'],
  },
  {
    id: 'ebike_diagnostics',
    code: 'VR-04',
    name: {
      fr: 'Diagnostic Moteur E-Bike & Batterie',
      tn: 'Diagnostic متاع moteur vélo électrique و batterie',
      en: 'E-Bike Motor & Battery Diagnostics',
    },
    detail: {
      fr: 'Contrôle capteurs de couple Bosch/Shimano/Brose, étanchéité carter et roulements internes.',
      tn: 'مراقبة capteurs de couple لموتور Bosch و Shimano\u200F، وتبديل roulements internes وتسكير carter الموتور.',
      en: 'Torque sensor calibration (Bosch/Shimano/Brose), motor casing seal & internal bearing service.',
    },
    basePriceTnd: 130,
    durationHours: 2.0,
    recommendedFor: ['ebike'],
  },
];

export const STAGE_3_CARDS: StageSpecCard[] = [
  {
    id: 'card-drivetrain',
    badgeCode: 'SPEC 01 · TRANSMISSION',
    title: {
      fr: 'CHAÎNE OR & ULTRASONS',
      tn: 'CHAÎNE OR و تنظيف ULTRASONS',
      en: 'GOLD CHAIN & ULTRASONICS',
    },
    subtitle: {
      fr: 'DÉGRAISSAGE INTÉGRAL · HUILE CÉRAMIQUE / CIRE',
      tn: 'Dégraissage عميق · تشحيم Huile Céramique للسباق',
      en: 'DEEP DEGREASE · CERAMIC OIL / RACE WAX',
    },
    protocol: {
      fr: 'Contrôle d’usure CC-4, dégraissage ultrason, pose d’une chaîne neuve si nécessaire et lubrification maillon par maillon.',
      tn: 'قيس chaîne بآلة CC-4\u200F، غسيل و dégraissage بـ ultrasons\u200F، تبديل chaîne جديدة كان لزم وتشحيمها كعبة بكعبة.',
      en: 'CC-4 wear check, ultrasonic degreasing, new gold chain replacement if stretched, and link-by-link ceramic lube.',
    },
    metric: '0.08 mm Tolérance',
    tiltDeg: -5,
    serviceId: 'drivetrain_ultrasonic',
  },
  {
    id: 'card-wheels',
    badgeCode: 'SPEC 02 · ROUES & TUBELESS',
    title: {
      fr: 'ROUES ZIPP & TUBELESS MAXXIS',
      tn: 'ROUES ZIPP CARBONE و TUBELESS MAXXIS',
      en: 'ZIPP WHEELS & MAXXIS TUBELESS',
    },
    subtitle: {
      fr: 'PRÉVENTIF 60 ML · DÉVOILAGE TENSIOMÈTRE',
      tn: 'تعمير Liquide Préventif Tubeless · تعديل Roues عالميزان',
      en: '60 ML SEALANT FILL · TENSIOMETER TRUING',
    },
    protocol: {
      fr: 'Réparation crevaisons, remplacement fond de jante et valves, remplissage liquide préventif tubeless et équilibrage.',
      tn: 'تصليح pneus\u200F، تبديل fond de jante و valves\u200F، تعمير liquide préventif tubeless وتعديل rayons عالميزان.',
      en: 'Puncture repair, rim tape & valve service, fresh tubeless sealant liquid injection, and spoke tension balancing.',
    },
    metric: '1.4 / 1.6 BAR XCO',
    tiltDeg: 0,
    serviceId: 'hydraulic_suspension',
  },
  {
    id: 'card-podium',
    badgeCode: 'SPEC 03 · CHÂSSIS COURSE',
    title: {
      fr: 'PRÉPARATION PODIUM XCO',
      tn: 'تحضير VÉLO للـ PODIUM والسباق',
      en: 'XCO PODIUM RACE PREP',
    },
    subtitle: {
      fr: 'PROTOCOLE 10× CHAMPION NATIONAL',
      tn: 'صنعة ماهر هبورية · 10 مرات بطل تونس',
      en: '10× NATIONAL CHAMPION PROTOCOL',
    },
    protocol: {
      fr: 'Serrage dynamométrique certifié sur chaque vis titane/carbone, purge freins hydrauliques et réglage suspension Kashima.',
      tn: 'تكبيس كل vis titane و carbone بـ clé dynamométrique\u200F، مع purge freins hydrauliques وتعديل fourche Kashima\u200F.',
      en: 'Certified torque wrench check on every titanium/carbon bolt, hydraulic brake bleed, and Kashima suspension tuning.',
    },
    metric: '40.0 Nm Lockring',
    tiltDeg: 5,
    serviceId: 'complete_overhaul',
  },
];

export const WORKSHOP_REELS: WorkshopReelItem[] = [
  {
    id: 'reel-bmc',
    category: 'road',
    brand: 'BMC',
    model: 'Teammachine SLR01 Carbon',
    title: {
      fr: 'Montage Sur-Mesure BMC Teammachine SLR',
      tn: 'Montage كامل وتعديل vélo BMC carbone',
      en: 'Custom Build BMC Teammachine SLR',
    },
    summary: {
      fr: 'Intégration complète du cockpit carbone, purge hydraulique et guidoline pro.',
      tn: 'تعدية الخيوط وسط cockpit carbone\u200F، مع purge hydraulique وتركيب guidoline احترافية.',
      en: 'Full internal carbon cockpit routing, hydraulic bleed and pro bar tape finish.',
    },
    drivetrain: 'Shimano Ultegra Di2 12v',
    torque: '5.2 Nm Cockpit',
    views: '1.8K',
    imageSrc: '/assets/aistudio/props/reel-bmc.jpg',
    operations: {
      fr: [
        'Routage interne durites hydrauliques',
        'Calibration Di2 12 vitesses',
        'Serrage carbone pâte de montage Park Tool',
      ],
      tn: [
        'تعدية durites hydrauliques وسط cadre carbone',
        'Réglage دقيق لـ Shimano Di2 12 vitesses',
        'تكبيس carbone بـ pâte de montage Park Tool',
      ],
      en: [
        'Internal hydraulic hose routing',
        '12-speed Di2 electronic calibration',
        'Park Tool carbon assembly compound torque spec',
      ],
    },
  },
  {
    id: 'reel-sram-gold',
    category: 'mtb',
    brand: 'SRAM XX1',
    model: 'Eagle AXS Gold 10-52T',
    title: {
      fr: 'Calibration Cassette & Chaîne SRAM XX1 Gold',
      tn: 'Réglage متاع cassette و chaîne SRAM XX1 المذهّبة',
      en: 'SRAM XX1 Gold Cassette & Chain Calibration',
    },
    summary: {
      fr: 'Préparation championnat arabe VTT : décontamination ultrason et alignement au dixième de millimètre.',
      tn: 'تحضير للبطولة العربية VTT: تنظيف عميق بـ ultrasons وتعديل dérailleur بالمليمتر.',
      en: 'Arab MTB Championship prep: ultrasonic decontamination and 0.1mm hanger alignment.',
    },
    drivetrain: 'SRAM XX1 Eagle Gold',
    torque: '40.0 Nm Lockring',
    views: '5.1K',
    imageSrc: '/assets/aistudio/props/reel-sram-gold.jpg',
    operations: {
      fr: [
        'Bain ultrason dégraissant biodégradable',
        'Contrôle d’usure chaîne Park Tool CC-4',
        'Réglage B-Tension & indexation micro-adjust',
      ],
      tn: [
        'غسيل cassette و chaîne في حوض ultrasons',
        'قيس عمر chaîne بآلة Park Tool CC-4',
        'Réglage متاع vitesses باش يطلعو ويهبطو بلاش حس',
      ],
      en: [
        'Biodegradable ultrasonic degreaser bath',
        'Park Tool CC-4 chain wear verification',
        'B-Tension & micro-adjust indexing',
      ],
    },
  },
  {
    id: 'reel-ebike-motor',
    category: 'ebike',
    brand: 'BOSCH / E-DRIVE',
    model: 'Performance Line CX Gen4',
    title: {
      fr: 'Réfection Engrenages & Roulements Moteur E-Bike',
      tn: 'تصليح وتبديل roulements متاع moteur vélo électrique',
      en: 'E-Bike Motor Planetary Gear & Bearing Rebuild',
    },
    summary: {
      fr: 'Ouverture complète du carter moteur, remplacement des roulements grippés et graisse haute pression.',
      tn: 'حلّان carter moteur كامل\u200F، تبديل roulements المبلوكية وتشحيم engrenages بـ graisse أصلية.',
      en: 'Complete motor housing teardown, seized bearing replacement and high-pressure gearing grease.',
    },
    drivetrain: 'Mid-Drive Planetary Geared',
    torque: '25.0 Nm Carter',
    views: '889',
    imageSrc: '/assets/aistudio/props/reel-ebike-motor.jpg',
    operations: {
      fr: [
        'Extraction roulements étanches au presse-atelier',
        'Graissage pignons planétaires synthétique',
        'Remplacement joints spi anti-humidité',
      ],
      tn: [
        'تبديل roulements étanches بـ presse متاع الورشة',
        'تشحيم pignons planétaires بـ graisse خاصة',
        'تركيب joints spi جدد يمنعو دخول الماء والغبرة',
      ],
      en: [
        'Shop-press sealed bearing extraction',
        'Synthetic planetary gear lubrication',
        'Moisture-barrier lip seal replacement',
      ],
    },
  },
  {
    id: 'reel-canyon',
    category: 'gravel',
    brand: 'CANYON',
    model: 'Ultimate CF SLX & Gravel Prep',
    title: {
      fr: 'Révision Intégrale Châssis Carbone Canyon',
      tn: 'Révision شاملة وتحضير cadre carbone Canyon و gravel',
      en: 'Full Carbon Chassis Service Canyon',
    },
    summary: {
      fr: 'Démontage boîtier de pédalier PressFit, dévoilage roues carbone et montage tubeless préventif.',
      tn: 'تنظيف boîtier de pédalier PressFit\u200F، تعديل roues carbone عالميزان وتركيب tubeless احترافي.',
      en: 'PressFit bottom bracket overhaul, carbon wheel truing and tubeless sealant setup.',
    },
    drivetrain: 'Shimano XTR / Ultegra Pro',
    torque: '6.0 Nm Axes Traversants',
    views: '3.0K',
    imageSrc: '/assets/aistudio/props/reel-canyon.jpg',
    operations: {
      fr: [
        'Alignement boîtier PressFit & roulements céramiques',
        'Tension rayons au tensiomètre Park Tool TM-1',
        'Montage Tubeless & test pression 24h',
      ],
      tn: [
        'تعديل boîtier PressFit وتركيب roulements céramiques',
        'ميزان rayons بآلة Park Tool TM-1',
        'Montage tubeless وتجربة ضغط الهواء 24 ساعة',
      ],
      en: [
        'PressFit bottom bracket alignment & ceramic bearings',
        'Park Tool TM-1 spoke tension balancing',
        'Tubeless setup & 24h pressure retention test',
      ],
    },
  },
];

export interface LocalizedContent {
  nav: {
    process: string;
    champion: string;
    reels: string;
    bookCta: string;
  };
  assemblySteps: [
    AssemblyStepCopy,
    AssemblyStepCopy,
    AssemblyStepCopy,
    AssemblyStepCopy,
    AssemblyStepCopy,
  ];
  trophyTransition: {
    number: string;
    pillLabel: string;
    kicker: string;
    backdropWord: string;
    title: string;
    description: string;
    medalsLabel: string;
    cupsLabel: string;
    handoffBadge: string;
  };
  champion: {
    kicker: string;
    headline: string;
    bio: string;
    stat1Value: string;
    stat1Label: string;
    stat2Value: string;
    stat2Label: string;
    stat3Value: string;
    stat3Label: string;
    stat4Value: string;
    stat4Label: string;
    locationLabel: string;
    founderRole: string;
    sinceLabel: string;
    quote: string;
    quoteSub: string;
  };
  reels: {
    kicker: string;
    headline: string;
    filterAll: string;
    filterRoad: string;
    filterMtb: string;
    filterEbike: string;
    filterGravel: string;
    inspectBtn: string;
    viewsUnit: string;
    reportTitle: string;
    archiveLabel: string;
    operationsHeading: string;
    whatsappDirectBtn: string;
  };
  directBooking: {
    kicker: string;
    headline: string;
    subtitle: string;
    whatsappBtn: string;
    locationBadge: string;
    hoursBadge: string;
  };
}

export const UI_COPY: Record<Language, LocalizedContent> = {
  fr: {
    nav: {
      process: 'Le Montage',
      champion: 'Le Champion',
      reels: 'Réalisations',
      bookCta: 'Prendre RDV',
    },
    assemblySteps: [
      {
        stepNumber: '01',
        pillLabel: 'CADRE',
        kicker: 'ÉTAPE 01/05 · CHÂSSIS CARBONE SUR SUPPORT PARK TOOL BLEU',
        backdropWord: 'CADRE',
        title: 'TOUT COMMENCE SUR LE CADRE CARBONE VELO REGLO.',
        description:
          'Nous fixons le cadre nu sur le pied d’atelier bleu Park Tool. En tant que mécanicien expert, je contrôle l’état des fibres de carbone, j’aligne la patte de dérailleur au laser (DAG-3 à ±0,05 mm) et je prépare le boîtier PressFit avec de la pâte carbone anti-friction.',
        cta: 'Étape 02 : Suspension Kashima & Cockpit',
        toolCode: 'PARK TOOL DAG-3',
        torqueSpec: '±0.05 mm',
        rightCalloutTitle: 'Protocole Châssis & Géométrie Laser',
        rightCalloutBody:
          'Un vélo qui gagne se construit sur un cadre parfaitement aligné, sans jeu ni contrainte mécanique.',
        expertChecklist: [
          'Alignement laser patte de dérailleur (Park Tool DAG-3)',
          'Nettoyage & surfaçage boîtier PressFit BB92 + jeu de direction',
          'Inspection des roulements de biellette carbone & pâte Park Tool',
        ],
      },
      {
        stepNumber: '02',
        pillLabel: 'SUSPENSION',
        kicker: 'ÉTAPE 02/05 · FOURCHE FOX 34 KASHIMA, AMORTISSEUR & COCKPIT',
        backdropWord: 'KASHIMA',
        title: 'SERVICE SUSPENSION FOX KASHIMA & POSTE DE PILOTAGE.',
        description:
          'La fourche Fox 34 Kashima, l’amortisseur Fox Float, la tige de selle télescopique et le cintre carbone viennent se verrouiller sur le cadre. Nous remplaçons les joints racleurs SKF, renouvelons l’huile Fox 20wt Gold et réglons le SAG au poids exact du coureur.',
        cta: 'Étape 03 : Pédalier & Cassette Or',
        toolCode: 'FOX 20WT GOLD · TW-5.2',
        torqueSpec: '5.2 Nm',
        rightCalloutTitle: 'Entretien Fourche, Amortisseur & Direction',
        rightCalloutBody:
          'Serrage dynamométrique précis de la potence (5.2 Nm) et lubrification basse friction des plongeurs Kashima.',
        expertChecklist: [
          'Vidange huile Fox 20wt Gold & remplacement joints racleurs SKF',
          'Calibration pression d’air (SAG) & détente hydraulique sur-mesure',
          'Serrage cockpit carbone & tige télescopique à 5.2 Nm certifiés',
        ],
      },
      {
        stepNumber: '03',
        pillLabel: 'TRANSMISSION',
        kicker: 'ÉTAPE 03/05 · PÉDALIER SRAM XX, CASSETTE OR 12V & DÉRAILLEUR',
        backdropWord: 'COUPLE',
        title: 'CALIBRATION PÉDALIER SRAM XX, CASSETTE OR & DÉRAILLEUR.',
        description:
          'Nous pressons les roulements céramiques, montons le pédalier carbone SRAM XX à 54 Nm, verrouillons la cassette 12 vitesses Or à 40 Nm et réglons le dérailleur arrière bleu anodisé au dixième de millimètre.',
        cta: 'Étape 04 : Chaîne Or & Freins',
        toolCode: 'SRAM XX · 10-52T GOLD',
        torqueSpec: '40.0 / 54.0 Nm',
        rightCalloutTitle: 'Transmission Céramique & Couple Certifié',
        rightCalloutBody:
          'Zéro perte de watts : alignement parfait des galets céramiques et serrage au couple constructeur.',
        expertChecklist: [
          'Pressage roulements céramiques & serrage pédalier SRAM XX (54 Nm)',
          'Verrouillage cassette 12v Or 10-52T à la clé dynamométrique (40 Nm)',
          'Réglage vis de butée H/L, B-Gap et indexation micro-précise',
        ],
      },
      {
        stepNumber: '04',
        pillLabel: 'CHAÎNE & FREINS',
        kicker: 'ÉTAPE 04/05 · DÉGRAISSAGE ULTRASON CHAÎNE OR & PURGE FREINS',
        backdropWord: 'ULTRASONS',
        title: 'CHAÎNE OR DÉGRAISSÉE AUX ULTRASONS & FREINS HYDRAULIQUES.',
        description:
          'Nous mesurons l’usure de la chaîne (et en installons une neuve si nécessaire). La chaîne Or passe au bain à ultrasons pour un dégraissage intégral, puis reçoit une huile céramique ou cire course maillon par maillon, pendant que nous purgeons les freins à disque 180/160 mm.',
        cta: 'Étape 05 : Roues Zipp & Tubeless',
        toolCode: 'ULTRASONIC BATH · CC-4',
        torqueSpec: '6.2 Nm Disques',
        rightCalloutTitle: 'Dégraissage Ultrason, Lubrification & Purge',
        rightCalloutBody:
          'Une chaîne dégraissée à cœur puis lubrifiée au millimètre économise jusqu’à 5 watts et protège votre cassette Or.',
        expertChecklist: [
          'Contrôle d’usure Park Tool CC-4 & pose chaîne 12v Or neuve si usée',
          'Nettoyage + dégraissage intégral aux ultrasons & huile/cire céramique',
          'Dévoilage disques 180/160 mm & purge hydraulique zéro bulle',
        ],
      },
      {
        stepNumber: '05',
        pillLabel: 'ROUES & PODIUM',
        kicker: 'ÉTAPE 05/05 · ROUES ZIPP CARBONE, TUBELESS MAXXIS & FINITION',
        backdropWord: 'PODIUM',
        title: 'ROUES ZIPP CARBONE, PRÉVENTIF TUBELESS MAXXIS & PRÊT À GAGNER.',
        description:
          'Les roues carbone Zipp chaussées de pneus Maxxis skinwall s’assemblent sur les axes. Nous dévoilons les jantes au tensiomètre, réparons le pneu si besoin, injectons 60 ml de liquide préventif tubeless neuf et ajustons la pression de course : le vélo Velo Reglo est prêt pour la victoire.',
        cta: 'Voir les 10 Médailles & 3 Coupes du Champion',
        toolCode: 'ZIPP 303S · TUBELESS',
        torqueSpec: '1.4 / 1.6 BAR',
        rightCalloutTitle: 'Montage Tubeless Pro & Équilibrage Roues',
        rightCalloutBody:
          'Étanchéité garantie et rendement maximal sur terrain XCO grâce au préventif tubeless frais et aux rayons équilibrés.',
        expertChecklist: [
          'Dévoilage & équilibrage tension des rayons sur roues Zipp carbone',
          'Réparation pneu, pose fond de jante & injection 60 ml liquide tubeless',
          'Mise en pression course (1.4 bar AV / 1.6 bar AR) & contrôle final',
        ],
      },
    ],
    trophyTransition: {
      number: '06',
      pillLabel: 'TROPHÉES',
      kicker: 'DU VÉLO DE COURSE AU PALMARÈS DU CHAMPION',
      backdropWord: 'CHAMPION',
      title: 'LE VÉLO SE TRANSFORME EN 10 MÉDAILLES & 3 COUPES D’OR.',
      description:
        'Chaque réglage de précision porte la signature de Maher Habouria : 10 médailles d’or de Champion de Tunisie et 3 coupes d’or de Champion Arabe.',
      medalsLabel: '10 MÉDAILLES D’OR · CHAMPION DE TUNISIE',
      cupsLabel: '3 COUPES D’OR · CHAMPION ARABE',
      handoffBadge: 'DÉCOUVRIR LE PALMARÈS DE MAHER HABOURIA ↓',
    },
    champion: {
      kicker: 'FONDATEUR & CHEF MÉCANICIEN · NABEUL, TUNISIE',
      headline: 'MAHER HABOURIA : L’EXIGENCE D’UN 10× CHAMPION.',
      bio: 'Triple Champion Arabe et 10 fois Champion National de Tunisie en cyclisme (VTT XCO & Route). Depuis 2017, Maher met son expérience du très haut niveau international au service de votre vélo dans son atelier Velo Reglo à Nabeul / Dar Chaâbane.',
      stat1Value: '10×',
      stat1Label: 'Champion National de Tunisie 🥇',
      stat2Value: '3×',
      stat2Label: 'Champion Arabe Cyclisme 🥇',
      stat3Value: '2017',
      stat3Label: 'Atelier Fondé à Nabeul 🛠️',
      stat4Value: '6.1K+',
      stat4Label: 'Communauté Cycliste Fidèle',
      locationLabel: 'Atelier Velo Reglo · Nabeul / Dar Chaâbane El Fehri',
      founderRole: 'FONDATEUR & CHEF MÉCANICIEN',
      sinceLabel: 'DEPUIS 2017',
      quote:
        '« Un vélo bien réglé fait la différence entre le peloton et le podium. »',
      quoteSub: '3× Champion Arabe 🥇 · 10× Champion de Tunisie 🥇',
    },
    reels: {
      kicker: 'EN DIRECT DE L’ATELIER · #VELO_REGLO_BIEN_REGLO',
      headline: 'TRAVAUX RÉCENTS & PRÉPARATIONS COURSE',
      filterAll: 'Tous',
      filterRoad: 'Route Carbone',
      filterMtb: 'VTT / XCO',
      filterEbike: 'Vélo Électrique',
      filterGravel: 'Gravel',
      inspectBtn: 'Voir la fiche mécanique',
      viewsUnit: 'vues',
      reportTitle: 'RAPPORT D’INTERVENTION ATELIER',
      archiveLabel: 'Archive Atelier Velo Reglo · Nabeul',
      operationsHeading: 'OPÉRATIONS EFFECTUÉES SUR CE MODÈLE :',
      whatsappDirectBtn: 'Prendre RDV sur WhatsApp',
    },
    directBooking: {
      kicker: 'RENDEZ-VOUS DIRECT · ATELIER VELO REGLO NABEUL',
      headline: 'VOTRE VÉLO MÉRITE LE SOIN D’UN CHAMPION.',
      subtitle:
        'Contactez directement Maher Habouria sur WhatsApp pour réserver votre créneau à l’atelier de Nabeul / Dar Chaâbane.',
      whatsappBtn: 'Prendre RDV sur WhatsApp',
      locationBadge: 'Nabeul / Dar Chaâbane El Fehri',
      hoursBadge: 'Ouvert Lun – Sam · Réponse Rapide',
    },
  },
  tn: {
    nav: {
      process: 'مراحل Montage',
      champion: 'البطل ماهر',
      reels: 'خدمة Atelier',
      bookCta: 'خوذ موعد عالواتساب',
    },
    assemblySteps: [
      {
        stepNumber: '01',
        pillLabel: 'CADRE',
        kicker: 'المرحلة 01/05 · CADRE CARBONE على SUPPORT PARK TOOL الأزرق',
        backdropWord: 'CADRE',
        title: 'الخدمة الصحيحة تبدا من CADRE CARBONE VELO REGLO\u200F.',
        description:
          'أوّل حاجة نركّبو cadre carbone على support Park Tool الأزرق\u200F. نثبّتو في سلامة الكربون\u200F، نعدّلو patte de dérailleur باللازر (آلة DAG-3 بدقة 0.05 مم) ونحضّرو boîtier PressFit بـ pâte carbone الأصلية.',
        cta: 'المرحلة 02 : Suspension Kashima و Cockpit',
        toolCode: 'PARK TOOL DAG-3',
        torqueSpec: '±0.05 mm',
        rightCalloutTitle: 'مراقبة Cadre Carbone و Géométrie باللازر',
        rightCalloutBody:
          'Vélo اللي يربح السباق يتبنى على cadre مريڤل بالمليمتر بلاش حتى jeu في roulements\u200F.',
        expertChecklist: [
          'تعديل patte de dérailleur باللازر بآلة Park Tool DAG-3',
          'تنظيف وتعديل boîtier PressFit BB92 و jeu de direction',
          'مراقبة roulements متاع biellette carbone وتحضير pâte Park Tool',
        ],
      },
      {
        stepNumber: '02',
        pillLabel: 'SUSPENSION',
        kicker: 'المرحلة 02/05 · FOURCHE FOX 34 KASHIMA و AMORTISSEUR و COCKPIT',
        backdropWord: 'KASHIMA',
        title: 'تركيب وصيانة FOURCHE FOX KASHIMA و COCKPIT CARBONE\u200F.',
        description:
          'توّا تركب fourche Fox 34 Kashima\u200F، ومعاها amortisseur Fox Float و tige de selle Kashima و guidon carbone على نفس cadre\u200F. نبدّلو joints racleurs SKF\u200F، نجدّدو زيت Fox 20wt Gold ونريڤلو ضغط الهواء (SAG) على ميزانك.',
        cta: 'المرحلة 03 : Pédalier و Cassette Or',
        toolCode: 'FOX 20WT GOLD · TW-5.2',
        torqueSpec: '5.2 Nm',
        rightCalloutTitle: 'صيانة Fourche و Amortisseur وتكبيس Cockpit',
        rightCalloutBody:
          'نكبسو potence و guidon carbone بـ clé dynamométrique على 5.2 Nm باش تضمن أمان وخفّة في التوجيه.',
        expertChecklist: [
          'تبديل زيت Fox 20wt Gold وتركيب joints racleurs SKF جدد',
          'Réglage ضغط الهواء (SAG) و rebond متاع fourche و amortisseur',
          'تكبيس cockpit carbone و tige de selle بـ clé dynamométrique (5.2 Nm)',
        ],
      },
      {
        stepNumber: '03',
        pillLabel: 'TRANSMISSION',
        kicker: 'المرحلة 03/05 · PÉDALIER SRAM XX و CASSETTE OR 12V و DÉRAILLEUR',
        backdropWord: 'TRANSMISSION',
        title: 'تركيب PÉDALIER SRAM XX و CASSETTE المذهّبة و DÉRAILLEUR\u200F.',
        description:
          'نشحّمو ونركّبو roulements céramiques في boîtier\u200F، نكبسو pédalier carbone SRAM XX على 54 Nm\u200F، ونركّبو cassette 12v المذهّبة على 40 Nm مع dérailleur الأزرق بـ galets céramiques مضبوطين بالمليمتر.',
        cta: 'المرحلة 04 : Chaîne Or و Freins',
        toolCode: 'SRAM XX · 10-52T GOLD',
        torqueSpec: '40.0 / 54.0 Nm',
        rightCalloutTitle: 'تعديل Transmission و Couple Dynamométrique',
        rightCalloutBody:
          'تبديل vitesses خفيف وسريع بلاش ضياع طاقة بفضل roulements céramiques وتكبيس مضبوط.',
        expertChecklist: [
          'تركيب وتشحيم roulements céramiques وتكبيس pédalier SRAM XX (54 Nm)',
          'تثبيت cassette 12v Gold 10-52T بـ clé dynamométrique (40 Nm)',
          'Réglage دقيق متاع vis H/L و B-Gap باش vitesses يتعدّاو كي الساعة',
        ],
      },
      {
        stepNumber: '04',
        pillLabel: 'CHAÎNE & FREINS',
        kicker: 'المرحلة 04/05 · DÉGRAISSAGE CHAÎNE OR بـ ULTRASONS و PURGE FREINS',
        backdropWord: 'ULTRASONS',
        title: 'تنظيف و DÉGRAISSAGE CHAÎNE المذهّبة و PURGE FREINS\u200F.',
        description:
          'نقيسو عمر chaîne بآلة CC-4 (ونركّبو chaîne جديدة كان لزم). نعملولها dégraissage وتنظيف عميق في حوض ultrasons\u200F، ومن بعد نزيتوها بـ huile céramique أو cire خاصة للسباق كعبة بكعبة\u200F، مع purge كاملة لـ freins hydrauliques و disques\u200F.',
        cta: 'المرحلة 05 : Roues Zipp و Tubeless',
        toolCode: 'ULTRASONIC BATH · CC-4',
        torqueSpec: '6.2 Nm Disques',
        rightCalloutTitle: 'Dégraissage Ultrason و Huile Céramique و Purge',
        rightCalloutBody:
          'Chaîne نظيفة ومزيّتة بـ huile céramique تحمي cassette المذهّبة وتعطيك سرعة أكبر بلاش حس.',
        expertChecklist: [
          'قيس chaîne بآلة Park Tool CC-4 وتبديل chaîne 12v Gold جديدة كان تشتّت',
          'غسيل و dégraissage في حوض ultrasons وتزييت بـ huile/cire céramique',
          'تعديل disques 180/160 mm وعملان purge hydraulique بلاش فقاعات هواء',
        ],
      },
      {
        stepNumber: '05',
        pillLabel: 'ROUES & PODIUM',
        kicker: 'المرحلة 05/05 · ROUES ZIPP CARBONE و TUBELESS MAXXIS حاضر للسباق',
        backdropWord: 'PODIUM',
        title: 'تركيب ROUES ZIPP CARBONE و تعمير TUBELESS MAXXIS للـ PODIUM\u200F.',
        description:
          'في المرحلة هذي يركبو roues carbone Zipp مع pneus Maxxis\u200F. نعدّلو العجالي عالميزان\u200F، نصلّحو pneu كان فيه نقبة\u200F، نبدّلو fond de jante ونعمّرو 60 مل liquide préventif tubeless جديد باش يسكر أي شوكة في الحين — وهكّا يولّي vélo Velo Reglo حاضر للسباق والربح!',
        cta: 'شوف 10 ميداليات ذهب و 3 كؤوس متاع البطل',
        toolCode: 'ZIPP 303S · TUBELESS',
        torqueSpec: '1.4 / 1.6 BAR',
        rightCalloutTitle: 'تعمير Liquide Tubeless وتعديل Roues Carbone',
        rightCalloutBody:
          'عجالي Zipp مريڤلين بـ tensiomètre ومعبّين بـ liquide préventif tubeless جديد لسباق مضمون 100%.',
        expertChecklist: [
          'تعديل dévoilage وميزان rayons متاع roues Zipp carbone بـ tensiomètre',
          'تصليح pneus Maxxis وتعمير 60 ml liquide préventif tubeless جديد',
          'ضبط ضغط الهواء للسباق (1.4 bar قدّام / 1.6 bar تالي) ومراقبة نهائية',
        ],
      },
    ],
    trophyTransition: {
      number: '06',
      pillLabel: 'تتويجات',
      kicker: 'من VÉLO DE COURSE لتتويجات البطل ماهر هبورية',
      backdropWord: 'CHAMPION',
      title: 'VÉLO يتحوّل لـ 10 ميداليات ذهب و 3 كؤوس.',
      description:
        'وراء كل réglage دقيق خبرة بطل كبير: 10 ميداليات ذهب بطل تونس و 3 كؤوس ذهب بطل العرب مع ماهر هبورية.',
      medalsLabel: '10 ميداليات ذهب · بطل تونس',
      cupsLabel: '3 كؤوس ذهب · بطل العرب',
      handoffBadge: 'اكتشف مسيرة البطل ماهر هبورية ↓',
    },
    champion: {
      kicker: 'مؤسّس الورشة و CHEF MÉCANICIEN · نابل، تونس',
      headline: 'ماهر هبورية : خبرة 10× CHAMPION في خدمة VÉLO متاعك.',
      bio: 'بطل العرب 3 مرات وبطل تونس 10 مرات في سباقات VTT XCO و vélo de route\u200F. ملي حلّ ورشة Velo Reglo عام 2017 في نابل ودار شعبان الفهري\u200F، ماهر يحطّ خبرتو العالمية الكل باش يرجّع vélo متاعك يمشي كي الساعة.',
      stat1Value: '10×',
      stat1Label: 'بطل تونس · Champion National 🥇',
      stat2Value: '3×',
      stat2Label: 'بطل العرب · Champion Arabe 🥇',
      stat3Value: '2017',
      stat3Label: 'تأسيس Atelier في نابل 🛠️',
      stat4Value: '6.1K+',
      stat4Label: 'متابعين يثيقو في خدمتنا',
      locationLabel: 'Atelier Velo Reglo · نابل / دار شعبان الفهري',
      founderRole: 'مؤسّس ATELIER و CHEF MÉCANICIEN',
      sinceLabel: 'من عام 2017',
      quote:
        '« Vélo المريڤل مليح هو اللي يعمل الفرق بين peloton و podium السباق. »',
      quoteSub: '3× Champion Arabe 🥇 · 10× Champion de Tunisie 🥇',
    },
    reels: {
      kicker: 'مباشرة من ATELIER · #VELO_REGLO_BIEN_REGLO',
      headline: 'من خدمتنا في الورشة وتحضير VÉLOS للسباق',
      filterAll: 'الكل',
      filterRoad: 'Route Carbone',
      filterMtb: 'VTT / XCO',
      filterEbike: 'Vélo Électrique',
      filterGravel: 'Gravel',
      inspectBtn: 'شوف fiche mécanique',
      viewsUnit: 'مشاهدة',
      reportTitle: 'بطاقة الخدمة في ATELIER',
      archiveLabel: 'أرشيف Atelier Velo Reglo · نابل',
      operationsHeading: 'الخدمة اللي صارت على VÉLO هذا :',
      whatsappDirectBtn: 'خوذ موعد عالواتساب',
    },
    directBooking: {
      kicker: 'موعد مباشر · ATELIER VELO REGLO نابل',
      headline: 'خلّي VÉLO متاعك بين يدين البطل ماهر هبورية.',
      subtitle:
        'تواصل مباشرة مع ماهر هبورية عالواتساب وخوذ موعدك في atelier نابل / دار شعبان الفهري.',
      whatsappBtn: 'خوذ موعد عالواتساب',
      locationBadge: 'نابل / دار شعبان الفهري',
      hoursBadge: 'محلول ماللثنين للسبت · إجابة سريعة',
    },
  },
  en: {
    nav: {
      process: 'The Build',
      champion: 'The Champion',
      reels: 'Workshop Builds',
      bookCta: 'Book on WhatsApp',
    },
    assemblySteps: [
      {
        stepNumber: '01',
        pillLabel: 'FRAME',
        kicker: 'STEP 01/05 · CARBON CHASSIS ON BLUE PARK TOOL STAND',
        backdropWord: 'FRAME',
        title: 'IT STARTS WITH THE BARE VELO REGLO CARBON FRAME.',
        description:
          'We clamp the bare Velo Reglo carbon frame onto our blue Park Tool stand. As a master mechanic, I inspect the carbon layup, laser-align the rear derailleur hanger (DAG-3 to ±0.05 mm), and prep the PressFit bottom bracket shell with Park Tool carbon compound.',
        cta: 'Step 02: Kashima Suspension & Cockpit',
        toolCode: 'PARK TOOL DAG-3',
        torqueSpec: '±0.05 mm',
        rightCalloutTitle: 'Chassis Prep & Laser Geometry Check',
        rightCalloutBody:
          'A race-winning bike requires a dead-straight hanger and perfectly faced bearing seats before a single bolt is turned.',
        expertChecklist: [
          'Laser derailleur hanger alignment (Park Tool DAG-3 to ±0.05 mm)',
          'PressFit BB92 & tapered headtube cleaning and bearing seat prep',
          'Carbon rocker link pivot bearing inspection & anti-seize paste',
        ],
      },
      {
        stepNumber: '02',
        pillLabel: 'SUSPENSION',
        kicker: 'STEP 02/05 · FOX 34 KASHIMA FORK, FLOAT SHOCK & COCKPIT',
        backdropWord: 'KASHIMA',
        title: 'FOX KASHIMA SUSPENSION SERVICE & CARBON COCKPIT.',
        description:
          'The Fox 34 Kashima fork, Fox Float rear shock, Kashima dropper seatpost, and carbon handlebar lock onto the frame. We replace the SKF dust wiper seals, refill fresh Fox 20wt Gold bath oil, set rider-specific SAG pressure, and torque the stem to 5.2 Nm.',
        cta: 'Step 03: Crankset & Gold Cassette',
        toolCode: 'FOX 20WT GOLD · TW-5.2',
        torqueSpec: '5.2 Nm',
        rightCalloutTitle: 'Kashima Suspension & Cockpit Torque',
        rightCalloutBody:
          'Plush small-bump sensitivity and razor-sharp steering with every carbon bolt torqued to exact factory specification.',
        expertChecklist: [
          'Fox 20wt Gold lower-leg oil service & new SKF low-friction seals',
          'Custom air spring SAG pressure & hydraulic rebound calibration',
          'Carbon handlebar stem & Kashima dropper post torqued to 5.2 Nm',
        ],
      },
      {
        stepNumber: '03',
        pillLabel: 'DRIVETRAIN',
        kicker: 'STEP 03/05 · SRAM XX CRANKSET, 12S GOLD CASSETTE & DERAILLEUR',
        backdropWord: 'TORQUE',
        title: 'SRAM XX CRANKSET, 24K GOLD CASSETTE & CERAMIC DERAILLEUR.',
        description:
          'We press and lubricate the ceramic bottom bracket bearings, torque the SRAM XX carbon crankset to 54 Nm, lock the 12-speed 24K Gold 10-52T cassette at 40 Nm, and bolt on the blue anodized ceramic-pulley rear derailleur.',
        cta: 'Step 04: Gold Chain & Disc Brakes',
        toolCode: 'SRAM XX · 10-52T GOLD',
        torqueSpec: '40.0 / 54.0 Nm',
        rightCalloutTitle: 'Ceramic Drivetrain & Certified Torque',
        rightCalloutBody:
          'Zero wasted watts: ceramic pulley alignment and digital torque wrench verification on every drivetrain thread.',
        expertChecklist: [
          'Ceramic bottom bracket bearing press & SRAM XX crank torque (54 Nm)',
          '12-speed 10-52T Gold cassette locked with torque wrench (40 Nm)',
          'H/L limit screws, B-gap gauge, and micro-adjust shift indexing',
        ],
      },
      {
        stepNumber: '04',
        pillLabel: 'CHAIN & BRAKES',
        kicker: 'STEP 04/05 · ULTRASONIC GOLD CHAIN DEGREASE & DISC BRAKE BLEED',
        backdropWord: 'ULTRASONIC',
        title: 'ULTRASONIC CHAIN DEGREASING, CERAMIC OIL & DISC BRAKES.',
        description:
          'We check chain stretch with the Park Tool CC-4 gauge (and install a brand-new 24K Gold chain if worn). We deep-clean and degrease the chain in our heated ultrasonic bath, apply pro ceramic oil or race wax link by link, and bleed the 180/160 mm hydraulic disc brakes.',
        cta: 'Step 05: Zipp Wheels & Tubeless Setup',
        toolCode: 'ULTRASONIC BATH · CC-4',
        torqueSpec: '6.2 Nm Rotors',
        rightCalloutTitle: 'Ultrasonic Degreasing, Pro Lube & Bleed',
        rightCalloutBody:
          'Stripping factory grease in an ultrasonic bath and applying ceramic lube link by link saves watts and extends cassette life.',
        expertChecklist: [
          'Park Tool CC-4 wear check & new 12s Gold chain setup if stretched',
          'Full ultrasonic degreasing bath + link-by-link ceramic oil / wax',
          '180/160 mm rotor truing & bubble-free hydraulic brake bleed',
        ],
      },
      {
        stepNumber: '05',
        pillLabel: 'WHEELS & PODIUM',
        kicker: 'STEP 05/05 · ZIPP CARBON WHEELS, MAXXIS TUBELESS & RACE READY',
        backdropWord: 'PODIUM',
        title: 'ZIPP CARBON WHEELS, MAXXIS TUBELESS SEALANT & RACE READY.',
        description:
          'The Zipp carbon wheelset wrapped in Maxxis tan-wall tires locks onto the axles. We true the wheels on the tensiometer stand, repair any tire punctures, fill 60 ml of fresh tubeless sealant liquid per wheel, and dial in race tire pressure — ready to start the race and win.',
        cta: 'See the Champion’s 10 Medals & 3 Cups',
        toolCode: 'ZIPP 303S · TUBELESS',
        torqueSpec: '1.4 / 1.6 BAR',
        rightCalloutTitle: 'Tubeless Sealant Fill & Wheel Truing',
        rightCalloutBody:
          'Fresh tubeless liquid seals thorns instantly on the course while balanced Zipp carbon spoke tension delivers maximum speed.',
        expertChecklist: [
          'Lateral & radial wheel truing + Park Tool TM-1 spoke tension balance',
          'Tire inspection/repair, rim tape & 60 ml fresh tubeless liquid fill',
          'Race tire pressure setup (1.4 bar Front / 1.6 bar Rear) & final check',
        ],
      },
    ],
    trophyTransition: {
      number: '06',
      pillLabel: 'TROPHIES',
      kicker: 'FROM RACE SUPERBIKE TO CHAMPIONSHIP GOLD',
      backdropWord: 'CHAMPION',
      title: 'THE BIKE BECOMES 10 GOLD MEDALS & 3 GOLD CUPS.',
      description:
        'Every precision build carries the pedigree of Maher Habouria: 10× Tunisian National Champion gold medals and 3× Arab Cycling Champion gold cups.',
      medalsLabel: '10 GOLD MEDALS · TUNISIAN CHAMPION',
      cupsLabel: '3 GOLD CUPS · ARAB CHAMPION',
      handoffBadge: 'MEET CHAMPION MAHER HABOURIA BELOW ↓',
    },
    champion: {
      kicker: 'FOUNDER & MASTER MECHANIC · NABEUL, TUNISIA',
      headline: 'MAHER HABOURIA: THE STANDARD OF A 10× CHAMPION.',
      bio: '3× Arab Cycling Champion and 10× Tunisian National Champion (XCO MTB & Road). Since 2017, Maher brings elite international race mechanics directly to your bike at the Velo Reglo studio in Nabeul / Dar Chaâbane.',
      stat1Value: '10×',
      stat1Label: 'Tunisian National Champion 🥇',
      stat2Value: '3×',
      stat2Label: 'Arab Cycling Champion 🥇',
      stat3Value: '2017',
      stat3Label: 'Atelier Founded in Nabeul 🛠️',
      stat4Value: '6.1K+',
      stat4Label: 'Loyal Riders & Followers',
      locationLabel: 'Velo Reglo Atelier · Nabeul / Dar Chaâbane El Fehri',
      founderRole: 'FOUNDER & MASTER MECHANIC',
      sinceLabel: 'SINCE 2017',
      quote:
        '"A properly dialed bike makes the difference between the pack and the podium."',
      quoteSub: '3× Arab Champion 🥇 · 10× National Champion 🥇',
    },
    reels: {
      kicker: 'LIVE FROM THE STAND · #VELO_REGLO_BIEN_REGLO',
      headline: 'RECENT BUILDS & RACE PREPARATIONS',
      filterAll: 'All Builds',
      filterRoad: 'Carbon Road',
      filterMtb: 'MTB / XCO',
      filterEbike: 'E-Bike Motors',
      filterGravel: 'Gravel',
      inspectBtn: 'Inspect mechanical sheet',
      viewsUnit: 'views',
      reportTitle: 'WORKSHOP SERVICE REPORT',
      archiveLabel: 'Velo Reglo Atelier Archive · Nabeul',
      operationsHeading: 'OPERATIONS PERFORMED ON THIS BUILD:',
      whatsappDirectBtn: 'Book on WhatsApp',
    },
    directBooking: {
      kicker: 'DIRECT BOOKING · VELO REGLO ATELIER NABEUL',
      headline: 'YOUR BIKE DESERVES A CHAMPION’S TOUCH.',
      subtitle:
        'Connect directly with Maher Habouria on WhatsApp to book your workshop slot in Nabeul / Dar Chaâbane.',
      whatsappBtn: 'Book Directly on WhatsApp',
      locationBadge: 'Nabeul / Dar Chaâbane El Fehri',
      hoursBadge: 'Open Mon – Sat · Fast Reply',
    },
  },
};

export interface ScrollyMetrics {
  clampedProgress: number;
  activeStage: AssemblyStageIndex;
  stageLocalProgress: number;
  chainDropOffsetPx: number;
  cassetteRotationDeg: number;
  superbikeScale: number;
  trophyMorphProgress: number;
}

/**
 * Pure helper that maps overall scroll progress [0..1] across the 6-stage progressive assembly runway:
 * - Stage 1 (0.00..0.16): Bare Velo Reglo Carbon Frame on Blue Park Tool Stand + Laser Alignment
 * - Stage 2 (0.16..0.33): Fox 34 Kashima Fork, Fox Float Shock, Kashima Seatpost & Carbon Cockpit
 * - Stage 3 (0.33..0.50): Ceramic BB, SRAM XX Crankset, 24K Gold 12s Cassette & Blue Derailleur
 * - Stage 4 (0.50..0.67): 24K Gold Chain (Ultrasonic Degreased & Lubed) & Hydraulic Disc Rotors
 * - Stage 5 (0.67..0.84): Zipp Carbon Wheels, Maxxis Tubeless Sealant & Complete Race-Ready Superbike
 * - Stage 6 (0.84..1.00): Transformation into 10 Gold Medals & 3 Gold Cups Introducing Champion Maher Habouria
 */
export function computeScrollyMetrics(rawProgress: number): ScrollyMetrics {
  const clampedProgress = Math.max(
    0,
    Math.min(1, Number.isFinite(rawProgress) ? rawProgress : 0)
  );

  let activeStage: AssemblyStageIndex = 1;
  let stageLocalProgress = 0;

  if (clampedProgress < 0.16) {
    activeStage = 1;
    stageLocalProgress = clampedProgress / 0.16;
  } else if (clampedProgress < 0.33) {
    activeStage = 2;
    stageLocalProgress = (clampedProgress - 0.16) / 0.17;
  } else if (clampedProgress < 0.50) {
    activeStage = 3;
    stageLocalProgress = (clampedProgress - 0.33) / 0.17;
  } else if (clampedProgress < 0.67) {
    activeStage = 4;
    stageLocalProgress = (clampedProgress - 0.50) / 0.17;
  } else if (clampedProgress < 0.84) {
    activeStage = 5;
    stageLocalProgress = (clampedProgress - 0.67) / 0.17;
  } else {
    activeStage = 6;
    stageLocalProgress = (clampedProgress - 0.84) / 0.16;
  }

  const chainDropOffsetPx = Math.round(clampedProgress * 420);
  const cassetteRotationDeg = Math.round(clampedProgress * 720);
  const superbikeScale = Number(
    (
      0.92 +
      Math.min(1, Math.max(0, (clampedProgress - 0.6) / 0.24)) * 0.08
    ).toFixed(3)
  );

  const trophyMorphProgress = Number(
    Math.max(0, Math.min(1, (clampedProgress - 0.82) / 0.15)).toFixed(3)
  );

  return {
    clampedProgress,
    activeStage,
    stageLocalProgress: Number(
      Math.max(0, Math.min(1, stageLocalProgress)).toFixed(3)
    ),
    chainDropOffsetPx,
    cassetteRotationDeg,
    superbikeScale,
    trophyMorphProgress,
  };
}

export interface EstimateSummary {
  selectedServices: ServiceOption[];
  subtotalTnd: number;
  multiplier: number;
  totalTnd: number;
  totalHours: number;
}

export function calculateRepairEstimate(
  category: BikeCategory,
  selectedServiceIds: string[]
): EstimateSummary {
  const multiplier = BIKE_CATEGORY_MULTIPLIERS[category] ?? 1.0;
  const selectedServices = SERVICE_OPTIONS.filter((s) =>
    selectedServiceIds.includes(s.id)
  );

  const subtotalTnd = selectedServices.reduce(
    (sum, item) => sum + item.basePriceTnd,
    0
  );
  const rawHours = selectedServices.reduce(
    (sum, item) => sum + item.durationHours,
    0
  );

  const totalTnd = Math.round((subtotalTnd * multiplier) / 5) * 5;
  const totalHours = Number(
    (rawHours * (multiplier > 1.15 ? 1.15 : 1)).toFixed(1)
  );

  return {
    selectedServices,
    subtotalTnd,
    multiplier,
    totalTnd,
    totalHours,
  };
}
