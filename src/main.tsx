import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/home/Home';
import Hola from './components/hola/Hola';
import Messages from './components/messages/messages';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hola" element={<Hola />} />
        <Route path="/messages" element={<Messages />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
