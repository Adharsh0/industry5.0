import { useState } from 'react'
import './App.css'
import HomeSection from './components/HomeSection'
import Navbar from './components/Navbar'
import AboutSection from './components/AboutSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar />
    <HomeSection />
    <AboutSection />
    <ContactSection />
    <Footer />
    </>
  )
}

export default App
