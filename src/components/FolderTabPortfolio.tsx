import React, { useEffect } from 'react'
import FolderTabPortfolioTemplate from './ui/folder-tab-portfolio-template'

interface FolderTabPortfolioProps {
  onBack: () => void
}

export const FolderTabPortfolio: React.FC<FolderTabPortfolioProps> = ({ onBack }) => {
  // Support ESC key to return back to hero
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onBack()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onBack])

  return (
    <div className="relative w-full min-h-screen bg-[#151112] selection:bg-[#C52A35] selection:text-white">
      {/* Floating Back to Hero removed per user request */}

      {/* The Folder Tab Portfolio with Migrated Personal Information */}
      <FolderTabPortfolioTemplate
        name="Sujeel Marapatla"
        handle="@sujeel_14_"
        years="2025–2029"
        role="B.Tech CSE (AI & Machine Learning) • MLRIT"
        disciplines={["Artificial Intelligence", "Full-Stack Development", "Cloud & Systems"]}
        word="Portfolio"
        tag="#SUJEEL"
        subtitle={["CSE ", "AIML"]}
        notes={["Learn", "Build", "Deploy"]}
        greeting="Hello, I'm"
        photo="/sujeel-photo.jpg"
        blurb="A dedicated Computer Science student passionate about technology and problem-solving, currently pursuing B.Tech in CSE (AIML) at MLR Institute of Technology (2025-2029). Building scalable web applications, exploring machine learning models, and turning innovative ideas into reality."
        defaultTheme="dark"
        timeZone="Asia/Kolkata"
        email="sujeelmarapatla@gmail.com"
        colors={{
          blue: "#C52A35",
          green: "#8C222B",
          orange: "#D44A52",
          yellow: "#282021",
        }}
        chapters={[
          { title: "Cover & Profile", points: ["B.Tech CSE (AIML)", "MLR Institute of Technology"], target: "cover" },
          { title: "Contents", points: ["Interactive Sheets", "Portfolio Index"], target: "contents" },
          { title: "About Sujeel", points: ["Academic Background", "Education History", "Highlights"], target: "about" },
          { title: "Technical Skills", points: ["3D Spatial Orbit", "AI/ML, Python, Java", "Full-Stack & Systems"], target: "skills" },
          { title: "Engineering Bento", points: ["Magic Bento Grid", "Interactive Architecture", "Telemetry & Glow"], target: "bento" },
          { title: "Featured Projects", points: ["AWS Trek", "CareQ", "PortFolio", "OneProfile"], target: "work" },
          { title: "Certifications", points: ["JioPC AI Foundation", "Autodesk Fusion", "CIE MLRIT", "MongoDB Credly"], target: "certifications" },
          { title: "Contact & Connect", points: ["Email", "GitHub", "LinkedIn", "Instagram"], target: "contact" },
        ]}
        highlights={[
          {
            label: "AI & Machine Learning",
            tone: "blue",
            lines: [
              "Python & Machine Learning Foundations",
              "Prompt Engineering & LLM Workflows",
              "Algorithmic Problem Solving",
            ],
          },
          {
            label: "Full-Stack & Systems",
            tone: "green",
            lines: [
              "Next.js & React Frontend Systems",
              "Java & C Systems Fundamentals",
              "SQL Relational DB & DBMS Schema",
            ],
          },
          {
            label: "Academics & Status",
            tone: "orange",
            lines: [
              "B.Tech CSE (AIML) @ MLRIT (2025–2029)",
              "Hall Ticket No: 25R21A6637",
              "Open to Internships & Collaborative Projects",
            ],
          },
        ]}
        timeline={[
          {
            from: "2025",
            to: "2029",
            title: "B.Tech in CSE (AI & Machine Learning)",
            place: "MLR Institute of Technology, Hyderabad (HT No: 25R21A6637)",
          },
          {
            from: "2023",
            to: "2025",
            title: "Intermediate (MPC)",
            place: "Sri Chaitanya Junior College, Hyderabad",
          },
          {
            from: "2018",
            to: "2023",
            title: "Secondary School Certificate (SSC)",
            place: "Nava Jyothi High School",
          },
        ]}
        skills={[
          {
            category: "Programming Languages",
            subtitle: "Core Foundation",
            tone: "blue",
            skills: [
              {
                name: "C",
                desc: "Procedural programming, memory management, pointers, and data structures implementation.",
              },
              {
                name: "Java",
                desc: "Object-oriented architecture, OOP principles, inheritance, exception handling, and robust systems.",
              },
              {
                name: "Python",
                desc: "Core algorithms, automation scripts, machine learning workflows, and application development.",
              },
            ],
          },
          {
            category: "Databases & Storage",
            subtitle: "Data Management",
            tone: "green",
            skills: [
              {
                name: "SQL",
                desc: "Relational database querying, schema design, table joins, indexing, and data manipulation.",
              },
              {
                name: "DBMS",
                desc: "Database management concepts, ACID properties, normalization, and relational schema optimization.",
              },
            ],
          },
          {
            category: "AI & Machine Learning",
            subtitle: "Specialization",
            tone: "orange",
            skills: [
              {
                name: "AI & Machine Learning",
                desc: "Foundational ML modeling, supervised/unsupervised learning concepts, neural networks, and algorithmic problem-solving.",
              },
              {
                name: "Prompt & LLM Workflows",
                desc: "LLM integration, prompt design, conversational agents, and AI-assisted software development.",
              },
            ],
          },
          {
            category: "Tools & Frameworks",
            subtitle: "Ecosystem",
            tone: "yellow",
            skills: [
              {
                name: "Next.js & React",
                desc: "Modern frontend development, component-driven UI architecture, state management, and responsive web applications.",
              },
              {
                name: "Git & GitHub",
                desc: "Version control, branch management, collaborative workflows, and repository management.",
              },
              {
                name: "Developer Tools",
                desc: "Visual Studio Code, Figma, modern developer tooling, and command-line workflows.",
              },
            ],
          },
        ]}
        categories={[
          { id: "cloud", label: "Cloud & Web", tone: "blue", kind: "poster" },
          { id: "health", label: "Healthcare", tone: "green", kind: "render" },
          { id: "creative", label: "Interactive Web", tone: "orange", kind: "page" },
          { id: "edtech", label: "EdTech & AI", tone: "yellow", kind: "brand" },
        ]}
        projects={[
          {
            title: "AWS Trek - Digital Xerox & Stationery",
            category: "cloud",
            year: "2026",
            summary: "Digital Xerox & Stationery platform engineered for streamlined document processing, printing workflows, and campus stationery management.",
            client: "Campus Printing Systems",
            role: "Full Stack & Cloud Deployer",
            tools: ["React", "Node.js", "Express", "AWS ALB", "MongoDB", "Tailwind CSS"],
            mark: "TREK",
            href: "http://aws-trek-alb-164819343.ap-south-1.elb.amazonaws.com",
            github: "https://github.com/sujeelmarapatla-14AA/aws-trek",
            body: [
              "Engineered full-stack digital stationery and printing workflow system reducing student queue times for campus document printing.",
              "Deployed high-availability cloud infrastructure utilizing AWS Application Load Balancer (ALB) and EC2 instances.",
              "Integrated secure order management, real-time printing status notifications, and dynamic file upload pipelines.",
            ],
          },
          {
            title: "CareQ - Hospital Management System",
            category: "health",
            year: "2026",
            summary: "Modern Hospital & Clinical Management platform featuring appointment scheduling, queue management, doctor-patient interactions, and records management.",
            client: "Healthcare Management",
            role: "Lead Full Stack Engineer",
            tools: ["Next.js", "TypeScript", "React", "Vercel", "Tailwind CSS", "PostgreSQL"],
            mark: "CARE",
            href: "https://care-q-fgy2.vercel.app",
            github: "https://github.com/sujeelmarapatla-14AA/careQ",
            body: [
              "Developed comprehensive healthcare management platform streamlining clinical workflows, OPD queues, and patient records.",
              "Built dynamic appointment booking interface with doctor availability tracking and automated notifications.",
              "Deployed on Vercel with responsive mobile-first UI for seamless patient and hospital staff accessibility.",
            ],
          },
          {
            title: "PortFolio Web App",
            category: "creative",
            year: "2026",
            summary: "Personal portfolio web application showcasing projects, technical certifications, academic achievements, and interactive design experiences.",
            client: "Personal Portfolio",
            role: "Frontend Architect & Designer",
            tools: ["React", "JavaScript", "HTML5", "CSS3", "Render", "Vite"],
            mark: "PORT",
            href: "https://portfolio-sujeel.onrender.com/",
            github: "https://github.com/sujeelmarapatla-14AA/PortFolio",
            body: [
              "Designed and deployed responsive multi-section portfolio showcasing projects, verified certifications, and interactive profile components.",
              "Built lightweight, performant single-page architecture deployed on Render cloud platform.",
              "Incorporated certificate viewer modals, project showcase tabs, and direct contact integration.",
            ],
          },
          {
            title: "OneProfile - AI-Powered EdTech Vault",
            category: "edtech",
            year: "2026",
            summary: "AI-Powered centralized EdTech application vault and academic credential management system designed to streamline student profiles and portfolio generation.",
            client: "EdTech & Academic Profiles",
            role: "AI & Systems Developer",
            tools: ["Python", "React", "AI/ML Workflows", "FastAPI", "MongoDB"],
            mark: "VAULT",
            github: "https://github.com/sujeelmarapatla-14AA",
            body: [
              "Conceptualized and developed unified academic portfolio vault consolidating verified credentials, hackathon submissions, and coursework.",
              "Integrated intelligent skill tagging and AI profile synthesis for engineering students.",
              "Engineered secure schema for credential storage and instant sharing with academic institutions and recruiters.",
            ],
          },
        ]}
        certifications={[
          {
            title: "AI Foundation Course",
            issuer: "JioPC & Jio Institute",
            date: "2026",
            image: "/certificates/ai-foundation.png",
            description: "Foundational certification covering core Artificial Intelligence concepts, machine learning fundamentals, and modern computational applications.",
            tone: "blue",
          },
          {
            title: "Innovation Practices using Autodesk - Fusion",
            issuer: "Design Labs - Autodesk Partner",
            date: "March 2026",
            image: "/certificates/autodesk-fusion.jpg",
            description: "Hands-on certification in 3D design modeling, parametric engineering, generative design principles, and rapid prototyping with Autodesk Fusion.",
            tone: "green",
          },
          {
            title: "Web Development - Workshop Carnival 2.0",
            issuer: "CIE - MLR Institute of Technology",
            date: "April 2026",
            image: "/certificates/web-dev-workshop.jpg",
            description: "Intensive practical workshop on modern web technologies, full-stack application development, responsive design, and API architectures conducted by Centre for Innovation & Entrepreneurship.",
            tone: "orange",
          },
          {
            title: "MongoDB Basics for Students",
            issuer: "MongoDB",
            date: "August 2026",
            image: "/certificates/mongodb-basics.jpg",
            verifyUrl: "https://www.credly.com/badges/e2a3e5af-3db9-43e7-b3f4-2aefae156214",
            description: "Official MongoDB credential validating proficiency in document database architecture, CRUD operations, indexing, aggregation pipelines, and schema modeling.",
            tone: "green",
          },
        ]}
        steps={[]}
        words={[]}
        contacts={[
          { label: "Email", value: "sujeelmarapatla@gmail.com", href: "mailto:sujeelmarapatla@gmail.com" },
          { label: "GitHub", value: "sujeelmarapatla-14AA", href: "https://github.com/sujeelmarapatla-14AA" },
          { label: "LinkedIn", value: "Sujeel Marapatla", href: "https://www.linkedin.com/in/sujeel-m-a2aa1a38a" },
          { label: "Instagram", value: "@sujeel_14_", href: "https://www.instagram.com/sujeel_14_?igsh=ejlmZXBoNjZqYm9p" },
          { label: "Location", value: "Hyderabad, India" },
        ]}
      />
    </div>
  )
}

export default FolderTabPortfolio
