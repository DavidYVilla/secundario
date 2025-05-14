import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../components/LanguageSwitcher';
import ThemeToggle from '../components/ThemeToggle';

export default function Home() {
  const { t } = useTranslation();

  return (
    <>
      <main className="container mx-auto text-center">
        <ThemeToggle />
        <LanguageSwitcher />
        <h1 className="text-4xl font-bold">{t('welcome')}</h1>
        <p className="text-lg">{t('description')}</p>
      </main>
    </>
  );
}
