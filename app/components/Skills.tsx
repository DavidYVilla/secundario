'use client';

import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';

export default function Skills() {
  const { t } = useTranslation();
  const skills = [
    {
      category: t('skills.title1'),
      items: [
        { name: 'Diseño y análisis de circuitos electrónicos', level: 83 },
        { name: 'Programación y microcontroladores', level: 95 },
        { name: 'Sistemas de comunicación y redes', level: 70 },
        { name: 'Automatización y control', level: 90 },
        { name: 'Diseño de PCBs y manufactura electrónica', level: 85 },
        { name: 'Energía y electrónica de potencia', level: 70 },
        { name: 'Resolución de problemas y mantenimiento', level: 90 },
        { name: 'Sistemas Embebidos IOT', level: 87 },
      ],
    },
    {
      category: t('skills.title2'),
      items: [
        { name: 'Desarrollo Frontend (React, Vue, Angular)', level: 80 },
        { name: 'Desarrollo Backend (Node.js, Python, Java, PHP)', level: 95 },
        { name: 'Bases de Datos (SQL, MongoDB y NoSQL)', level: 80 },
        { name: 'Control de Versiones (Git y GitHub)', level: 80 },
        { name: 'Seguridad Web y Autenticación', level: 95 },
        { name: 'DevOps y Despliegue', level: 70 },
        { name: 'Arquitectura y Diseño de Software', level: 75 },
        { name: 'Resolución de Problemas y Pensamiento Lógico', level: 95 },
      ],
    },
  ];
  return (
    <section id="skills" className="bg-gray-0 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Título de la Sección */}
        <h2 className="text-3xl md:text-4xl mb-12 text-center text-secondary">
          {t('skills.title0')}
        </h2>

        {/* Mapeo de Categorías */}
        {skills.map((skillCategory, indexCategory) => (
          <div key={indexCategory} className="mb-16">
            {/* Título de Categoría */}
            <h3 className="text-2xl font-semibold mb-8 text-center text-white">
              {skillCategory.category}
            </h3>

            {/* Habilidades en Dos Columnas para Pantallas Grandes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {skillCategory.items.map((skill, indexSkill) => (
                <div key={skill.name} className="relative">
                  {/* Nombre y Nivel de Habilidad */}
                  <div className="flex justify-between mb-2">
                    <span className="text-white font-medium">{skill.name}</span>
                    <span className="text-red">{skill.level}%</span>
                  </div>

                  {/* Barra de Progreso */}
                  <div className="h-3 bg-neutral/30 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: indexSkill * 0.1 }}
                      className="h-full bg-secondary rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
