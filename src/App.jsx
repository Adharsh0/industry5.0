// import { useState } from 'react'
// import './App.css'
// import HomeSection from './components/HomeSection'
// import Navbar from './components/Navbar'
// import AboutSection from './components/AboutSection'
// import ContactSection from './components/ContactSection'
// import Footer from './components/Footer'


// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//     <Navbar />
//     <HomeSection />
//     <AboutSection />
//     <ContactSection />
//     <Footer />
//     </>
//   )
// }

// export default App
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import HomeSection from './components/HomeSection'
import Navbar from './components/Navbar'
import AboutSection from './components/AboutSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import RegistrationPage from './components/RegistrationPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <HomeSection />
              <AboutSection />
              <ContactSection />
            </>
          } />
          <Route path="/register" element={<RegistrationPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
