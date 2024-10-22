import React, { useRef, createContext } from 'react';
import { Transition } from '@headlessui/react';
import { useGlobal } from '@/lib/global';
import CommonHead from '@/components/CommonHead';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import JumpToTopButton from '../components/JumpToTopButton';
import Live2D from '@/components/Live2D';
import AlgoliaSearchModal from '@/components/AlgoliaSearchModal';

import type { FC, ReactNode } from 'react';
import type { ThemeProps } from '@/themes/types';

// 主题全局状态
const ThemeGlobalNobelium = createContext({});

export interface LayoutBaseProps extends ThemeProps {
  topSlot?: ReactNode;
}

/**
 * @returns {JSX.Element}
 * @constructor
 */
const LayoutBase: FC<LayoutBaseProps> = (props) => {
  console.log(props);
  const { children, topSlot, meta } = props;

  const { onLoading } = useGlobal();
  const searchModal = useRef(null);

  return (
    <ThemeGlobalNobelium.Provider value={{ searchModal }}>
      <div
        id="theme-nobelium"
        className="nobelium relative flex h-screen w-screen flex-col bg-white dark:bg-black dark:text-gray-300"
      >
        {/* SEO相关 */}
        <CommonHead meta={meta} />

        {/* 顶部导航栏 */}
        <Nav {...props} />

        {/* 主区 */}
        <main
          id="out-wrapper"
          className="relative max-w-2xl flex-grow px-4 transition-all"
        >
          <Transition
            show={!onLoading}
            appear={true}
            enter="transition ease-in-out duration-700 transform order-first"
            enterFrom="opacity-0 translate-y-16"
            enterTo="opacity-100"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 -translate-y-16"
            unmount={false}
          >
            {/* 顶部插槽 */}
            {topSlot}
            {children}
          </Transition>
        </main>

        {/* 页脚 */}
        <Footer />

        {/* 右下悬浮 */}
        <div className="fixed bottom-4 right-4">
          <JumpToTopButton />
        </div>

        {/* 左下悬浮 */}
        <div className="fixed -left-14 bottom-4 z-40 justify-end">
          <Live2D />
        </div>

        {/* 搜索框 */}
        <AlgoliaSearchModal cRef={searchModal} {...props} />
      </div>
    </ThemeGlobalNobelium.Provider>
  );
};

export default LayoutBase;
