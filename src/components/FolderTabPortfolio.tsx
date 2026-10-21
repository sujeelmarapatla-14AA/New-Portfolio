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
        blurb="B.Tech Computer Science (AIML) student at MLRIT (2025–2029) focused on machine learning models, full-stack systems, and cloud architecture."
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
          { title: "Profile", points: ["B.Tech CSE (AIML)", "MLRIT Hyderabad"], target: "cover" },
          { title: "Contents", points: ["Portfolio Index", "Quick Navigation"], target: "contents" },
          { title: "About", points: ["Academic Background", "Education History"], target: "about" },
          { title: "Skills", points: ["AI/ML, Python, Java", "Full-Stack & Systems"], target: "skills" },
          { title: "Projects", points: ["AWS Trek, CareQ", "PortFolio, OneProfile"], target: "work" },
          { title: "Certifications", points: ["JioPC AI, MongoDB", "Autodesk, CIE MLRIT"], target: "certifications" },
          { title: "Contact", points: ["Email, GitHub", "LinkedIn, Socials"], target: "contact" },
        ]}
        highlights={[
          {
            label: "AI & Machine Learning",
            tone: "blue",
            lines: [
              "Python & ML Foundations",
              "Prompt Design & LLM Workflows",
              "Algorithmic Problem Solving",
            ],
          },
          {
            label: "Full-Stack & Systems",
            tone: "green",
            lines: [
              "Next.js & React Applications",
              "Java & C Systems Programming",
              "Relational DBMS & SQL Schema",
            ],
          },
          {
            label: "Academics",
            tone: "orange",
            lines: [
              "B.Tech CSE (AIML) @ MLRIT (2025–2029)",
              "Roll No: 25R21A6637",
              "Open to Technical Internships",
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
        categories={[
          { id: "cloud", label: "Cloud & Web", tone: "blue", kind: "poster" },
          { id: "health", label: "Healthcare", tone: "green", kind: "render" },
          { id: "creative", label: "Interactive Web", tone: "orange", kind: "page" },
          { id: "edtech", label: "EdTech & AI", tone: "yellow", kind: "brand" },
        ]}
        projects={[
          {
            title: "AWS Trek",
            category: "cloud",
            year: "2026",
            summary: "Campus printing and stationery platform with automated queue management and document processing.",
            client: "Campus Systems",
            role: "Full Stack & Cloud Deployer",
            tools: ["React", "Node.js", "Express", "AWS ALB", "MongoDB", "Tailwind CSS"],
            mark: "TREK",
            href: "http://aws-trek-alb-164819343.ap-south-1.elb.amazonaws.com",
            github: "https://github.com/sujeelmarapatla-14AA/aws-trek",
            body: [
              "Full-stack ordering system reducing student queue times for campus printing.",
              "High-availability deployment on AWS with Application Load Balancer (ALB) and EC2.",
              "Real-time order tracking and secure file upload pipeline.",
            ],
          },
          {
            title: "CareQ",
            category: "health",
            year: "2026",
            summary: "Hospital management platform with dynamic appointment booking and clinical queue tracking.",
            client: "Healthcare",
            role: "Lead Full Stack Engineer",
            tools: ["Next.js", "TypeScript", "React", "Vercel", "Tailwind CSS", "PostgreSQL"],
            mark: "CARE",
            href: "https://care-q-fgy2.vercel.app",
            github: "https://github.com/sujeelmarapatla-14AA/careQ",
            body: [
              "Streamlines clinical OPD queues, patient records, and doctor scheduling.",
              "Dynamic appointment booking with real-time availability tracking.",
              "Deployed on Vercel with responsive mobile-first interface.",
            ],
          },
          {
            title: "PortFolio",
            category: "creative",
            year: "2026",
            summary: "Personal portfolio web application showcasing projects, technical certifications, and system architecture.",
            client: "Portfolio",
            role: "Frontend Architect",
            tools: ["React", "JavaScript", "HTML5", "CSS3", "Render", "Vite"],
            mark: "PORT",
            href: "https://portfolio-sujeel.onrender.com/",
            github: "https://github.com/sujeelmarapatla-14AA/PortFolio",
            body: [
              "Single-page application with modular sheet architecture deployed on Render.",
              "Interactive certificate lightbox modals, 3D orbits, and credential verification.",
            ],
          },
          {
            title: "OneProfile",
            category: "edtech",
            year: "2026",
            summary: "Academic credential vault with AI-powered skill tagging and automated portfolio synthesis.",
            client: "EdTech",
            role: "AI & Systems Developer",
            tools: ["Python", "React", "AI/ML Workflows", "FastAPI", "MongoDB"],
            mark: "VAULT",
            github: "https://github.com/sujeelmarapatla-14AA",
            body: [
              "Consolidates verified credentials, coursework, and project repositories.",
              "AI-assisted skill extraction and profile generation for engineering students.",
              "Secure credential schema for sharing with institutions and recruiters.",
            ],
          },
        ]}
        certifications={[
          {
            title: "AI Foundation Course",
            issuer: "JioPC & Jio Institute",
            date: "2026",
            image: "/certificates/ai-foundation.png",
            description: "Core artificial intelligence concepts and machine learning fundamentals.",
            tone: "blue",
          },
          {
            title: "Innovation Practices using Autodesk - Fusion",
            issuer: "Design Labs - Autodesk Partner",
            date: "March 2026",
            image: "/certificates/autodesk-fusion.jpg",
            description: "Parametric 3D CAD modeling and rapid prototyping with Autodesk Fusion.",
            tone: "green",
          },
          {
            title: "Web Development - Workshop Carnival 2.0",
            issuer: "CIE - MLR Institute of Technology",
            date: "April 2026",
            image: "/certificates/web-dev-workshop.jpg",
            description: "Full-stack web application development and API architectures.",
            tone: "orange",
          },
          {
            title: "MongoDB Basics for Students",
            issuer: "MongoDB",
            date: "August 2026",
            image: "/certificates/mongodb-basics.jpg",
            verifyUrl: "https://www.credly.com/badges/e2a3e5af-3db9-43e7-b3f4-2aefae156214",
            description: "Document database architecture, CRUD operations, indexing, and schema modeling.",
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
