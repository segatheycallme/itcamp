import { Routes, Route } from 'react-router-dom'
import '@mantine/core/styles.css'
import './App.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'
import Products from './pages/Products/Products'
import { MantineProvider } from '@mantine/core'
import { createContext, useState } from 'react'

export const context = createContext()

export default function App() {
  const val = useState([])
  return (
    <context.Provider value={val}>
      <MantineProvider>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/products" element={<Products />} />
          </Routes>
        </main>
        <Footer />
      </MantineProvider>
    </context.Provider>
  )
}

