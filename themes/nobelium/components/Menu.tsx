import Collapse from 'components/Collapse';
import Link from 'next/link';
import { useCallback, useRef, useState } from 'react';
import classnames from '@/utils/classnames';
import useToggleClickOutSide from '@/utils/hooks/useToggleClickOutSide';

import type { FC, RefObject } from 'react';
import type { Nav } from '@/types/notion';

export interface MenuProps {
  menuList: Nav[];
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  className?: string;
  clickOutSideClose?: boolean;
  excludeRef?: RefObject<HTMLDivElement>;
}

/**
 * 折叠菜单
 * @param {*} param0
 * @returns
 */
export const Menu: FC<MenuProps> = (props) => {
  const {
    menuList,
    isOpen,
    setIsOpen,
    className = '',
    excludeRef,
    clickOutSideClose = true,
  } = props;

  const menuRef = useRef<HTMLDivElement>(null);

  const refs = [menuRef];
  if (excludeRef) {
    refs.push(excludeRef);
  }

  useToggleClickOutSide(refs, () => {
    if (clickOutSideClose) {
      setIsOpen(false);
    }
  });

  return (
    <div
      ref={menuRef}
      className={classnames(
        'rounded border border-gray-100 bg-white drop-shadow transition-all duration-300 dark:border-gray-900 dark:bg-black',
        {
          block: isOpen,
          hidden: !isOpen,
        },
        className,
      )}
    >
      <MenuList menuList={menuList} isOpen={isOpen} />
    </div>
  );
};

const MenuList = ({
  menuList,
  isOpen,
}: {
  menuList: Nav[];
  isOpen: boolean;
}) => {
  return (
    <Collapse isOpen={isOpen}>
      {menuList.map((menu) => {
        if (menu.subMenus && menu.subMenus.length > 0) {
          return <SubMenuItem key={menu.id} menu={menu} />;
        } else {
          return <MenuItem key={menu.id} menu={menu} />;
        }
      })}
    </Collapse>
  );
};

const MenuItem = ({ menu }: { menu: Nav }) => {
  return (
    <Link
      href={menu.to}
      className="cursor flex items-center p-3 text-gray-800 transition-all  hover:bg-gray-200  dark:text-gray-200 dark:hover:bg-gray-800"
    >
      {menu.icon && <i className={menu.icon} />}
      {menu.title && <div className={menu.icon && 'ml-2'}>{menu.title}</div>}
    </Link>
  );
};

const SubMenuItem = ({ menu }: { menu: Nav }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => setIsOpen(!isOpen), [isOpen]);

  return (
    <>
      <div
        onClick={toggleOpen}
        className="flex cursor-pointer p-3 text-gray-800 transition-all hover:bg-gray-200/40 dark:text-gray-200 dark:hover:bg-gray-800/40"
      >
        {menu?.icon && <i className={menu.icon} />}
        {menu.title && <div className={menu.icon && 'ml-2'}>{menu.title}</div>}
        <div className="ml-auto flex items-center">
          <i
            className={`fas fa-chevron-down transition-all ${isOpen ? 'rotate-180' : ''}`}
          ></i>
        </div>
      </div>
      <div className="pl-4">
        {isOpen && menu.subMenus && (
          <MenuList menuList={menu.subMenus} isOpen={isOpen} />
        )}
      </div>
    </>
  );
};
