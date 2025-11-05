export type LawyerExperience = {
  role: string
  period: string
  summary: string
}

export type LawyerEducation = {
  title: string
  institution: string
  year?: string
}

export type LawyerPublication = {
  title: string
  detail?: string
  url?: string
}

export type LawyerProfile = {
  overview: string[]
  differentiators: string[]
  sectors: string[]
  signatureMatters: string[]
  experience: LawyerExperience[]
  education: LawyerEducation[]
  representativeClients?: string[]
  memberships?: string[]
  recognitions?: string[]
  feeModels?: string[]
  publications?: LawyerPublication[]
  proBono?: string[]
}

export type Lawyer = {
  id: string
  name: string
  headline: string
  location: string
  avatar: string
  cover: string
  specialties: string[]
  experienceYears: number
  barNumber: string
  languages: string[]
  availability: string
  email: string
  profile: LawyerProfile
}

export const lawyers: Lawyer[] = [
  {
    id: 'priya-menon',
    name: 'Adv. Priya Menon',
    headline: 'Corporate & Technology Counsel - Menon Chambers',
    location: 'Bengaluru, India',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=160&q=80',
    cover: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80',
    specialties: ['Corporate Governance', 'Technology Law', 'Data Protection'],
    experienceYears: 14,
    barNumber: 'KA/2032/2010',
    languages: ['English', 'Hindi', 'Malayalam'],
    availability: 'Accepting strategic mandates and CxO briefings',
    email: 'priya.menon@lexatlas.com',
    profile: {
      overview: [
        'Advises growth-stage technology and product companies on corporate governance, expansion and regulatory readiness across India, APAC and the US.',
        'Trusted board advisor for investor-backed founders seeking pragmatic counsel on cross-border data, AI and equity structuring.',
      ],
      differentiators: [
        'Designs executive-ready governance playbooks covering risk, compliance and investor reporting.',
        'Combines product counsel background with deep policy outreach for emerging tech.',
        'Deploys agile deal teams that plug into client operations within days.',
      ],
      sectors: ['SaaS & Product', 'Fintech', 'Digital Health', 'Marketplaces', 'Venture Capital'],
      signatureMatters: [
        'Advised a NASDAQ-listed SaaS company on Indian data localisation readiness and regulator outreach.',
        'Lead counsel on USD 320M Series C fundraise with multi-jurisdictional diligence and governance structuring.',
        'Defended promoter group in concurrent CCI, SEBI and ED investigations leading to favourable closure.',
        'Structured a US-India holding flip and ESOP liquidity program within 45 days.',
      ],
      experience: [
        {
          role: 'Managing Partner - Menon Chambers',
          period: '2019 - Present',
          summary:
            'Leads cross-border technology and corporate governance practice delivering board advisory and special projects.',
        },
        {
          role: 'Senior Associate - LexAtlas',
          period: '2014 - 2019',
          summary: 'Built privacy and venture capital playbooks for scaling startups and multinational clients across APAC.',
        },
      ],
      education: [
        { title: 'LL.M. Technology & Innovation Law', institution: 'University of Cambridge', year: '2013' },
        { title: 'B.A. LL.B (Hons.)', institution: 'National Law University, Delhi', year: '2010' },
      ],
      representativeClients: [
        'NASDAQ-listed SaaS platform expanding into India',
        'Global venture fund with $1B+ India exposure',
        'Founder-led healthtech marketplace scaling across APAC',
      ],
      memberships: ['International Bar Association - Technology Committee', 'Supreme Court Bar Association'],
      recognitions: [
        'Featured in Forbes India Legal Powerlist (Technology) 2023',
        'Ranked Lawyer for TMT - Asia Law Profiles 2024',
      ],
      feeModels: ['Outcome-linked retainers for scale-stage mandates', 'Project-based cross-border diligence pods'],
      publications: [
        {
          title: 'Navigating data localisation for cross-border SaaS',
          detail: 'Co-author, NASSCOM whitepaper (2024)',
        },
        {
          title: 'Board reporting cadences for hypergrowth',
          detail: 'Guest column, LexConnect Journal (2023)',
        },
      ],
      proBono: [
        'Mentors women-led legal-tech startups via Forge Accelerator',
        'Advises digital rights nonprofits on data policy consultations',
      ],
    },
  },
  {
    id: 'arjun-sengupta',
    name: 'Adv. Arjun Sengupta',
    headline: 'Dispute Resolution Partner - LexAtlas',
    location: 'Mumbai, India',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=160&q=80',
    cover: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80',
    specialties: ['Arbitration', 'Infrastructure', 'Energy'],
    experienceYears: 18,
    barNumber: 'MH/7892/2006',
    languages: ['English', 'Hindi', 'Marathi'],
    availability: 'Booking hearings for Q4 2025',
    email: 'arjun.sengupta@lexatlas.com',
    profile: {
      overview: [
        'Leads complex arbitration and high-stakes dispute resolution for infrastructure, energy and transport conglomerates.',
        'Regularly appears before High Courts and tribunals, blending courtroom strategy with early settlement frameworks.',
      ],
      differentiators: [
        'Dual-qualified mediator and panel arbitrator with LCIA and SIAC exposure.',
        'Builds evidence war rooms blending litigation tech with on-ground investigation teams.',
        'Known for fast interim relief strategies in multijurisdictional disputes.',
      ],
      sectors: ['Energy', 'Infrastructure', 'Transport & Shipping', 'Construction EPC', 'Sovereign Funds'],
      signatureMatters: [
        'Lead counsel on USD 420M LNG terminal arbitration seated in Singapore with Indian enforcement.',
        'Secured emergency relief for metro rail consortium in concurrent Supreme Court and tribunal proceedings.',
        'Negotiated cross-border settlement for EPC conglomerate spanning five jurisdictions.',
      ],
      experience: [
        {
          role: 'Dispute Resolution Partner - LexAtlas',
          period: '2018 - Present',
          summary: 'Heads arbitration and courts practice with focus on energy, infrastructure and shareholder disputes.',
        },
        {
          role: 'Senior Counsel - Eastern Chambers',
          period: '2011 - 2018',
          summary: 'Ran high-stakes commercial litigation teams before Bombay High Court and arbitral tribunals.',
        },
        {
          role: 'Associate - Supreme Court Practice',
          period: '2006 - 2011',
          summary: 'Assisted on constitutional, regulatory and enforcement matters before the Supreme Court of India.',
        },
      ],
      education: [
        { title: 'LL.M. International Arbitration', institution: 'Queen Mary University of London', year: '2006' },
        { title: 'B.A. LL.B (Hons.)', institution: 'NALSAR University of Law', year: '2004' },
      ],
      representativeClients: [
        'Sovereign-backed infrastructure funds',
        'Oil and gas majors operating in South Asia',
        'Listed EPC conglomerates',
      ],
      memberships: ['LCIA India Users Council', 'Mumbai Centre for International Arbitration (Panel Arbitrator)'],
      recognitions: [
        'Ranked Lawyer - Chambers Asia-Pacific 2024 (Dispute Resolution)',
        "Who's Who Legal Arbitration Future Leader 2023",
      ],
      feeModels: ['Success-linked fee models for enforcement mandates', 'Monthly retainers covering rostered arbitrations'],
      publications: [
        {
          title: 'Enforcing foreign awards in India post 2015 amendments',
          detail: 'Author, Arbitration Quarterly (2023)',
        },
        {
          title: 'SIAC India Summit panel on interim relief',
          detail: 'Speaker, 2024 edition',
        },
      ],
      proBono: [
        'Represents MSMEs in mediation via Vidhi Centre clinics',
        'Coaches arbitration moot teams across national law universities',
      ],
    },
  },
  {
    id: 'meera-joshi',
    name: 'Adv. Meera Joshi',
    headline: 'Employment & Labour Specialist - Accord Legal',
    location: 'New Delhi, India',
    avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=160&q=80',
    cover: 'https://images.unsplash.com/photo-1473862170185-4f1161c62f07?auto=format&fit=crop&w=1200&q=80',
    specialties: ['Employment Law', 'Workplace Investigations', 'Diversity & Inclusion'],
    experienceYears: 12,
    barNumber: 'DL/2211/2012',
    languages: ['English', 'Hindi'],
    availability: 'Consultations available within 48 hours',
    email: 'meera.joshi@accordlegal.in',
    profile: {
      overview: [
        'Advises multinational and startup clients on employment architecture, investigations and workplace culture transformation.',
        'Builds playbooks for fast-scaling teams focusing on compliance, inclusion and employee relations.',
      ],
      differentiators: [
        'Certified workplace investigator with trauma-informed methodology.',
        'Runs cross-functional response teams with HR, ethics and legal stakeholders.',
        'Delivers policy refreshes in under 30 days using modular templates.',
      ],
      sectors: ['Technology & Product', 'Retail & E-commerce', 'Manufacturing', 'Shared Services'],
      signatureMatters: [
        'Led 25-jurisdiction code of conduct refresh for global retailer employing 70,000 people.',
        'Guided unicorn board through whistle-blower investigation within 10 days while preserving privilege.',
        'Negotiated amicable exits for CXO suite across multiple countries ensuring compliance and reputation protection.',
      ],
      experience: [
        {
          role: 'Employment & Labour Specialist - Accord Legal',
          period: '2019 - Present',
          summary: 'Leads employment strategy, investigations and workplace governance mandates for global clients.',
        },
        {
          role: 'Principal Associate - PeopleFirst Law',
          period: '2014 - 2019',
          summary: 'Managed retained HR counsel desks and labour audits across technology and retail portfolios.',
        },
        {
          role: 'Associate - National Employment Counsel',
          period: '2012 - 2014',
          summary: 'Ran employment litigation and advisory for manufacturing and services companies.',
        },
      ],
      education: [
        { title: 'LL.M. Employment Law', institution: 'University of Melbourne', year: '2012' },
        { title: 'B.A. LL.B (Hons.)', institution: 'Symbiosis Law School', year: '2010' },
      ],
      representativeClients: [
        'NASDAQ-listed customer support platform',
        'Global design house operating India GCC',
        'Growth-stage D2C retail brands',
      ],
      memberships: ['Society for Human Resource Management (SHRM) India', 'Women in Law & Litigation Collective'],
      recognitions: [
        'BW Legal World 40 Under 40 (2024)',
        'Legal500 Recommended Lawyer - Employment (2023)',
      ],
      feeModels: ['Retainer desks for HR and people operations teams', 'Investigation sprints with capped pricing'],
      publications: [
        {
          title: 'Handbook on POSH implementation for startups',
          detail: 'Co-created toolkit released in 2023',
        },
        {
          title: 'People Ops Briefings podcast',
          detail: 'Host covering labour law updates and case studies',
        },
      ],
      proBono: [
        'Conducts POSH awareness workshops for nonprofits and schools',
        'Volunteers with labour helpline supporting gig workers',
      ],
    },
  },
  {
    id: 'rohan-bhatia',
    name: 'Adv. Rohan Bhatia',
    headline: 'Technology Transactions Partner - Meridian Legal',
    location: 'Gurugram, India',
    avatar: 'https://images.unsplash.com/photo-1544723795-3fb9bc85c0d5?auto=format&fit=crop&w=160&q=80',
    cover: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
    specialties: ['Technology Transactions', 'M&A', 'Venture Capital'],
    experienceYears: 11,
    barNumber: 'DL/5634/2013',
    languages: ['English', 'Hindi'],
    availability: 'Intro calls available this week',
    email: 'rohan.bhatia@meridianlegal.in',
    profile: {
      overview: [
        'Structures cross-border technology transactions, venture investments and commercial alliances for product companies and funds.',
        'Bridges legal, product and finance teams to close deals at speed while mitigating regulatory friction.',
      ],
      differentiators: [
        'Former in-house counsel for unicorn offering pragmatic, deal-first approach.',
        'Deep experience with US-India flips and ESOP liquidity programs.',
        'Negotiates data-heavy deals with privacy-by-design protections.',
      ],
      sectors: ['SaaS & Platforms', 'Fintech & Payments', 'AI & Analytics', 'Logistics & Mobility', 'Venture Capital'],
      signatureMatters: [
        'Closed USD 250M strategic investment into AI logistics platform with multi-jurisdictional filings.',
        'Structured joint venture between Indian fintech and Singapore bank for prepaid instruments rollout.',
        'Advised founders on secondary sale program unlocking USD 40M liquidity while preserving control.',
      ],
      experience: [
        {
          role: 'Technology Transactions Partner - Meridian Legal',
          period: '2020 - Present',
          summary: 'Leads venture capital, M&A and commercial alliances desk for technology clients.',
        },
        {
          role: 'Head of Legal - BlitzScale Labs',
          period: '2016 - 2020',
          summary: 'Built global legal function for unicorn, closing strategic investments and commercial deals.',
        },
        {
          role: 'Associate - LexBridge',
          period: '2013 - 2016',
          summary: 'Advised funds and startups on venture financing, exits and technology transactions.',
        },
      ],
      education: [
        { title: 'LL.M. Corporate Law', institution: 'New York University', year: '2013' },
        { title: 'B.A. LL.B (Hons.)', institution: 'NUJS Kolkata', year: '2011' },
      ],
      representativeClients: [
        'Global venture and growth equity funds',
        'Decacorn product companies expanding to India',
        'AI SaaS startups entering regulated sectors',
      ],
      memberships: ['TiE Bangalore Charter Member (Legal)', 'International Technology Law Association'],
      recognitions: [
        'GCV Powerlist - Top Counsel for Venture Deals 2024',
        'IFLR1000 Notable Practitioner - M&A 2023',
      ],
      feeModels: [
        'Deal desk retainers with integrated documentation support',
        'Outcome-based pricing for diligence accelerators',
      ],
      publications: [
        {
          title: 'Negotiating data sharing clauses in AI joint ventures',
          detail: 'Author, Tech Transactions Review (2024)',
        },
        {
          title: 'SaaSBOOMi legal roundtable on ESOP secondaries',
          detail: 'Speaker, 2023 edition',
        },
      ],
      proBono: [
        'Mentors legal operations teams at startup accelerators',
        'Supports open-source civic tech projects with contract templates',
      ],
    },
  },
  {
    id: 'ananya-rao',
    name: 'Adv. Ananya Rao',
    headline: 'Public Policy & Regulatory Counsel - StratLaw Partners',
    location: 'Hyderabad, India',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=160&q=80',
    cover: 'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?auto=format&fit=crop&w=1200&q=80',
    specialties: ['Public Policy', 'Regulatory Advisory', 'ESG'],
    experienceYears: 9,
    barNumber: 'TS/2134/2015',
    languages: ['English', 'Telugu', 'Hindi'],
    availability: 'Open for strategic mandates',
    email: 'ananya.rao@stratlaw.co',
    profile: {
      overview: [
        'Advises policy, regulatory and government affairs teams on navigating emerging legislation, licensing and stakeholder management.',
        'Builds compliance roadmaps that pair legal analysis with policy advocacy strategies for regulated sectors.',
      ],
      differentiators: [
        'Former policy fellow with experience drafting state-level regulations.',
        'Runs stakeholder labs connecting lawmakers, industry bodies and startups.',
        'Delivers rapid horizon scans for clients entering heavily regulated markets.',
      ],
      sectors: [
        'Digital Public Infrastructure',
        'Healthcare & Life Sciences',
        'Telecom & Broadband',
        'ESG & Climate',
        'Education Technology',
      ],
      signatureMatters: [
        'Led nationwide consultation on data governance bill for industry coalition of 70+ members.',
        'Advised IoT company on securing spectrum sandbox approvals and pilot exemptions.',
        'Structured ESG reporting framework for renewable energy consortium across three states.',
      ],
      experience: [
        {
          role: 'Public Policy & Regulatory Counsel - StratLaw Partners',
          period: '2020 - Present',
          summary: 'Leads policy advisory, legislative tracking and regulatory engagement mandates across sectors.',
        },
        {
          role: 'Senior Policy Associate - Vidhi Centre for Legal Policy',
          period: '2016 - 2020',
          summary: 'Drafted consultation papers, legislation and implementation blueprints for state governments.',
        },
        {
          role: 'Legislative Assistant to Member of Parliament Fellow',
          period: '2014 - 2016',
          summary: 'Supported parliamentary research, stakeholder outreach and bill analysis.',
        },
      ],
      education: [
        { title: 'Master in Public Policy', institution: 'Lee Kuan Yew School of Public Policy', year: '2014' },
        { title: 'B.A. LL.B (Hons.)', institution: 'NALSAR University of Law', year: '2012' },
      ],
      representativeClients: [
        'Digital public goods alliances',
        'Renewable energy sponsors',
        'Ed-tech platforms scaling rural programs',
      ],
      memberships: ['Internet and Mobile Association of India - Policy Working Group', 'FICCI ESG Task Force'],
      recognitions: ['ET Legal Rising Star - Policy 2024', 'UNDP Policy Innovation Fellow 2022'],
      feeModels: ['Policy retainers with embedded analyst pods', 'Legislative tracking subscriptions with quarterly sprints'],
      publications: [
        {
          title: 'Playbook for responsible AI in public services',
          detail: 'Lead author, 2023',
        },
        {
          title: 'Mint Policy column on digital governance',
          detail: 'Regular op-ed contributor',
        },
      ],
      proBono: [
        'Advises civic tech nonprofits on consultation responses',
        'Trains university policy labs on stakeholder mapping and negotiation',
      ],
    },
  },
  {
    id: 'kavita-desai',
    name: 'Adv. Kavita Desai',
    headline: 'Real Estate & Projects Counsel - Orbit Chambers',
    location: 'Ahmedabad, India',
    avatar: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=160&q=80',
    cover: 'https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=1200&q=80',
    specialties: ['Real Estate', 'Project Finance', 'Commercial Leasing'],
    experienceYears: 16,
    barNumber: 'GJ/4412/2008',
    languages: ['English', 'Gujarati', 'Hindi'],
    availability: 'Available for project diligence mandates',
    email: 'kavita.desai@orbitchambers.in',
    profile: {
      overview: [
        'Guides developers, funds and corporates on complex real estate and project finance transactions across India.',
        'Combines on-ground diligence with financing strategies to de-risk high-value projects and portfolios.',
      ],
      differentiators: [
        'Specialist in strata assets, warehousing and REIT-ready portfolios.',
        'Deploys GIS-enabled diligence checklists for faster title verification.',
        'Strong lender relationships enabling quick syndication and refinancing.',
      ],
      sectors: [
        'Commercial Real Estate',
        'Industrial & Warehousing',
        'Renewable Projects',
        'Hospitality',
        'Affordable Housing',
      ],
      signatureMatters: [
        'Closed INR 1,200 crore industrial park acquisition with staggered completion structures.',
        'Advised on launch of Grade A logistics REIT platform in western India.',
        'Represented hospitality portfolio in refinancing across three domestic banks.',
      ],
      experience: [
        {
          role: 'Real Estate & Projects Counsel - Orbit Chambers',
          period: '2017 - Present',
          summary: 'Handles large-ticket acquisitions, leasing portfolios and project finance mandates nationwide.',
        },
        {
          role: 'Partner - Western Realty Law Associates',
          period: '2011 - 2017',
          summary: 'Led commercial leasing, strata sales and township development mandates.',
        },
        {
          role: 'Associate - AZB & Partners',
          period: '2008 - 2011',
          summary: 'Worked on marquee real estate and infrastructure transactions for multinational clients.',
        },
      ],
      education: [
        { title: 'Diploma in Real Estate Laws', institution: 'Government Law College, Mumbai', year: '2008' },
        { title: 'B.A. LL.B', institution: 'Gujarat National Law University', year: '2006' },
      ],
      representativeClients: [
        'Top five warehousing developer in India',
        'Sovereign-backed infrastructure fund',
        'Hospitality investment platform with 25 properties',
      ],
      memberships: ['CREDAI Legal Advisory Council', 'International Council of Shopping Centers'],
      recognitions: [
        'Chambers Asia-Pacific 2024 - Notable Practitioner (Real Estate)',
        'IFLR1000 Rising Star - Project Finance 2023',
      ],
      feeModels: [
        'Success-linked diligence pods for acquisitions',
        'Portfolio retainers covering lease management and compliance',
      ],
      publications: [
        {
          title: 'Decoding strata ownership for industrial parks',
          detail: 'Author, Real Estate Insight (2024)',
        },
        {
          title: 'RICS India conference on REIT governance',
          detail: 'Panelist, 2023 edition',
        },
      ],
      proBono: [
        'Assists community housing collectives with conveyance regularisation',
        'Mentors women professionals in infrastructure initiatives',
      ],
    },
  },
  {
    id: 'rahul-chatterjee',
    name: 'Adv. Rahul Chatterjee',
    headline: 'Banking & Insolvency Partner - EastBridge Law',
    location: 'Kolkata, India',
    avatar: 'https://images.unsplash.com/photo-1544723795-cefcb8fa5000?auto=format&fit=crop&w=160&q=80',
    cover: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1200&q=80',
    specialties: ['Banking & Finance', 'Insolvency', 'Restructuring'],
    experienceYears: 19,
    barNumber: 'WB/3120/2005',
    languages: ['English', 'Bengali', 'Hindi'],
    availability: 'Taking IBC advisory calls within 3 days',
    email: 'rahul.chatterjee@eastbridge.in',
    profile: {
      overview: [
        'Specialises in banking, restructuring and insolvency mandates with nearly two decades before NCLT, DRT and High Courts.',
        'Advises lenders, distressed debt investors and resolution professionals on time-sensitive recoveries and workouts.',
      ],
      differentiators: [
        'Leads multi-disciplinary teams covering forensic, valuation and litigation tracks.',
        'Known for swift Section 7 and Section 9 filings with airtight documentation.',
        'Strategic negotiator driving pre-pack and hybrid resolution structures.',
      ],
      sectors: ['Banking & NBFC', 'Manufacturing & Steel', 'Infrastructure', 'Power & Renewables', 'Special Situation Funds'],
      signatureMatters: [
        'Represented consortium of banks in INR 4,600 crore steel asset resolution under IBC.',
        'Advised distressed debt fund on acquisition of hospitality portfolio through ARC structure.',
        'Helped promoter group secure Section 12A withdrawal with compliance covenants.',
      ],
      experience: [
        {
          role: 'Banking & Insolvency Partner - EastBridge Law',
          period: '2016 - Present',
          summary: 'Leads restructuring, recovery and insolvency mandates across tribunals and courts.',
        },
        {
          role: 'Partner - Apex Chambers Kolkata',
          period: '2010 - 2016',
          summary: 'Ran banking litigation and debt recovery practice for PSU banks and corporates.',
        },
        {
          role: 'Associate - Amarchand Mangaldas',
          period: '2005 - 2010',
          summary: 'Worked on banking disputes, project finance and regulatory advisory.',
        },
      ],
      education: [
        { title: 'LL.M. Banking Law', institution: 'National Law University, Jodhpur', year: '2005' },
        { title: 'B.A. LL.B (Hons.)', institution: 'Calcutta University', year: '2003' },
      ],
      representativeClients: [
        'Consortium of top five PSU banks',
        'Global special situation fund',
        'Large eastern India manufacturing conglomerate',
      ],
      memberships: ['Insolvency Law Committee (Industry Invitee)', 'Kolkata Chamber of Commerce Banking Council'],
      recognitions: [
        'IFLR1000 Highly Regarded - Restructuring 2024',
        'Asia Law Distinguished Practitioner - Insolvency 2023',
      ],
      feeModels: [
        'Hybrid retainers with success-linked upside on recoveries',
        'Shadow counsel packages supporting in-house teams',
      ],
      publications: [
        {
          title: 'IBC Playbook for Lenders',
          detail: 'Contributor, CII publication (2023)',
        },
        {
          title: 'INSOL India roundtable on pre-pack frameworks',
          detail: 'Speaker, 2024 series',
        },
      ],
      proBono: [
        'Advises MSME associations on insolvency preparedness',
        'Coaches law students for insolvency moot competitions',
      ],
    },
  },
  {
    id: 'sana-ali',
    name: 'Adv. Sana Ali',
    headline: 'Media & Entertainment Counsel - Crescent Legal Studio',
    location: 'Mumbai, India',
    avatar: 'https://images.unsplash.com/photo-1544723795-432537aaa73c?auto=format&fit=crop&w=160&q=80',
    cover: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    specialties: ['Media Law', 'IPR', 'Commercial Contracts'],
    experienceYears: 8,
    barNumber: 'MH/9011/2016',
    languages: ['English', 'Hindi', 'Urdu'],
    availability: 'Quick turnarounds on production contracts',
    email: 'sana.ali@crescentstudio.in',
    profile: {
      overview: [
        'Supports studios, OTT platforms and talent agencies on media, IP and production deals from development to distribution.',
        'Combines commercial sensibility with rights management expertise for fast-paced content pipelines.',
      ],
      differentiators: [
        'Negotiates multi-season content deals with global streamers and broadcasters.',
        'Expert in music licensing, sync and brand endorsement structures.',
        'Builds template stacks enabling production houses to close deals within days.',
      ],
      sectors: ['Film & OTT', 'Digital Media', 'Music & Publishing', 'Sports & Talent', 'Advertising & Brand'],
      signatureMatters: [
        'Negotiated pan-Asia licensing deal for premium drama slate with major OTT platform.',
        'Closed brand partnership and production agreements for global sports league docu-series.',
        'Advised talent collective on IP holding structure and revenue waterfalls for endorsements.',
      ],
      experience: [
        {
          role: 'Media & Entertainment Counsel - Crescent Legal Studio',
          period: '2018 - Present',
          summary: 'Handles studio, OTT and talent mandates covering contracts, IP enforcement and financing.',
        },
        {
          role: 'Legal & Business Affairs Manager - Global Studios India',
          period: '2014 - 2018',
          summary: 'Negotiated production and distribution deals across scripted and unscripted content.',
        },
        {
          role: 'Associate - IP Boutique Firm',
          period: '2012 - 2014',
          summary: 'Advised on copyright, trademarks and brand licensing across entertainment clients.',
        },
      ],
      education: [
        { title: 'Diploma in Media & Entertainment Law', institution: 'Whistling Woods International', year: '2012' },
        { title: 'B.A. LL.B', institution: 'Government Law College, Mumbai', year: '2011' },
      ],
      representativeClients: [
        'Top three OTT platforms in India',
        'Premier cricket league production houses',
        'Independent music labels and artist collectives',
      ],
      memberships: ['Film Writers Association - Legal Advisor', 'International Association of Entertainment Lawyers'],
      recognitions: [
        'Variety India Legal Impact Report 2024',
        'BW Legal World 30 Under 30 (Media Law) 2023',
      ],
      feeModels: ['On-demand deal desk retainers for production houses', 'Subscription-based counsel for talent agencies'],
      publications: [
        {
          title: 'Navigating brand integrations in scripted content',
          detail: 'Author, Entertainment Business Review (2024)',
        },
        {
          title: 'Deal Sheet webinar series for producers',
          detail: 'Host, monthly updates on industry contracts',
        },
      ],
      proBono: [
        'Supports indie filmmakers with contract reviews via community clinics',
        'Mentors women creators through Women in Film and Television India',
      ],
    },
  },
  {
    id: 'vivek-iyer',
    name: 'Adv. Vivek Iyer',
    headline: 'Tax & Structuring Advisor - NorthBridge Counsel',
    location: 'Chennai, India',
    avatar: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=160&q=80',
    cover: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    specialties: ['International Tax', 'Structuring', 'Private Equity'],
    experienceYears: 15,
    barNumber: 'TN/5083/2009',
    languages: ['English', 'Tamil'],
    availability: 'Structuring sprints available on notice',
    email: 'vivek.iyer@northbridgecounsel.com',
    profile: {
      overview: [
        'Advises multinationals, funds and family offices on cross-border tax strategy, structuring and investment optimisation.',
        'Known for solving complex inbound and outbound tax puzzles with commercial pragmatism and clear communication.',
      ],
      differentiators: [
        'Combines chartered accountancy background with legal expertise for holistic structuring.',
        'Builds scenario models that help CFOs stress-test transactions before signing.',
        'Experienced in APAs, MAPs and BEPS aligned structures across geographies.',
      ],
      sectors: [
        'Private Equity & VC',
        'Manufacturing & Industrial',
        'Technology & SaaS',
        'Infrastructure & Energy',
        'Family Offices',
      ],
      signatureMatters: [
        'Structured USD 600M secondary sale for PE fund ensuring tax neutrality across three jurisdictions.',
        'Advised conglomerate on demerger unlocking GST and stamp duty efficiencies while preserving control.',
        'Secured APA for US tech company streamlining transfer pricing for India GCC operations.',
      ],
      experience: [
        {
          role: 'Tax & Structuring Advisor - NorthBridge Counsel',
          period: '2018 - Present',
          summary: 'Leads cross-border tax, structuring and transaction advisory for funds and corporates.',
        },
        {
          role: 'Director - Big Four Tax & Regulatory Practice',
          period: '2012 - 2018',
          summary: 'Ran international tax and transfer pricing engagements across industries.',
        },
        {
          role: 'Senior Associate - Corporate Tax Boutique',
          period: '2009 - 2012',
          summary: 'Worked on mergers, inbound investments and compliance for multinational groups.',
        },
      ],
      education: [
        {
          title: 'LL.M. International Taxation',
          institution: 'Vienna University of Economics and Business',
          year: '2009',
        },
        { title: 'Chartered Accountant', institution: 'Institute of Chartered Accountants of India', year: '2008' },
        { title: 'B.Com', institution: 'Loyola College, Chennai', year: '2006' },
      ],
      representativeClients: [
        'Global private equity funds with India portfolio',
        'Large auto-component manufacturer',
        'Cross-border e-commerce platform',
      ],
      memberships: ['International Fiscal Association - India Branch', 'Bombay Chartered Accountants Society'],
      recognitions: [
        'World Tax Leaders 2024 - Ranked Practitioner',
        'India Business Law Journal A-List 2023',
      ],
      feeModels: [
        'Retained chief tax advisor for multi-country expansions',
        'Fixed-fee structuring sprints with implementation support',
      ],
      publications: [
        {
          title: 'BEPS 2.0 readiness guide for Indian groups',
          detail: 'Author, NorthBridge Insights (2024)',
        },
        {
          title: 'Exit tax planning for PE funds',
          detail: 'Speaker, VC Circle Summit (2023)',
        },
      ],
      proBono: [
        'Advises social enterprises on tax exemptions and compliance frameworks',
        'Trains early-stage startups through StartupTN clinics',
      ],
    },
  },
  {
    id: 'ayesha-khan',
    name: 'Adv. Ayesha Khan',
    headline: 'Cybersecurity & Privacy Counsel - SecureLaw Labs',
    location: 'Pune, India',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=160&q=80&sat=-30',
    cover: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=1200&q=80',
    specialties: ['Cybersecurity', 'Privacy', 'Incident Response'],
    experienceYears: 10,
    barNumber: 'MH/7123/2014',
    languages: ['English', 'Hindi'],
    availability: 'Incident triage support within 12 hours',
    email: 'ayesha.khan@securelawlabs.in',
    profile: {
      overview: [
        'Runs incident response and privacy programs for enterprises facing cyber threats and regulatory scrutiny.',
        'Combines technical response playbooks with board-level communication frameworks for resilience.',
      ],
      differentiators: [
        'Certified incident responder with live breach war-room experience.',
        'Implements 72-hour compliance protocols for cross-border incidents.',
        'Builds security-by-design policies for AI and data-rich products.',
      ],
      sectors: ['Fintech', 'SaaS & Cloud', 'Healthcare', 'Digital Infrastructure', 'Gaming & Web3'],
      signatureMatters: [
        'Led response to multi-country ransomware event for fintech serving 20 million users.',
        'Designed privacy impact assessment framework for large healthtech provider entering EU market.',
        'Negotiated data-sharing protocols with CERT-In after major incident to avoid punitive action.',
      ],
      experience: [
        {
          role: 'Cybersecurity & Privacy Counsel - SecureLaw Labs',
          period: '2019 - Present',
          summary: 'Heads incident response, privacy compliance and cybersecurity readiness engagements.',
        },
        {
          role: 'Regional Privacy Lead - Global Cloud Provider',
          period: '2015 - 2019',
          summary: 'Implemented regional privacy programs, breach simulations and regulator outreach.',
        },
        {
          role: 'Associate - Tech Law Boutique',
          period: '2014 - 2015',
          summary: 'Advised startups on data protection, terms of use and vendor risk allocation.',
        },
      ],
      education: [
        { title: 'LL.M. Information Technology Law', institution: 'University of Edinburgh', year: '2014' },
        { title: 'B.S.L. LL.B', institution: 'ILS Law College, Pune', year: '2012' },
      ],
      representativeClients: [
        'Top digital payments company',
        'Global SaaS platforms with India delivery centres',
        'Healthtech unicorn expanding to EU markets',
      ],
      memberships: [
        'International Association of Privacy Professionals',
        'Data Security Council of India Cyber Task Force',
      ],
      recognitions: [
        'Cybersecurity Counsel of the Year - India Legal Awards 2024',
        'Featured expert in Gartner Market Guide for Incident Response 2023',
      ],
      feeModels: [
        'Retainer-based cyber incident desk with 24/7 hotline',
        'Assessment sprints covering privacy and security maturity',
      ],
      publications: [
        {
          title: 'CERT-In incident response toolkit',
          detail: 'Contributor, 2024 edition',
        },
        {
          title: 'Fintech incident readiness briefing',
          detail: 'Speaker, Black Hat Asia 2023',
        },
      ],
      proBono: [
        'Supports cybersecurity clinics for small businesses via NASSCOM Foundation',
        'Mentors women in security forums and communities',
      ],
    },
  },
]

export const featuredLawyer = lawyers[0]
