import { PrismaClient, ProjectStatus, UserRole } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  if (!process.env.ADMIN_PASSWORD_HASH) {
    throw new Error("ADMIN_PASSWORD_HASH este obligatoriu pentru seed. Generează un hash bcrypt și setează variabila în env.");
  }

  const passwordHash = process.env.ADMIN_PASSWORD_HASH;
  const serviceNames = [
    "Echipe dedicate",
    "Dezvoltare aplicații web",
    "Modernizare software",
    "Soluții cloud",
    "QA și testare",
    "Consultanță digitală",
    "Aplicații mobile",
    "Integrare sisteme",
  ];
  const packageNames = ["Start tehnic", "Echipă dedicată", "Livrare completă"];
  const leadEmails = ["irina.popescu@nordretail.ro", "mihai.rusu@medicaplus.ro"];

  await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL ?? "admin@amdaris.ro" },
    update: {
      passwordHash,
      name: "Administrator AMDARIS",
      role: UserRole.ADMIN,
    },
    create: {
      email: process.env.ADMIN_EMAIL ?? "admin@amdaris.ro",
      passwordHash,
      name: "Administrator AMDARIS",
      role: UserRole.ADMIN,
    },
  });

  await prisma.service.deleteMany({ where: { name: { in: serviceNames } } });
  await prisma.service.createMany({
    data: [
      { name: "Echipe dedicate", description: "Ingineri integrați în ritmul companiei tale, cu procese clare de livrare și raportare.", icon: "Users", features: ["Recrutare tehnică atentă", "Management de livrare", "Scalare rapidă"], order: 1 },
      { name: "Dezvoltare aplicații web", description: "Platforme moderne pentru operațiuni, vânzări și experiențe digitale stabile.", icon: "Globe2", features: ["Next.js și React", "API-uri securizate", "Performanță măsurabilă"], order: 2 },
      { name: "Modernizare software", description: "Refactorizare, migrare și înlocuire treptată a sistemelor vechi fără întreruperi majore.", icon: "RefreshCcw", features: ["Audit arhitectural", "Migrare cloud", "Reducerea datoriei tehnice"], order: 3 },
      { name: "Soluții cloud", description: "Infrastructură pregătită pentru creștere, monitorizare și lansări previzibile.", icon: "Cloud", features: ["AWS, Azure, GCP", "CI/CD", "Observabilitate"], order: 4 },
      { name: "QA și testare", description: "Strategii de calitate pentru aplicații critice, de la testare manuală la automatizare.", icon: "ShieldCheck", features: ["Teste end-to-end", "Regresie automată", "Planuri de calitate"], order: 5 },
      { name: "Consultanță digitală", description: "Clarificăm produsul, arhitectura și pașii tehnici înainte de investiții mari.", icon: "Lightbulb", features: ["Analiză tehnică inițială", "Plan de produs", "Estimări realiste"], order: 6 },
      { name: "Aplicații mobile", description: "Experiențe mobile pentru echipe, clienți și parteneri, conectate la sisteme sigure.", icon: "Smartphone", features: ["React Native", "Design accesibil", "Publicare asistată"], order: 7 },
      { name: "Integrare sisteme", description: "Conectăm CRM, ERP, plăți, analitice și servicii interne prin API-uri robuste.", icon: "Network", features: ["Integrări B2B", "Automatizări", "Sincronizare date"], order: 8 },
    ],
  });

  await prisma.servicePackage.deleteMany({ where: { name: { in: packageNames } } });
  await prisma.servicePackage.createMany({
    data: [
      { name: "Start tehnic", description: "Pentru companii care vor validare rapidă și un plan clar de execuție.", price: "de la 3.500 EUR", duration: "2-4 săptămâni", deliverables: ["Audit tehnic", "Plan de arhitectură", "Estimare de buget"], targetIndustries: ["SaaS", "Comerț online", "Servicii profesionale"], cta: "Programează analiza" },
      { name: "Echipă dedicată", description: "Pentru dezvoltare continuă cu specialiști integrați în procesele tale.", price: "ofertă lunară personalizată", duration: "minimum 3 luni", deliverables: ["Ingineri dedicați", "Coordonator tehnic", "Raportare săptămânală"], targetIndustries: ["Fintech", "Sănătate", "Producție"], cta: "Cere o echipă" },
      { name: "Livrare completă", description: "Pentru produse sau module livrate cap-coadă pe un obiectiv definit.", price: "buget fix după analiză", duration: "8-16 săptămâni", deliverables: ["Design funcțional", "Dezvoltare", "QA și lansare"], targetIndustries: ["Retail", "Logistică", "Educație"], cta: "Discută proiectul" },
    ],
  });

  const projects = [
    {
      title: "Platformă B2B pentru achiziții industriale",
      slug: "platforma-b2b-achizitii-industriale",
      description: "Portal de autoservire pentru cereri de ofertă, fluxuri de aprobare și raportare comercială.",
      industry: "Producție",
      clientChallenge: "Clientul gestiona cererile prin email și fișiere separate, iar aprobările întârziau comenzile importante.",
      solution: "Am construit o platformă web cu roluri, catalog personalizat, aprobări pe praguri valorice și integrare ERP.",
      results: "Timpul mediu de procesare a scăzut cu 42%, iar echipa comercială are vizibilitate zilnică asupra cererilor active.",
      technologies: ["Next.js", "Node.js", "PostgreSQL", "Azure"],
      imageUrl: "/brand/project-industrial.svg",
      category: "Platforme web",
      status: ProjectStatus.PUBLISHED,
    },
    {
      title: "Aplicație pentru managementul programărilor medicale",
      slug: "management-programari-medicale",
      description: "Sistem digital pentru clinici cu programări, notificări și fișe operaționale pentru personal.",
      industry: "Sănătate",
      clientChallenge: "Recepția folosea instrumente diferite pentru programări, confirmări și rapoarte, ceea ce producea erori.",
      solution: "Am livrat o aplicație securizată cu calendar unificat, notificări automate și exporturi operaționale.",
      results: "Rata de neprezentare a scăzut cu 28%, iar timpul de coordonare pentru recepție s-a redus semnificativ.",
      technologies: ["React", "Express", "PostgreSQL", "Docker"],
      imageUrl: "/brand/project-health.svg",
      category: "Sisteme operaționale",
      status: ProjectStatus.PUBLISHED,
    },
    {
      title: "Modernizare portal e-commerce regional",
      slug: "modernizare-portal-ecommerce-regional",
      description: "Migrare graduală către o arhitectură modernă pentru catalog, checkout și promoții.",
      industry: "Comerț online",
      clientChallenge: "Platforma existentă era greu de întreținut, iar lansarea campaniilor necesita intervenții manuale.",
      solution: "Am separat modulele critice, am optimizat performanța paginilor și am introdus fluxuri automate de lansare.",
      results: "Paginile principale au devenit cu 55% mai rapide, iar echipa lansează campanii fără blocaje tehnice.",
      technologies: ["Next.js", "Prisma", "Stripe", "AWS"],
      imageUrl: "/brand/project-commerce.svg",
      category: "Modernizare",
      status: ProjectStatus.PUBLISHED,
    },
    {
      title: "Tablou financiar pentru analiză de portofoliu",
      slug: "dashboard-financiar-analiza-portofoliu",
      description: "Interfață analitică pentru indicatori de risc, rapoarte și alerte de portofoliu.",
      industry: "Finanțe",
      clientChallenge: "Analiștii pregăteau rapoarte manual, cu date din mai multe surse și verificări repetate.",
      solution: "Am integrat sursele de date, am definit indicatorii critici și am creat vizualizări pentru decizii rapide.",
      results: "Rapoartele săptămânale sunt generate în aceeași zi, iar abaterile importante sunt semnalate automat.",
      technologies: ["TypeScript", "Node.js", "PostgreSQL", "Power BI"],
      imageUrl: "/brand/project-finance.svg",
      category: "Date și raportare",
      status: ProjectStatus.PUBLISHED,
    },
  ];

  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: project,
      create: {
        ...project,
        images: {
          create: [
            { imageUrl: project.imageUrl, altText: `Vizual pentru ${project.title}`, order: 1 },
          ],
        },
      },
    });
  }

  await prisma.contactLead.deleteMany({ where: { email: { in: leadEmails } } });
  await prisma.contactLead.createMany({
    data: [
      { name: "Irina Popescu", company: "Nord Retail", email: "irina.popescu@nordretail.ro", phone: "+40 721 000 100", serviceNeeded: "Modernizare software", message: "Avem nevoie de o evaluare pentru platforma internă de comenzi și raportare.", budgetRange: "25.000-50.000 EUR", timeline: "1-3 luni" },
      { name: "Mihai Rusu", company: "Medica Plus", email: "mihai.rusu@medicaplus.ro", phone: "+40 722 000 200", serviceNeeded: "Echipe dedicate", message: "Căutăm doi dezvoltatori cu experiență pe front-end și back-end pentru extinderea produsului nostru operațional.", budgetRange: "peste 50.000 EUR", timeline: "sub 1 lună" },
    ],
  });
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  });
