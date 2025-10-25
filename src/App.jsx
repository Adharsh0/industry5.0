import { useState } from 'react'
import './App.css'
import HomeSection from './components/HomeSection'
import Navbar from './components/Navbar'
import AboutSection from './components/AboutSection'
import ContactSection from './components/ContactSection'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar />
    <HomeSection />
    <AboutSection />
    <ContactSection />
    </>
  )
}

export default App
