import { useEffect, useRef } from 'react';
import Link from 'next/link';
import BLOG from 'blog.config';
import CONFIG from '../../theme.config';
import { SvgIcon } from '../SvgIcon';
import LazyImage from '@/components/LazyImage';
import { useNobeliumStore } from '../../providers';
import NavBar from '../NavBar';
import styles from './Nav.module.css';

import type { FC } from 'react';

const Nav: FC = () => {
  const navRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const { siteInfo } = useNobeliumStore((state) => state);

  const handler: IntersectionObserverCallback = ([entry]) => {
    if (navRef && navRef.current) {
      if (!entry.isIntersecting && entry !== undefined) {
        navRef.current?.classList.add(styles.stickyNavFull);
      } else {
        navRef.current?.classList.remove(styles.stickyNavFull);
      }
    } else {
      navRef.current?.classList.add('remove-sticky');
    }
  };

  useEffect(() => {
    const observer = new window.IntersectionObserver(handler);
    const sentinelRefCurrent = sentinelRef.current;
    if (sentinelRefCurrent) observer.observe(sentinelRefCurrent);
    return () => {
      if (sentinelRefCurrent) observer.unobserve(sentinelRefCurrent);
    };
  }, [sentinelRef]);

  return (
    <>
      <div className="h-4 md:h-12" ref={sentinelRef} />
      <div
        className={`${styles.stickyNav} m-auto mb-2 flex h-6 w-full max-w-3xl flex-row items-center justify-between bg-opacity-60 px-4 py-8 md:mb-12`}
        ref={navRef}
      >
        <Link
          className="flex items-center rounded-full px-3 py-2 hover:bg-black hover:bg-opacity-10 dark:hover:bg-white dark:hover:bg-opacity-10"
          href="/"
          aria-label={BLOG.TITLE}
        >
          <div className="h-6 w-6">
            {/* <SvgIcon/> */}
            {CONFIG.NAV_NOTION_ICON ? (
              <LazyImage
                src={siteInfo?.icon}
                width={24}
                height={24}
                alt={BLOG.AUTHOR}
              />
            ) : (
              <SvgIcon />
            )}
          </div>
          <p
            className={`${styles.headerName} ml-2 overflow-hidden font-medium text-gray-800 dark:text-gray-300`}
          >
            {siteInfo?.title}
          </p>
        </Link>
        <NavBar />
      </div>
    </>
  );
};

export default Nav;
