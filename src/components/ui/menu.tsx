import * as React from 'react';

interface MenuProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: 'left' | 'right';
}

export function Menu({ trigger, children, align = 'right' }: MenuProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>

      {isOpen && <div className="fixed inset-0 z-30" onClick={() => setIsOpen(false)} />}
      <div className="relative">
        {isOpen && (
          <div
            className={`
              absolute ${align === 'right' ? 'right-0' : 'left-0'} top-full mt-1
              w-56 rounded-md border border-zinc-200 dark:border-zinc-800
              bg-white dark:bg-zinc-900 shadow-lg
              z-40
            `}
          >
            <div className="p-2">{children}</div>
          </div>
        )}
      </div>
    </div>
  );
}
