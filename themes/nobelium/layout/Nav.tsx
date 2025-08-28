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
  const [remainingWidth, setRemainingWidth] = useState(0);
  const siteInfo = useSiteStore((state) => state.siteInfo);
  const AUTHOR = useConfigStore((state) => state.AUTHOR);

  useEffect(() => {
    const handler: IntersectionObserverCallback = ([entry]) => {
      setIsSticky(!entry.isIntersecting);
    };

    const observer = new window.IntersectionObserver(handler);
    const sentinel = sentinelRef.current;

    if (sentinel) observer.observe(sentinel);

    return () => {
      if (sentinel) observer.unobserve(sentinel);
    };
  }, []);

  useEffect(() => {
    const calculateRemaining = () => {
      if (navRef.current) {
        const navWidth = navRef.current.getBoundingClientRect().width;
        const childrenWidth = Array.from(navRef.current.children).reduce(
          (total, child) =>
            total + (child as HTMLElement).getBoundingClientRect().width,
          0,
        );
        setRemainingWidth(navWidth - childrenWidth);
      }
    };

    calculateRemaining();
    window.addEventListener('resize', calculateRemaining);

    return () => window.removeEventListener('resize', calculateRemaining);
  }, []);

  return (
    <>
      <div className="h-4 md:h-12" ref={sentinelRef} />
      <div
        ref={navRef}
        className={classnames(
          'ease-[cubic-bezier(0.4, 0, 0, 1)] sticky top-0 z-10 flex h-16 w-full flex-row items-center justify-center font-medium transition-all duration-500 md:mb-12',
          {
            'border-b border-gray-400 border-opacity-50 backdrop-blur-sm dark:border-gray-600':
              isSticky,
            'border-transparent': !isSticky,
          },
        )}
      >
        <Link
          className={classnames(
            'mr-0 flex items-center rounded-full px-4 py-2 text-gray-800 transition-all hover:bg-gray-200/40 dark:text-gray-200 dark:hover:bg-gray-800/40 ',
          )}
          style={{ marginRight: isSticky ? remainingWidth : 0 }}
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
          <p className="ml-2 overflow-hidden text-gray-800  dark:text-gray-200">
            {siteInfo?.title}
          </p>
        </Link>
        <NavBar />
      </div>
    </>
  );
};

export default Nav;
