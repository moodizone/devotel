import * as React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = React.useState(false);
  const [rtl, setRtl] = React.useState(false);
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  // Update html classes for dark mode and direction
  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    document.documentElement.dir = rtl ? 'rtl' : 'ltr';
  }, [dark, rtl]);

  return (
    <div className="min-h-screen flex bg-zinc-100 dark:bg-zinc-900 transition-colors duration-300">
      {/* Sidebar */}
      <aside
        className={`
          fixed z-30 inset-y-0 ${rtl ? 'right-0' : 'left-0'} w-64 bg-white dark:bg-zinc-800 shadow-lg transform
          transition-transform duration-200 ease-in-out
          md:static md:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : rtl ? 'translate-x-full' : '-translate-x-full'}
          md:w-64 md:block
        `}
      >
        <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-700">
          <div className="flex gap-2">
            <button
              className="p-2 bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-300 dark:hover:bg-zinc-600 cursor-pointer rounded"
              onClick={() => setDark(d => !d)}
              aria-label="Toggle theme"
            >
              {dark ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>
            <button
              className="p-2 bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-300 dark:hover:bg-zinc-600 cursor-pointer rounded"
              onClick={() => setRtl(r => !r)}
              aria-label="Toggle direction"
            >
              {rtl ? 'فا' : 'EN'}
            </button>
          </div>
          <button
            className="md:hidden text-zinc-600 dark:text-zinc-300 hover:text-zinc-800 dark:hover:text-zinc-100 cursor-pointer rounded"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            ✕
          </button>
        </div>
        <nav className="p-4 space-y-2">
          <a
            href="#"
            className="block px-2 py-1 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 cursor-pointer"
          >
            Dashboard
          </a>
          <a
            href="#"
            className="block px-2 py-1 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 cursor-pointer"
          >
            Settings
          </a>
        </nav>
      </aside>
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen transition-all duration-200">
        {/* Header */}
        <header className="flex items-center justify-between p-4 bg-white dark:bg-zinc-800 shadow md:hidden">
          <button
            className="text-zinc-600 dark:text-zinc-300 hover:text-zinc-800 dark:hover:text-zinc-100 cursor-pointer rounded"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            ☰
          </button>
        </header>
        <main className="flex-1 p-4 bg-zinc-50 dark:bg-zinc-900 transition-colors duration-300">
          {children}
        </main>
      </div>
    </div>
  );
}
