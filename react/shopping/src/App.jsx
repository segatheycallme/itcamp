import { Routes, Route } from 'react-router-dom'
import '@mantine/core/styles.css'
import './App.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'
import Products from './pages/Products/Products'
import { MantineProvider } from '@mantine/core'
import { createContext, useState } from 'react'
import sportswear from './common/sportswear.json'
import footwear from './common/footwear.json'
import socks from './common/socks.json'
import Cart from './pages/Cart/Cart'

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
            <Route path="/sportswear" element={<Products products={sportswear} fallback_desc="Odeca" />} />
            <Route path="/footwear" element={<Products products={footwear} fallback_desc="Patike" />} />
            <Route path="/socks" element={<Products products={socks} fallback_desc="Čarape" />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>
        <Footer />
      </MantineProvider>
    </context.Provider>
  )
}

