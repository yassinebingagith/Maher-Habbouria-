export type Language = 'fr' | 'tn' | 'en';

export type BikeCategory = 'road' | 'mtb' | 'ebike' | 'gravel';

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
  imageCropPosition: string;
  imageSrc: string;
  operations: Record<Language, string[]>;
}

export interface CustomAssetPromptItem {
  id: string;
  slotKey:
    | 'stage1_frame'
    | 'stage1_falling_chain'
    | 'stage2_drivetrain'
    | 'stage3_superbike'
    | 'floating_components'
    | 'video_1_to_2'
    | 'video_2_to_3';
  format: 'PNG Cutout (Transparent)' | 'Scroll Video (MP4 / WebM)';
  stageLabel: Record<Language, string>;
  title: Record<Language, string>;
  aspectRatio: string;
  prompt: string;
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
      tn: 'حلّان vélo كامل على support Park Tool أزرق\u200F، تشحيم roulements céramiques وتكبيس بـ clé dynamométrique\u200F.',
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
      fr: 'TRANSMISSION & CÉRAMIQUE',
      tn: 'TRANSMISSION و ROULEMENTS CÉRAMIQUES',
      en: 'DRIVETRAIN & CERAMICS',
    },
    subtitle: {
      fr: '12V DI2 / AXS · -4.2 WATTS DE FRICTION',
      tn: 'تبديل vitesses Di2 / AXS خفيف · أسرع في الطلعة',
      en: '12S DI2 / AXS · -4.2 WATTS FRICTION LOSS',
    },
    protocol: {
      fr: 'Alignement laser du dérailleur, bain à ultrasons intégral et lubrification cire haute vitesse.',
      tn: 'تعديل dérailleur باللازر\u200F، غسيل cassette و chaîne بـ ultrasons وتشميع خاص للسباقات.',
      en: 'Laser hanger alignment, full ultrasonic bath and high-velocity race wax treatment.',
    },
    metric: '0.08 mm Tolérance',
    tiltDeg: -6,
    serviceId: 'drivetrain_ultrasonic',
  },
  {
    id: 'card-ebike',
    badgeCode: 'SPEC 02 · MOTORISATION',
    title: {
      fr: 'MOTEURS E-BIKE & COUPLE',
      tn: 'MOTEURS VÉLO ÉLECTRIQUE و BATTERIE',
      en: 'E-BIKE MOTORS & TORQUE',
    },
    subtitle: {
      fr: 'BOSCH CX / SHIMANO EP8 · 85 NM CALIBRÉS',
      tn: 'صيانة كاملة للموتور و batterie · عزم 85 نيوتن',
      en: 'BOSCH CX / SHIMANO EP8 · 85 NM CALIBRATED',
    },
    protocol: {
      fr: 'Ouverture carter moteur, remplacement des roulements planétaires et test thermique batterie.',
      tn: 'حلّان carter moteur\u200F، تبديل roulements planétaires وتجربة صحة batterie والسخونة.',
      en: 'Motor housing teardown, planetary gear bearing replacement and battery thermal load test.',
    },
    metric: '100% Étanchéité IPX6',
    tiltDeg: 0,
    serviceId: 'ebike_diagnostics',
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
      fr: 'Serrage dynamométrique certifié sur chaque vis titane/carbone, purge freins et équilibrage roues.',
      tn: 'تكبيس كل vis titane و carbone بـ clé dynamométrique\u200F، مع purge freins وتعديل roues عالميزان.',
      en: 'Certified torque wrench check on every titanium/carbon bolt, brake bleed and wheel truing.',
    },
    metric: '40.0 Nm Lockring',
    tiltDeg: 6,
    serviceId: 'complete_overhaul',
  },
];

/**
 * Exact 100% uncropped vertical Reel coordinates (`width = 154, height = 246`)
 * inside `/assets/aistudio/image_c486ec23.png` (1920x1080).
 */
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
    imageCropPosition: '378 512 154 246',
    imageSrc: '/assets/aistudio/image_c486ec23.png',
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
    imageCropPosition: '1208 224 154 246',
    imageSrc: '/assets/aistudio/image_c486ec23.png',
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
    imageCropPosition: '1374 512 154 246',
    imageSrc: '/assets/aistudio/image_c486ec23.png',
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
    imageCropPosition: '1208 512 154 246',
    imageSrc: '/assets/aistudio/image_c486ec23.png',
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

export const CUSTOM_ASSET_PROMPTS: CustomAssetPromptItem[] = [
  {
    id: 'prompt-stage-1-frame',
    slotKey: 'stage1_frame',
    format: 'PNG Cutout (Transparent)',
    stageLabel: {
      fr: 'Étape 01 · Le Cadre (Équivalent "Grind")',
      tn: 'المرحلة 01 · Cadre Carbone على Support Bleu',
      en: 'Stage 01 · The Frame ("Grind" Equivalent)',
    },
    title: {
      fr: 'Cadre Carbone Brut sur Pied Park Tool Bleu',
      tn: 'Cadre carbone على support Park Tool الأزرق',
      en: 'Raw Carbon Frame on Blue Park Tool Stand',
    },
    aspectRatio: '4:5',
    prompt:
      'Ultra-detailed commercial studio product photography of a matte raw 3K woven carbon fiber mountain/road bike frame clamped onto an anodized Park Tool blue (#0073CF) professional mechanic repair stand, three-quarter side profile, crisp rim lighting, isolated on a pure solid white background (#FFFFFF) for clean alpha cutout, 8k resolution, photorealistic.',
  },
  {
    id: 'prompt-stage-1-chain',
    slotKey: 'stage1_falling_chain',
    format: 'PNG Cutout (Transparent)',
    stageLabel: {
      fr: 'Transition 01 → 02 · Chute Verticale (Équivalent grains de café)',
      tn: 'التحول 01 ← 02 · Dérailleur و Chaîne المذهّبة',
      en: 'Transition 01 → 02 · Vertical Drop (Coffee Beans Equivalent)',
    },
    title: {
      fr: 'Chaîne Or SRAM XX1 & Galets Céramiques en Mouvement Vertical',
      tn: 'Chaîne مذهّبة و dérailleur بـ roulements céramiques زرقاء',
      en: 'Falling Gold SRAM XX1 Chain & Ceramic Pulleys',
    },
    aspectRatio: '9:16',
    prompt:
      'High-speed macro studio shot of a gleaming gold bicycle chain (SRAM XX1 Eagle Gold) and anodized cyan-blue ceramic derailleur pulley wheels cascading vertically downward through the air, dynamic vertical flow, crisp metallic specular highlights, isolated on a pure white background (#FFFFFF) for transparent cutout, 8k commercial photography.',
  },
  {
    id: 'prompt-stage-2-drivetrain',
    slotKey: 'stage2_drivetrain',
    format: 'PNG Cutout (Transparent)',
    stageLabel: {
      fr: 'Étape 02 · La Mécanique (Équivalent "Pour")',
      tn: 'المرحلة 02 · Transmission و Moteur Vélo Électrique',
      en: 'Stage 02 · The Mechanics ("Pour" Equivalent)',
    },
    title: {
      fr: 'Vue Éclatée Cassette Or 12V & Moteur E-Bike Bosch',
      tn: 'Cassette مذهّبة و moteur vélo électrique Bosch محلول',
      en: 'Exploded 12S Gold Cassette & Bosch E-Bike Motor',
    },
    aspectRatio: '1:1',
    prompt:
      'Exploded technical studio view of a precision 12-speed gold CNC bicycle cassette interlocking with an opened Bosch e-bike mid-drive motor showing clean planetary gears and a blue Park Tool torque wrench, dramatic studio lighting with cyan and gold reflections, isolated on a pure solid white background (#FFFFFF), 8k photorealistic.',
  },
  {
    id: 'prompt-stage-3-superbike',
    slotKey: 'stage3_superbike',
    format: 'PNG Cutout (Transparent)',
    stageLabel: {
      fr: 'Étape 03 · Le Podium (Équivalent "Sip")',
      tn: 'المرحلة 03 · Vélo حاضر للـ Podium',
      en: 'Stage 03 · The Podium ("Sip" Equivalent)',
    },
    title: {
      fr: 'Superbike Carbone Prêt pour la Course ("Bien Réglo")',
      tn: 'Vélo de course carbone كامل ومريڤل للسباق',
      en: 'Race-Ready Carbon Superbike ("Bien Réglo")',
    },
    aspectRatio: '16:10',
    prompt:
      'Hero commercial studio shot of a complete championship-winning full-suspension carbon XC / aero superbike in midnight carbon with subtle electric cyan (#00A8E8) and gold drivetrain accents, deep carbon wheels, razor-sharp focus, floating slightly above a soft studio shadow on a pure solid white background (#FFFFFF), 8k commercial product shot.',
  },
  {
    id: 'prompt-video-transition-1',
    slotKey: 'video_1_to_2',
    format: 'Scroll Video (MP4 / WebM)',
    stageLabel: {
      fr: 'Vidéo Transition A · Cadre vers Transmission',
      tn: 'فيديو التحول أ · من Cadre إلى Transmission',
      en: 'Transition Video A · Frame to Drivetrain',
    },
    title: {
      fr: 'Animation Seamless : La Chaîne Or s’engrène sur la Cassette',
      tn: 'فيديو انسيابي: Chaîne المذهّبة تركب في Cassette',
      en: 'Seamless Scroll Video: Gold Chain Locking onto Spinning Cassette',
    },
    aspectRatio: '16:9',
    prompt:
      'Seamless commercial product transition video on a clean light studio background (#F4F6F9): camera pans vertically downward from a raw carbon bike frame clamped on a blue Park Tool stand, following a falling gold bicycle chain as it smoothly locks onto a spinning 12-speed gold cassette and e-bike motor assembly, 60fps slow-motion macro cinematography.',
  },
  {
    id: 'prompt-video-transition-2',
    slotKey: 'video_2_to_3',
    format: 'Scroll Video (MP4 / WebM)',
    stageLabel: {
      fr: 'Vidéo Transition B · Transmission vers Superbike Podium',
      tn: 'فيديو التحول ب · من Transmission إلى Vélo الكامل',
      en: 'Transition Video B · Drivetrain to Podium Superbike',
    },
    title: {
      fr: 'Animation Seamless : Assemblage Complet du Vélo de Course',
      tn: 'فيديو انسيابي: تجميع Vélo الكامل للسباق',
      en: 'Seamless Scroll Video: Drivetrain Zooming Out into Full Race Superbike',
    },
    aspectRatio: '16:9',
    prompt:
      'Seamless commercial product transition video: starting on a close-up of a spinning gold bicycle cassette and blue Park Tool torque wrench clicking at 40 Nm, camera pulls back smoothly as carbon wheels, hydraulic disc brakes, and a sleek black-and-cyan carbon frame assemble around the drivetrain into a complete championship race bike.',
  },
];

export interface LocalizedContent {
  nav: {
    process: string;
    champion: string;
    reels: string;
    bookCta: string;
    assetStudio: string;
  };
  stage1: {
    number: string;
    kicker: string;
    backdropWord: string;
    title: string;
    description: string;
    cta: string;
    rightCalloutTitle: string;
    rightCalloutBody: string;
    handoffLabel: string;
  };
  stage2: {
    number: string;
    kicker: string;
    backdropWord: string;
    title: string;
    description: string;
    cta: string;
    rightCalloutTitle: string;
    rightCalloutBody: string;
    handoffLabel: string;
  };
  stage3: {
    number: string;
    kicker: string;
    backdropWord: string;
    title: string;
    description: string;
    cta: string;
  };
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
      process: 'Le Processus',
      champion: 'Le Champion',
      reels: 'Réalisations',
      bookCta: 'Prendre RDV',
      assetStudio: 'Studio Assets IA',
    },
    stage1: {
      number: '01',
      kicker: 'DIAGNOSTIC & CHÂSSIS SUR SUPPORT BLEU PARK TOOL',
      backdropWord: 'CADRE',
      title: 'LA PRÉCISION COMMENCE AU CADRE.',
      description:
        'Chaque vélo — Route Carbone, VTT XCO, Gravel ou Vélo Électrique — est fixé sur notre support bleu Park Tool pour un contrôle géométrique et structurel au dixième de millimètre.',
      cta: 'Suivre la chaîne mécanique',
      rightCalloutTitle: 'Inspection Géométrique & Roulements',
      rightCalloutBody:
        'Contrôle laser de la patte de dérailleur, état des portées carbone et diagnostic complet avant démontage.',
      handoffLabel: 'LA CHAÎNE OR DESCEND VERS L’ATELIER ↓',
    },
    stage2: {
      number: '02',
      kicker: 'CALIBRATION TRANSMISSION, ULTRASONS & VÉLO ÉLECTRIQUE',
      backdropWord: 'MÉCANIQUE',
      title: 'L’ALCHIMIE DU COUPLE & DES ENGRENAGES.',
      description:
        'La chaîne s’engrène sur la cassette décontaminée aux ultrasons. Moteurs vélo électrique Bosch/Shimano, roulements céramiques et serrage dynamométrique certifié.',
      cta: 'Voir la finition Podium',
      rightCalloutTitle: 'Serrage Dynamométrique & Bain Ultrason',
      rightCalloutBody:
        'Zéro approximation : chaque vis titane et écrou de cassette est calibré selon les normes constructeur.',
      handoffLabel: 'ASSEMBLAGE FINAL SUR LE VÉLO DE COURSE ↓',
    },
    stage3: {
      number: '03',
      kicker: 'FINITION COURSE · #VELO_REGLO_BIEN_REGLO',
      backdropWord: 'PODIUM',
      title: 'PRÊT POUR LE PODIUM. BIEN RÉGLO.',
      description:
        'Quand la mécanique est signée par un 10× Champion de Tunisie, chaque coup de pédale est transformé en vitesse pure, sans bruit ni friction.',
      cta: 'Prendre RDV sur WhatsApp',
    },
    trophyTransition: {
      number: '04',
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
      process: 'كيفاش نخدمو',
      champion: 'البطل ماهر',
      reels: 'خدمة Atelier',
      bookCta: 'خوذ موعد عالواتساب',
      assetStudio: 'Studio Assets IA',
    },
    stage1: {
      number: '01',
      kicker: 'مراقبة CADRE CARBONE على SUPPORT PARK TOOL الأزرق',
      backdropWord: 'CADRE',
      title: 'الخدمة الصحيحة تبدا من CADRE CARBONE\u200F.',
      description:
        'كل vélo يجينا للورشة — سواء vélo de course carbone\u200F، أو VTT XCO\u200F، أو gravel\u200F، ولّا vélo électrique — يركب على support Park Tool الأزرق باش نثبّتو في cadre و roulements بالمليمتر.',
      cta: 'تبّع مرحلة Mécanique',
      rightCalloutTitle: 'مراقبة Géométrie و Roulements',
      rightCalloutBody:
        'نعدّلو patte de dérailleur باللازر ونراقبو cadre carbone و boîtier قبل ما نحلّو vélo قطعة بقطعة.',
      handoffLabel: 'CHAÎNE المذهّبة تهبط لمرحلة MÉCANIQUE ↓',
    },
    stage2: {
      number: '02',
      kicker: 'تعديل TRANSMISSION و ULTRASONS و MOTEUR VÉLO ÉLECTRIQUE',
      backdropWord: 'MÉCANIQUE',
      title: 'الصنعة الدقيقة في TRANSMISSION و MOTEUR\u200F.',
      description:
        'Chaîne تركب على cassette المغسولة بـ ultrasons\u200F. نصيّنو moteurs متاع vélo électrique Bosch و Shimano\u200F، نبدّلو roulements céramiques ونكبسو كل vis بـ clé dynamométrique\u200F.',
      cta: 'شوف Vélo حاضر للـ Podium',
      rightCalloutTitle: 'تكبيس بـ Clé Dynamométrique وغسيل Ultrasons',
      rightCalloutBody:
        'خدمة نظيفة بلاش تخمين: كل vis titane ولّا carbone يتكبس بـ clé dynamométrique متاع Park Tool\u200F.',
      handoffLabel: 'تجميع VÉLO DE COURSE الكامل ↓',
    },
    stage3: {
      number: '03',
      kicker: 'تحضير السباق · #VELO_REGLO_BIEN_REGLO',
      backdropWord: 'PODIUM',
      title: 'VÉLO متاعك حاضر للـ PODIUM ومريڤل.',
      description:
        'كي يخرج vélo متاعك من يدين بطل تونس 10 مرات\u200F، كل ضغطة على pédale تولّي خفيفة\u200F، سريعة\u200F، وبلاش حتى حس ولّا friction في الطريق.',
      cta: 'خوذ موعد عالواتساب توّا',
    },
    trophyTransition: {
      number: '04',
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
      process: 'The Process',
      champion: 'The Champion',
      reels: 'Workshop Builds',
      bookCta: 'Book on WhatsApp',
      assetStudio: 'AI Asset Studio',
    },
    stage1: {
      number: '01',
      kicker: 'CHASSIS DIAGNOSTICS ON BLUE PARK TOOL STAND',
      backdropWord: 'FRAME',
      title: 'PRECISION STARTS AT THE CARBON FRAME.',
      description:
        'Every bicycle — Aero Road, XCO Mountain, Gravel, or E-Bike — is mounted on our blue Park Tool stand for sub-millimeter geometric and bearing inspection.',
      cta: 'Follow the drivetrain flow',
      rightCalloutTitle: 'Geometric & Bearing Inspection',
      rightCalloutBody:
        'Laser derailleur hanger alignment, carbon layup seat inspection, and full pre-teardown telemetry.',
      handoffLabel: 'GOLD CHAIN DESCENDS INTO THE DRIVETRAIN ↓',
    },
    stage2: {
      number: '02',
      kicker: 'ULTRASONIC DRIVETRAIN & E-BIKE MOTOR CALIBRATION',
      backdropWord: 'MECHANICS',
      title: 'THE ALCHEMY OF TORQUE & GEARING.',
      description:
        'The chain locks onto the ultrasonically cleaned cassette. Bosch/Shimano e-bike motor rebuilds, ceramic bearings, and certified torque wrench calibration.',
      cta: 'See the Podium Finish',
      rightCalloutTitle: 'Torque Calibration & Ultrasonic Bath',
      rightCalloutBody:
        'Zero guesswork: every titanium bolt and cassette lockring is torqued to exact factory specification.',
      handoffLabel: 'FINAL ASSEMBLY INTO THE RACE SUPERBIKE ↓',
    },
    stage3: {
      number: '03',
      kicker: 'RACE FINISH · #VELO_REGLO_BIEN_REGLO',
      backdropWord: 'PODIUM',
      title: 'PODIUM READY. BIEN RÉGLO.',
      description:
        'When your machine is tuned by a 10× Tunisian National Champion, every watt you push translates into silent, frictionless speed.',
      cta: 'Book Directly on WhatsApp',
    },
    trophyTransition: {
      number: '04',
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
  activeStage: 1 | 2 | 3 | 4;
  stageLocalProgress: number;
  chainDropOffsetPx: number;
  cassetteRotationDeg: number;
  superbikeScale: number;
  trophyMorphProgress: number;
}

/**
 * Pure helper that maps overall scroll progress [0..1] across the 4-stage scrollytelling container
 * (01 Cadre -> 02 Mécanique -> 03 Podium Bike -> 04 10 Gold Medals & 3 Gold Cups Champion Handoff)
 */
export function computeScrollyMetrics(rawProgress: number): ScrollyMetrics {
  const clampedProgress = Math.max(
    0,
    Math.min(1, Number.isFinite(rawProgress) ? rawProgress : 0)
  );

  let activeStage: 1 | 2 | 3 | 4 = 1;
  let stageLocalProgress = 0;

  if (clampedProgress < 0.28) {
    activeStage = 1;
    stageLocalProgress = clampedProgress / 0.28;
  } else if (clampedProgress < 0.56) {
    activeStage = 2;
    stageLocalProgress = (clampedProgress - 0.28) / 0.28;
  } else if (clampedProgress < 0.80) {
    activeStage = 3;
    stageLocalProgress = (clampedProgress - 0.56) / 0.24;
  } else {
    activeStage = 4;
    stageLocalProgress = (clampedProgress - 0.80) / 0.20;
  }

  const chainDropOffsetPx = Math.round(clampedProgress * 420);
  const cassetteRotationDeg = Math.round(clampedProgress * 720);
  const superbikeScale = Number(
    (
      0.92 +
      Math.min(1, Math.max(0, (clampedProgress - 0.5) / 0.3)) * 0.08
    ).toFixed(3)
  );

  const trophyMorphProgress = Number(
    Math.max(0, Math.min(1, (clampedProgress - 0.75) / 0.22)).toFixed(3)
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
