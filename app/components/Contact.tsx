'use client';

import { useTranslation } from 'react-i18next';

export default function Contact() {
  const { t } = useTranslation();

  return (
    <section id="contact" className="container mx-auto py-16 px-6">
      <h2 className="text-3xl font-bold text-white mb-4 text-center">
        {t('contact.title')}
      </h2>
      <p className="text-gray-700 mb-6 text-center  dark:text-white">
        {t('contact.text')}
      </p>
      <form className="space-y-4 max-w-lg mx-auto">
        <div>
          <label
            htmlFor="name"
            className="block text-gray-700  dark:text-white"
          >
            {t('contact.namein')}
          </label>
          <input
            type="text"
            id="name"
            className="w-full p-2 border rounded"
            placeholder={t('contact.nameplace')}
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-gray-700  dark:text-white"
          >
            {t('contact.emailin')}
          </label>
          <input
            type="email"
            id="email"
            className="w-full p-2 border rounded"
            placeholder={t('contact.emailplace')}
          />
        </div>
        <div>
          <label
            htmlFor="message"
            className="block text-gray-700 dark:text-white"
          >
            {t('contact.messa')}
          </label>
          <textarea
            id="message"
            className="w-full p-2 border rounded"
            placeholder={t('contact.messaplace')}
          ></textarea>
        </div>
        <button className="bg-white text-primary px-8 py-3 rounded-lg shadow-md hover:bg-secondary hover:text-white transition-all duration-300">
          {t('contact.send')}
        </button>
      </form>
    </section>
  );
}
