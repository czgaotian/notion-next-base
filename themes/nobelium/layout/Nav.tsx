import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import CONFIG from '@/themes/nobelium/theme.config';
import { SvgIcon } from '../components/SvgIcon';
import LazyImage from '@/components/LazyImage';
import NavBar from '../components/NavBar';
import { useSiteStore } from '@/providers/siteProvider';
import { useConfigStore } from '@/providers/configProvider';
import classnames from '@/utils/classnames';

import type { FC } from 'react';

const Nav: FC = () => {
  const navRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);
  const siteInfo = useSiteStore((state) => state.siteInfo);
  const AUTHOR = useConfigStore((state) => state.AUTHOR);

  const handler: IntersectionObserverCallback = ([entry]) => {
    setIsSticky(!entry.isIntersecting);
  };

  useEffect(() => {
    const observer = new window.IntersectionObserver(handler);
    const sentinel = sentinelRef.current;
    if (sentinel) observer.observe(sentinel);
    return () => {
      if (sentinel) observer.unobserve(sentinel);
    };
  }, []);

  return (
    <>
      <div className="h-4 md:h-12" ref={sentinelRef} />
      <div
        ref={navRef}
        className={classnames(
          'ease-[cubic-bezier(0.4, 0, 0, 1)] sticky top-0 z-10 flex h-16 min-w-min flex-row items-center transition-all duration-500 md:mb-12',
          {
            'justify-between border-b border-gray-400 border-opacity-50 backdrop-blur-sm dark:border-gray-600':
              isSticky,
            'border-transparent': !isSticky,
          },
        )}
      >
        <Link
          className={classnames(
            'mr-0 flex items-center rounded-full px-3 py-2 text-gray-800 transition-all hover:bg-gray-200/40 dark:text-gray-200 dark:hover:bg-gray-800/40 ',
          )}
          href="/"
          aria-label={siteInfo?.title}
        >
          <div className="h-6 w-6">
            {CONFIG.NAV_NOTION_ICON ? (
              <LazyImage
                src={siteInfo?.icon}
                width={24}
                height={24}
                alt={AUTHOR}
              />
            ) : (
              <SvgIcon />
            )}
          </div>
          <p className="ml-2 overflow-hidden font-medium text-gray-800  dark:text-gray-200">
            {siteInfo?.title}
          </p>
        </Link>
        <NavBar />
      </div>
    </>
  );
};

export default Nav;
