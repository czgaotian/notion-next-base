import { useEffect, useState } from 'react';

const tailwindMediaBreakpoints = {
  sm: '(min-width: 640px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 1024px)',
  xl: '(min-width: 1280px)',
  '2xl': '(min-width: 1536px)',
};

const useTailWindMediaQuery = (
  breakpoint: keyof typeof tailwindMediaBreakpoints,
) => {
  const [matches, setMatches] = useState(false);
  const query = tailwindMediaBreakpoints[breakpoint];

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
};

export default useTailWindMediaQuery;
