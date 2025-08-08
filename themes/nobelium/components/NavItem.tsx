import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useRef } from 'react';
import { useRouter } from 'next/router';

import type { FC } from 'react';
import type { Nav } from '@/types/notion';
import { Menu } from './Menu';

export interface NavItemProps {
  nav: Nav;
  className?: string;
}

export const NavItem: FC<NavItemProps> = ({ nav, className = '' }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const { t } = useTranslation('nav');

  const toggleShow = () => {
    setIsOpen(!isOpen);
  };

  if (!nav || !nav.show) {
    return null;
  }

  const hasSubMenu = nav.subMenus && nav?.subMenus.length > 0;

  const handleClick = () => {
    if (hasSubMenu) {
      toggleShow();
    } else {
      router.push(nav.to);
    }
  };

  return nav.show ? (
    <div className={`${className} relative`}>
      <div
        className="cursor-pointer rounded-full px-4 py-2 text-gray-800 transition-all hover:bg-gray-200/40 dark:text-gray-200 dark:hover:bg-gray-800/40"
        ref={menuRef}
        onClick={handleClick}
      >
        {hasSubMenu ? (
          <div
            className={`flex items-center text-black dark:text-gray-50`}
            onClick={toggleShow}
          >
            {nav?.icon && <i className={nav?.icon} />}
            {nav.title && (
              <span className={`font-medium ${nav?.icon && 'ml-2'}`}>
                {nav?.title}
              </span>
            )}
            <i
              className={`fas fa-chevron-down ml-2 transition-all ${isOpen ? ' rotate-180' : ''}`}
            ></i>
          </div>
        ) : (
          <div className={`block text-black dark:text-gray-50`}>
            {nav?.icon && <i className={nav?.icon} />}
            {nav.title && (
              <span className={`font-medium ${nav.icon && 'ml-2'}`}>
                {t(nav.title)}
              </span>
            )}
          </div>
        )}
      </div>
      {hasSubMenu && (
        <Menu
          className="absolute left-0 top-10 w-60"
          menuList={nav.subMenus as Nav[]}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          excludeRef={menuRef}
        />
      )}
    </div>
  ) : null;
};
