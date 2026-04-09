export interface CareerPath {
  title: string;
  sector: string;
  salary: string;
}

export interface DepartmentDetail {
  id: string;
  tagline: string;
  fullDescription: string;
  keyCourses: string[];
  skills: string[];
  careers: CareerPath[];
  companies: string[];
  employmentRate: string;
  avgSalary: string;
}

export const departmentDetails: Record<string, DepartmentDetail> = {
  "materials-mechanical": {
    id: "materials-mechanical",
    tagline: "Design, build and innovate the physical world",
    fullDescription:
      "Materials & Mechanical Engineering is at the heart of industrial production. You will master the behavior of materials under stress, design complex mechanical systems, and use cutting-edge simulation tools to optimize performance. From aerospace components to automotive parts, this department trains engineers capable of turning raw ideas into reliable products.",
    keyCourses: [
      "Résistance des matériaux",
      "Mécanique des fluides",
      "Science des matériaux",
      "Fabrication mécanique & usinage",
      "CAO / DAO (SolidWorks, CATIA)",
      "Calcul par éléments finis (FEA)",
      "Thermodynamique appliquée",
      "Contrôle & métrologie",
      "Procédés de mise en forme",
    ],
    skills: [
      "FEA simulation (ANSYS, Abaqus)",
      "CAD/CAM design",
      "Material testing & characterization",
      "Process planning",
      "Quality control & NDT",
      "Technical documentation",
    ],
    careers: [
      { title: "Ingénieur de Production", sector: "Industrie automobile", salary: "12 000 – 18 000 MAD" },
      { title: "Ingénieur R&D", sector: "Aéronautique / Défense", salary: "14 000 – 22 000 MAD" },
      { title: "Responsable Qualité", sector: "Industrie manufacturière", salary: "13 000 – 20 000 MAD" },
      { title: "Ingénieur Méthodes", sector: "Automobile / Mécanique", salary: "11 000 – 17 000 MAD" },
      { title: "Chef de Projet Industriel", sector: "Tous secteurs", salary: "15 000 – 25 000 MAD" },
    ],
    companies: ["Renault Maroc", "Stellantis", "OCP Group", "Safran", "Boeing Maroc", "Yazaki", "Lear Corporation"],
    employmentRate: "97%",
    avgSalary: "14 000 MAD",
  },

  "civil": {
    id: "civil",
    tagline: "Build the infrastructure of tomorrow",
    fullDescription:
      "Civil Engineering shapes the physical environment we live in. You will learn to design safe structures, manage large-scale construction projects, and tackle environmental challenges. From skyscrapers and bridges to water networks and urban planning, Civil Engineering graduates are the architects of modern societies.",
    keyCourses: [
      "Mécanique des sols",
      "Béton armé & précontraint",
      "Structures métalliques",
      "Hydraulique & assainissement",
      "Topographie & SIG",
      "Gestion de projet & chantier",
      "Routes & infrastructures",
      "Géotechnique",
      "BIM (Revit, AutoCAD)",
    ],
    skills: [
      "Structural analysis & design",
      "BIM modeling",
      "Site management",
      "Geotechnical assessment",
      "Hydraulic design",
      "Cost & schedule estimation",
    ],
    careers: [
      { title: "Ingénieur Structures", sector: "BTP / Bureaux d'études", salary: "11 000 – 17 000 MAD" },
      { title: "Chef de Chantier", sector: "Construction", salary: "12 000 – 20 000 MAD" },
      { title: "Ingénieur Infrastructures", sector: "Travaux publics", salary: "12 000 – 18 000 MAD" },
      { title: "Consultant BTP", sector: "Conseil & maîtrise d'œuvre", salary: "15 000 – 28 000 MAD" },
      { title: "Urbaniste / Planificateur", sector: "Collectivités / État", salary: "10 000 – 16 000 MAD" },
    ],
    companies: ["LafargeHolcim Maroc", "ONCF", "ADM", "Vinci Construction", "Bouygues", "CID", "LYDEC"],
    employmentRate: "95%",
    avgSalary: "13 500 MAD",
  },

  "industrial": {
    id: "industrial",
    tagline: "Optimize systems, maximize performance",
    fullDescription:
      "Industrial Engineering sits at the crossroads of management and technology. You will learn to analyze complex production systems, reduce costs, eliminate waste, and synchronize entire supply chains. Industrial engineers are the orchestrators who ensure factories and logistics networks run at peak efficiency.",
    keyCourses: [
      "Recherche opérationnelle",
      "Supply chain management",
      "ERP / SAP",
      "Statistiques & fiabilité industrielle",
      "Planification & ordonnancement",
      "Ergonomie du travail",
      "Gestion des stocks",
      "Simulation de systèmes",
      "Management de projet",
    ],
    skills: [
      "Production planning & scheduling",
      "Supply chain optimization",
      "Data analysis & KPIs",
      "ERP systems (SAP, Oracle)",
      "Inventory management",
      "Process mapping",
    ],
    careers: [
      { title: "Responsable Production", sector: "Industrie", salary: "13 000 – 20 000 MAD" },
      { title: "Supply Chain Manager", sector: "Logistique / Distribution", salary: "14 000 – 22 000 MAD" },
      { title: "Ingénieur Méthodes", sector: "Automobile / Aéronautique", salary: "11 000 – 17 000 MAD" },
      { title: "Analyste Opérationnel", sector: "Conseil", salary: "12 000 – 20 000 MAD" },
      { title: "Directeur d'Usine", sector: "Industrie manufacturière", salary: "25 000 – 45 000 MAD" },
    ],
    companies: ["Renault Maroc", "Boeing", "OCP Group", "Sumitomo", "Delphi", "Lear", "Maroc Telecom"],
    employmentRate: "96%",
    avgSalary: "14 500 MAD",
  },

  "lean": {
    id: "lean",
    tagline: "Eliminate waste, drive excellence",
    fullDescription:
      "Lean & Operational Excellence specialists are the change agents of modern industry. Armed with Six Sigma, Lean Manufacturing, and continuous improvement methodologies, they transform organizations from within — cutting costs, boosting quality, and building a culture of efficiency that creates lasting competitive advantage.",
    keyCourses: [
      "Lean Manufacturing & VSM",
      "Six Sigma (Green & Black Belt)",
      "Kaizen & Chantiers d'amélioration",
      "Management de la qualité (ISO)",
      "Outils qualité (AMDEC, 8D)",
      "Gestion du changement",
      "Tableaux de bord & KPIs",
      "Standardisation des process",
      "Coaching & leadership",
    ],
    skills: [
      "Value Stream Mapping",
      "Six Sigma DMAIC",
      "Root cause analysis (5 Whys, Ishikawa)",
      "KPI dashboards",
      "Change management",
      "Project leadership",
    ],
    careers: [
      { title: "Responsable Amélioration Continue", sector: "Industrie", salary: "14 000 – 22 000 MAD" },
      { title: "Consultant Lean Six Sigma", sector: "Conseil", salary: "16 000 – 30 000 MAD" },
      { title: "Directeur Qualité", sector: "Tous secteurs", salary: "20 000 – 38 000 MAD" },
      { title: "Ingénieur Process Excellence", sector: "Automobile / Pharma", salary: "13 000 – 20 000 MAD" },
      { title: "Directeur Opérations", sector: "Manufacturing", salary: "28 000 – 50 000 MAD" },
    ],
    companies: ["McKinsey", "Capgemini", "Renault", "OCP Group", "Danone Maroc", "Procter & Gamble", "Unilever"],
    employmentRate: "98%",
    avgSalary: "16 000 MAD",
  },

  "iot-industry40": {
    id: "iot-industry40",
    tagline: "Connect the physical and digital worlds",
    fullDescription:
      "IoT & Industry 4.0 engineers are building the smart factories and connected infrastructure of the future. You will program industrial controllers, design sensor networks, integrate cloud platforms, and deploy real-time monitoring systems. This department bridges electrical engineering, computer science, and industrial automation.",
    keyCourses: [
      "Systèmes embarqués (Arduino, STM32)",
      "Programmation PLC (Siemens, Schneider)",
      "SCADA & supervision industrielle",
      "Protocoles IoT (MQTT, OPC-UA)",
      "Traitement du signal (MATLAB)",
      "Réseaux industriels (Profibus, Modbus)",
      "Électronique analogique & numérique",
      "Cloud & Big Data industriel",
      "Cybersécurité industrielle",
    ],
    skills: [
      "PLC programming (Ladder, ST)",
      "IoT system design",
      "SCADA configuration",
      "Embedded C/C++",
      "Industrial networking",
      "Data visualization dashboards",
    ],
    careers: [
      { title: "Ingénieur Automaticien", sector: "Industrie / Énergie", salary: "12 000 – 19 000 MAD" },
      { title: "Développeur IoT", sector: "Tech / Industrie", salary: "13 000 – 22 000 MAD" },
      { title: "Ingénieur SCADA", sector: "Énergie / Eau / Process", salary: "13 000 – 21 000 MAD" },
      { title: "Consultant Industry 4.0", sector: "Conseil / Intégrateurs", salary: "15 000 – 28 000 MAD" },
      { title: "Ingénieur Systèmes Embarqués", sector: "Automobile / Défense", salary: "12 000 – 20 000 MAD" },
    ],
    companies: ["Schneider Electric", "Siemens Maroc", "ABB", "Honeywell", "Rockwell Automation", "OCP Digital", "Safran"],
    employmentRate: "97%",
    avgSalary: "15 000 MAD",
  },

  "energy": {
    id: "energy",
    tagline: "Power the future with clean energy",
    fullDescription:
      "Energy Engineering is one of the most strategic disciplines in Morocco's green transition. You will master power systems, renewable energy technologies, energy auditing, and sustainable management. With Morocco's ambitious targets for renewable energy, graduates in this field are in extremely high demand.",
    keyCourses: [
      "Réseaux électriques & Smart Grid",
      "Énergies renouvelables (PV, éolien)",
      "Audit & efficacité énergétique",
      "Machines électriques (moteurs, générateurs)",
      "Électronique de puissance",
      "Stockage d'énergie",
      "Simulation de systèmes énergétiques",
      "Réglementation & normes électriques",
      "Gestion de projets ENR",
    ],
    skills: [
      "Power system design & analysis",
      "Solar & wind energy sizing",
      "Energy audit & reporting",
      "Power electronics (inverters, converters)",
      "MATLAB/Simulink simulation",
      "Energy management systems",
    ],
    careers: [
      { title: "Ingénieur Énergie", sector: "ONEE / Utilities", salary: "12 000 – 19 000 MAD" },
      { title: "Spécialiste Énergies Renouvelables", sector: "ENR / Développement", salary: "13 000 – 22 000 MAD" },
      { title: "Auditeur Énergétique", sector: "Conseil / Industrie", salary: "12 000 – 20 000 MAD" },
      { title: "Manager Développement Durable", sector: "Grandes entreprises", salary: "15 000 – 25 000 MAD" },
      { title: "Ingénieur Systèmes Électriques", sector: "BTP / Industrie", salary: "11 000 – 18 000 MAD" },
    ],
    companies: ["ONEE", "Nareva Holding", "Taqa Morocco", "Masen", "EDF Renewables", "Engie", "Total Energies Maroc"],
    employmentRate: "96%",
    avgSalary: "14 000 MAD",
  },

  "it": {
    id: "it",
    tagline: "Engineer the digital infrastructure of tomorrow",
    fullDescription:
      "IT Engineering at ENSAM Meknes produces well-rounded engineers who can design, build, and secure complex information systems. You will learn software development, network engineering, databases, and cybersecurity — all grounded in solid computer science fundamentals. Morocco's booming tech sector makes IT engineers among the most sought-after graduates.",
    keyCourses: [
      "Algorithmique & structures de données",
      "Réseaux & protocoles (TCP/IP, SDN)",
      "Bases de données (SQL, NoSQL)",
      "Développement logiciel (Agile, DevOps)",
      "Architecture logicielle & microservices",
      "Cybersécurité & cryptographie",
      "Cloud Computing (AWS, Azure)",
      "Systèmes d'exploitation & Linux",
      "Développement web fullstack",
    ],
    skills: [
      "Full-stack development",
      "Network design & administration",
      "Database modeling & optimization",
      "DevOps & CI/CD pipelines",
      "Cybersecurity fundamentals",
      "Cloud infrastructure",
    ],
    careers: [
      { title: "Ingénieur Développement Logiciel", sector: "ESN / Startups", salary: "11 000 – 20 000 MAD" },
      { title: "Architecte Systèmes d'Information", sector: "Grandes entreprises", salary: "18 000 – 32 000 MAD" },
      { title: "Ingénieur Cybersécurité", sector: "Banque / Télécoms / État", salary: "15 000 – 28 000 MAD" },
      { title: "DevOps / Cloud Engineer", sector: "Tech / ESN", salary: "14 000 – 25 000 MAD" },
      { title: "Ingénieur Réseaux", sector: "Télécoms / Entreprises", salary: "12 000 – 20 000 MAD" },
    ],
    companies: ["OCP Digital", "HPS", "Capgemini", "IBM Maroc", "Atos", "CGI", "Maroc Telecom", "IndigoSoft"],
    employmentRate: "98%",
    avgSalary: "15 500 MAD",
  },

  "ai": {
    id: "ai",
    tagline: "Shape the intelligence driving the future",
    fullDescription:
      "Artificial Intelligence Engineering is the fastest-growing discipline in the world. At ENSAM Meknes, you will build a rigorous foundation in mathematics and statistics, then apply it to machine learning, deep learning, computer vision, and NLP. AI engineers are transforming every sector — healthcare, finance, agriculture, manufacturing, and beyond.",
    keyCourses: [
      "Mathématiques avancées (algèbre linéaire, probabilités)",
      "Machine Learning (scikit-learn)",
      "Deep Learning (PyTorch, TensorFlow)",
      "Traitement du langage naturel (NLP)",
      "Vision par ordinateur (OpenCV)",
      "Data Engineering & pipelines",
      "Big Data (Spark, Hadoop)",
      "MLOps & déploiement de modèles",
      "IA éthique & réglementation",
    ],
    skills: [
      "Python & machine learning frameworks",
      "Model training, evaluation & tuning",
      "Data preprocessing & feature engineering",
      "Deep learning architectures",
      "Computer vision & NLP",
      "MLOps & model deployment",
    ],
    careers: [
      { title: "Machine Learning Engineer", sector: "Tech / FinTech / Industrie", salary: "16 000 – 30 000 MAD" },
      { title: "Data Scientist", sector: "Tous secteurs", salary: "15 000 – 28 000 MAD" },
      { title: "Ingénieur NLP", sector: "Tech / Médias / e-Commerce", salary: "16 000 – 32 000 MAD" },
      { title: "Ingénieur Computer Vision", sector: "Automobile / Santé / Industrie", salary: "16 000 – 30 000 MAD" },
      { title: "Consultant IA / Data", sector: "Conseil / ESN", salary: "18 000 – 35 000 MAD" },
    ],
    companies: ["OCP Digital", "Capgemini", "Google", "Microsoft", "IBM", "AI startups marocaines", "BERD / recherche"],
    employmentRate: "99%",
    avgSalary: "18 000 MAD",
  },
};
