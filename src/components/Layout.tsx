import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';
import { Typography } from './ui/typography';
import { Link, Outlet, useLocation } from 'react-router-dom';

export default function Layout() {
  const { t, i18n } = useTranslation();
  const [dark, setDark] = React.useState(false);
  const [rtl, setRtl] = React.useState(i18n.language === 'fa');
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const location = useLocation();

  // Update html classes for dark mode and direction
  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    document.documentElement.dir = rtl ? 'rtl' : 'ltr';
  }, [dark, rtl]);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'fa' : 'en';
    i18n.changeLanguage(newLang);
    setRtl(newLang === 'fa');
  };

  const toggleDrawer = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen flex bg-zinc-100 dark:bg-zinc-900 transition-colors duration-300">
      {/* Sidebar */}
      <aside
        className={`
          fixed z-55 inset-y-0 ${rtl ? 'right-0' : 'left-0'} w-64 bg-white dark:bg-zinc-800 shadow-lg transform
          transition-transform duration-200 ease-in-out
          md:static md:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : rtl ? 'translate-x-full' : '-translate-x-full'}
          md:w-64
          flex flex-col
        `}
      >
        <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-700">
          <Typography variant="h4" className="text-zinc-900 dark:text-zinc-50">
            {t('app.name')}
          </Typography>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleDrawer}
            aria-label="Close sidebar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </Button>
        </div>
        <nav className="p-4 space-y-2">
          <Link
            to="/submissions"
            className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              isActive('/submissions')
                ? 'bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50'
                : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-700 hover:text-zinc-900 dark:hover:text-zinc-50'
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
            <Typography variant="small">{t('sidebar.submissions')}</Typography>
          </Link>
          <Link
            to="/forms"
            className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              isActive('/forms')
                ? 'bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50'
                : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-700 hover:text-zinc-900 dark:hover:text-zinc-50'
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="7" height="9" x="3" y="3" rx="1" />
              <rect width="7" height="5" x="14" y="3" rx="1" />
              <rect width="7" height="9" x="14" y="12" rx="1" />
              <rect width="7" height="5" x="3" y="16" rx="1" />
            </svg>
            <Typography variant="small">{t('sidebar.forms')}</Typography>
          </Link>
        </nav>

        <div className="flex mt-auto border-t border-zinc-200 dark:border-zinc-700 p-4 items-end">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDark(d => !d)}
              className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50"
            >
              {dark ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2" />
                  <path d="M12 20v2" />
                  <path d="m4.93 4.93 1.41 1.41" />
                  <path d="m17.66 17.66 1.41 1.41" />
                  <path d="M2 12h2" />
                  <path d="M20 12h2" />
                  <path d="m6.34 17.66-1.41 1.41" />
                  <path d="m19.07 4.93-1.41 1.41" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                </svg>
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLanguage}
              className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50"
            >
              {i18n.language === 'en' ? 'EN' : 'فا'}
            </Button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 md:hidden"
          onClick={toggleDrawer}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen transition-all duration-200">
        {/* Header */}
        <header className="flex items-center justify-between p-4 bg-white dark:bg-zinc-800 shadow md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleDrawer} aria-label="Open sidebar">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </Button>
        </header>

        <main className="flex-1 p-4 bg-zinc-50 dark:bg-zinc-900 transition-colors duration-300">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
