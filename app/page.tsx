'use client';

import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import { useLanguage } from './contexts/LanguageContext';
import { useEffect, useState } from 'react'; // ✅ Importa useEffect
import LanguageSwitcher from './components/LanguageSwitcher';
import { metadata } from './metadata';
import { useContext } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';

import { motion } from 'framer-motion';

import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';

export default function Home() {
  const { t } = useTranslation();

  return (
    <div>
      <main className="w-full text-center bg-primary dark:bg-gray-900 ">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}
