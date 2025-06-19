
import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light' | 'system';

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  actualTheme: 'dark' | 'light';
  toggleTheme: () => void;
};

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null,
  actualTheme: 'light',
  toggleTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'aluminet-theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => {
      if (typeof window !== 'undefined') {
        return (localStorage.getItem(storageKey) as Theme) || defaultTheme;
      }
      return defaultTheme;
    }
  );

  const [actualTheme, setActualTheme] = useState<'dark' | 'light'>('light');

  // Preload theme assets
  useEffect(() => {
    const preloadLink = document.createElement('link');
    preloadLink.rel = 'preload';
    preloadLink.as = 'style';
    preloadLink.href = '/theme-assets.css';
    document.head.appendChild(preloadLink);

    return () => {
      document.head.removeChild(preloadLink);
    };
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove previous theme classes
    root.classList.remove('light', 'dark');

    let resolvedTheme: 'dark' | 'light';

    if (theme === 'system') {
      resolvedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    } else {
      resolvedTheme = theme;
    }

    // Apply will-change for smooth transitions
    root.style.willChange = 'color, background-color';
    
    // Add the new theme class
    root.classList.add(resolvedTheme);
    setActualTheme(resolvedTheme);

    // Screen reader announcement for theme change
    const announcement = document.createElement('div');
    announcement.className = 'theme-announcement';
    announcement.setAttribute('aria-live', 'polite');
    announcement.textContent = `Theme changed to ${resolvedTheme} mode`;
    document.body.appendChild(announcement);

    // Clean up will-change and announcement after transition
    const cleanup = () => {
      root.style.willChange = '';
      if (document.body.contains(announcement)) {
        document.body.removeChild(announcement);
      }
    };

    const timer = setTimeout(cleanup, 500);

    // Listen for system theme changes when using system theme
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e: MediaQueryListEvent) => {
        const newTheme = e.matches ? 'dark' : 'light';
        root.classList.remove('light', 'dark');
        root.style.willChange = 'color, background-color';
        root.classList.add(newTheme);
        setActualTheme(newTheme);
        
        // Announce system theme change
        const systemAnnouncement = document.createElement('div');
        systemAnnouncement.className = 'theme-announcement';
        systemAnnouncement.setAttribute('aria-live', 'polite');
        systemAnnouncement.textContent = `System theme changed to ${newTheme} mode`;
        document.body.appendChild(systemAnnouncement);
        
        setTimeout(() => {
          root.style.willChange = '';
          if (document.body.contains(systemAnnouncement)) {
            document.body.removeChild(systemAnnouncement);
          }
        }, 500);
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => {
        mediaQuery.removeEventListener('change', handleChange);
        clearTimeout(timer);
      };
    }

    return () => clearTimeout(timer);
  }, [theme]);

  const handleSetTheme = (newTheme: Theme) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey, newTheme);
    }
    setTheme(newTheme);
  };

  const toggleTheme = () => {
    if (actualTheme === 'light') {
      handleSetTheme('dark');
    } else {
      handleSetTheme('light');
    }
  };

  const value = {
    theme,
    actualTheme,
    setTheme: handleSetTheme,
    toggleTheme,
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider');

  return context;
};
