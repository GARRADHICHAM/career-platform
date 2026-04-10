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
      "Mechanics of Materials",
      "Fluid Mechanics",
      "Materials Science",
      "Mechanical Manufacturing & Machining",
      "CAD/CAM (SolidWorks, CATIA)",
      "Finite Element Analysis (FEA)",
      "Applied Thermodynamics",
      "Quality Control & Metrology",
      "Manufacturing Processes",
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
      { title: "Production Engineer", sector: "Automotive Industry", salary: "12 000 – 18 000 MAD" },
      { title: "R&D Engineer", sector: "Aerospace / Defense", salary: "14 000 – 22 000 MAD" },
      { title: "Quality Manager", sector: "Manufacturing Industry", salary: "13 000 – 20 000 MAD" },
      { title: "Methods Engineer", sector: "Automotive / Mechanical", salary: "11 000 – 17 000 MAD" },
      { title: "Industrial Project Manager", sector: "All sectors", salary: "15 000 – 25 000 MAD" },
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
      "Soil Mechanics",
      "Reinforced & Prestressed Concrete",
      "Steel Structures",
      "Hydraulics & Drainage",
      "Surveying & GIS",
      "Project & Site Management",
      "Roads & Infrastructure",
      "Geotechnics",
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
      { title: "Structural Engineer", sector: "Construction / Design Offices", salary: "11 000 – 17 000 MAD" },
      { title: "Site Manager", sector: "Construction", salary: "12 000 – 20 000 MAD" },
      { title: "Infrastructure Engineer", sector: "Public Works", salary: "12 000 – 18 000 MAD" },
      { title: "Construction Consultant", sector: "Consulting & Project Management", salary: "15 000 – 28 000 MAD" },
      { title: "Urban Planner", sector: "Local Government / Public Sector", salary: "10 000 – 16 000 MAD" },
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
      "Operations Research",
      "Supply Chain Management",
      "ERP / SAP",
      "Statistics & Industrial Reliability",
      "Production Planning & Scheduling",
      "Work Ergonomics",
      "Inventory Management",
      "Systems Simulation",
      "Project Management",
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
      { title: "Production Manager", sector: "Industry", salary: "13 000 – 20 000 MAD" },
      { title: "Supply Chain Manager", sector: "Logistics / Distribution", salary: "14 000 – 22 000 MAD" },
      { title: "Methods Engineer", sector: "Automotive / Aerospace", salary: "11 000 – 17 000 MAD" },
      { title: "Operations Analyst", sector: "Consulting", salary: "12 000 – 20 000 MAD" },
      { title: "Plant Director", sector: "Manufacturing", salary: "25 000 – 45 000 MAD" },
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
      "Kaizen & Improvement Workshops",
      "Quality Management (ISO)",
      "Quality Tools (FMEA, 8D)",
      "Change Management",
      "Dashboards & KPIs",
      "Process Standardization",
      "Coaching & Leadership",
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
      { title: "Continuous Improvement Manager", sector: "Industry", salary: "14 000 – 22 000 MAD" },
      { title: "Lean Six Sigma Consultant", sector: "Consulting", salary: "16 000 – 30 000 MAD" },
      { title: "Quality Director", sector: "All sectors", salary: "20 000 – 38 000 MAD" },
      { title: "Process Excellence Engineer", sector: "Automotive / Pharma", salary: "13 000 – 20 000 MAD" },
      { title: "Operations Director", sector: "Manufacturing", salary: "28 000 – 50 000 MAD" },
    ],
    companies: ["McKinsey", "Capgemini", "Renault", "OCP Group", "Danone Maroc", "Procter & Gamble", "Unilever"],
    employmentRate: "98%",
    avgSalary: "16 000 MAD",
  },

  "iot-industry40": {
    id: "iot-industry40",
    tagline: "Connect the physical and digital worlds",
    fullDescription:
      "Electromechanical: Industrial Digitalisation engineers are building the smart factories and connected infrastructure of the future. You will program industrial controllers, design sensor networks, integrate cloud platforms, and deploy real-time monitoring systems. This department bridges electrical engineering, computer science, and industrial automation.",
    keyCourses: [
      "Embedded Systems (Arduino, STM32)",
      "PLC Programming (Siemens, Schneider)",
      "SCADA & Industrial Supervision",
      "IoT Protocols (MQTT, OPC-UA)",
      "Signal Processing (MATLAB)",
      "Industrial Networks (Profibus, Modbus)",
      "Analog & Digital Electronics",
      "Industrial Cloud & Big Data",
      "Industrial Cybersecurity",
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
      { title: "Automation Engineer", sector: "Industry / Energy", salary: "12 000 – 19 000 MAD" },
      { title: "IoT Developer", sector: "Tech / Industry", salary: "13 000 – 22 000 MAD" },
      { title: "SCADA Engineer", sector: "Energy / Water / Process", salary: "13 000 – 21 000 MAD" },
      { title: "Industry 4.0 Consultant", sector: "Consulting / Integrators", salary: "15 000 – 28 000 MAD" },
      { title: "Embedded Systems Engineer", sector: "Automotive / Defense", salary: "12 000 – 20 000 MAD" },
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
      "Electrical Networks & Smart Grid",
      "Renewable Energy (PV, Wind)",
      "Energy Audit & Efficiency",
      "Electrical Machines (Motors, Generators)",
      "Power Electronics",
      "Energy Storage",
      "Energy Systems Simulation",
      "Electrical Standards & Regulations",
      "Renewable Energy Project Management",
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
      { title: "Energy Engineer", sector: "ONEE / Utilities", salary: "12 000 – 19 000 MAD" },
      { title: "Renewable Energy Specialist", sector: "Renewables / Development", salary: "13 000 – 22 000 MAD" },
      { title: "Energy Auditor", sector: "Consulting / Industry", salary: "12 000 – 20 000 MAD" },
      { title: "Sustainability Manager", sector: "Large Corporations", salary: "15 000 – 25 000 MAD" },
      { title: "Electrical Systems Engineer", sector: "Construction / Industry", salary: "11 000 – 18 000 MAD" },
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
      "Algorithms & Data Structures",
      "Networks & Protocols (TCP/IP, SDN)",
      "Databases (SQL, NoSQL)",
      "Software Development (Agile, DevOps)",
      "Software Architecture & Microservices",
      "Cybersecurity & Cryptography",
      "Cloud Computing (AWS, Azure)",
      "Operating Systems & Linux",
      "Fullstack Web Development",
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
      { title: "Software Development Engineer", sector: "IT Services / Startups", salary: "11 000 – 20 000 MAD" },
      { title: "Information Systems Architect", sector: "Large Corporations", salary: "18 000 – 32 000 MAD" },
      { title: "Cybersecurity Engineer", sector: "Banking / Telecoms / Government", salary: "15 000 – 28 000 MAD" },
      { title: "DevOps / Cloud Engineer", sector: "Tech / IT Services", salary: "14 000 – 25 000 MAD" },
      { title: "Network Engineer", sector: "Telecoms / Enterprises", salary: "12 000 – 20 000 MAD" },
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
      "Advanced Mathematics (Linear Algebra, Probability)",
      "Machine Learning (scikit-learn)",
      "Deep Learning (PyTorch, TensorFlow)",
      "Natural Language Processing (NLP)",
      "Computer Vision (OpenCV)",
      "Data Engineering & Pipelines",
      "Big Data (Spark, Hadoop)",
      "MLOps & Model Deployment",
      "AI Ethics & Regulation",
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
      { title: "Machine Learning Engineer", sector: "Tech / FinTech / Industry", salary: "16 000 – 30 000 MAD" },
      { title: "Data Scientist", sector: "All sectors", salary: "15 000 – 28 000 MAD" },
      { title: "NLP Engineer", sector: "Tech / Media / e-Commerce", salary: "16 000 – 32 000 MAD" },
      { title: "Computer Vision Engineer", sector: "Automotive / Healthcare / Industry", salary: "16 000 – 30 000 MAD" },
      { title: "AI / Data Consultant", sector: "Consulting / IT Services", salary: "18 000 – 35 000 MAD" },
    ],
    companies: ["OCP Digital", "Capgemini", "Google", "Microsoft", "IBM", "Moroccan AI Startups", "BERD / Research"],
    employmentRate: "99%",
    avgSalary: "18 000 MAD",
  },

  "electro-maintenance": {
    id: "electro-maintenance",
    tagline: "Keep industry running at peak performance",
    fullDescription:
      "Electromechanical Engineering: Industrial Maintenance & Control trains engineers who are the backbone of industrial operations. You will diagnose complex machine failures, master hydraulic and pneumatic systems, program PLCs, and deploy SCADA monitoring solutions. Graduates ensure factories and production lines stay operational, safe, and efficient — making them indispensable in every industrial sector.",
    keyCourses: [
      "Industrial Machine Maintenance",
      "Hydraulic & Pneumatic Systems",
      "PLC Programming & Industrial Control",
      "Electrical & Mechanical Troubleshooting",
      "SCADA & Supervision Systems",
      "Sensors & Industrial Instrumentation",
      "Automated Production Lines",
      "Preventive & Predictive Maintenance",
      "Reliability & Failure Analysis",
    ],
    skills: [
      "Machine diagnostics & troubleshooting",
      "PLC programming (Siemens, Schneider)",
      "Hydraulic & pneumatic circuit design",
      "SCADA monitoring & configuration",
      "Preventive & predictive maintenance",
      "Industrial instrumentation",
    ],
    careers: [
      { title: "Industrial Maintenance Engineer", sector: "Automotive / Manufacturing", salary: "11 000 – 18 000 MAD" },
      { title: "Automation & Control Engineer", sector: "Industry / Energy", salary: "12 000 – 20 000 MAD" },
      { title: "Maintenance Manager", sector: "All Industrial Sectors", salary: "16 000 – 28 000 MAD" },
      { title: "Reliability Engineer", sector: "Aerospace / Oil & Gas", salary: "14 000 – 24 000 MAD" },
      { title: "Technical Support Engineer", sector: "Equipment Manufacturers", salary: "12 000 – 19 000 MAD" },
    ],
    companies: ["Renault Maroc", "Boeing", "OCP Group", "Schneider Electric", "Siemens Maroc", "Yazaki", "Somaca"],
    employmentRate: "96%",
    avgSalary: "14 000 MAD",
  },

  "mechanical-structures": {
    id: "mechanical-structures",
    tagline: "Engineer structures that stand the test of time",
    fullDescription:
      "Mechanical Engineering: Structures specializes in the analysis and design of mechanical systems and structural components. You will develop deep expertise in stress analysis, FEA simulation, material selection, and structural integrity verification. Graduates work in design offices, R&D departments, and engineering firms — designing everything from aerospace frames to industrial machinery.",
    keyCourses: [
      "Structural Mechanics & Stress Analysis",
      "Finite Element Analysis (FEA)",
      "Material Behavior & Failure",
      "CAD/CAM (SolidWorks, CATIA)",
      "Thermodynamics & Energy Systems",
      "Fatigue & Fracture Mechanics",
      "Design Verification & Reliability",
      "Manufacturing Processes",
      "Engineering Project Management",
    ],
    skills: [
      "Structural analysis & dimensioning",
      "FEA simulation (ANSYS, Abaqus)",
      "CAD design (SolidWorks, CATIA)",
      "Material selection & testing",
      "Fatigue & failure analysis",
      "Technical design documentation",
    ],
    careers: [
      { title: "Structural Design Engineer", sector: "Aerospace / Automotive", salary: "13 000 – 20 000 MAD" },
      { title: "R&D Engineer", sector: "Mechanical / Manufacturing", salary: "14 000 – 22 000 MAD" },
      { title: "Simulation Engineer (FEA/CAE)", sector: "Automotive / Defense", salary: "13 000 – 21 000 MAD" },
      { title: "Quality & Reliability Engineer", sector: "Industry / Aerospace", salary: "12 000 – 19 000 MAD" },
      { title: "Design Office Engineer", sector: "Engineering Firms", salary: "11 000 – 18 000 MAD" },
    ],
    companies: ["Safran", "Boeing Maroc", "Renault Maroc", "Stellantis", "OCP Group", "EADS", "Dassault Systems"],
    employmentRate: "96%",
    avgSalary: "15 000 MAD",
  },
};
