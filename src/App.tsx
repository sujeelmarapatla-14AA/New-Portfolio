import React, { useState } from 'react'
import { BackgroundVideo } from './components/BackgroundVideo'
import { Navbar } from './components/Navbar'
import { HeroContent } from './components/HeroContent'
import { FolderTabPortfolio } from './components/FolderTabPortfolio'
import { CustomCursor } from './components/CustomCursor'

export const App: React.FC = () => {
  const [isLaunched, setIsLaunched] = useState(false)

  return (
    <main className="relative w-full min-h-screen overflow-hidden selection:bg-black selection:text-white">
      {/* Premium minimal rounded black custom cursor */}
      <CustomCursor />

      {isLaunched ? (
        /* Original Folder Tab Designer Portfolio Template by Kedhareswer Naidu */
        <FolderTabPortfolio onBack={() => setIsLaunched(false)} />
      ) : (
        /* Red character hero landing page */
        <>
          {/* Red character animation with 76 frames mouse-scrubbing */}
          <BackgroundVideo />

          {/* Top Navbar with Sujeel_14_ & Get in touch */}
          <Navbar />

          {/* Hero Content with Launch Portfolio trigger */}
          <HeroContent onLaunch={() => setIsLaunched(true)} />
        </>
      )}
    </main>
  )
}

export default App
