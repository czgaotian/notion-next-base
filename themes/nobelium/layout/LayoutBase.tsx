import { Transition } from '@headlessui/react';
import CommonHead from '@/components/CommonHead';
import Nav from './components/Nav/Nav';
import Footer from './components/Footer';
import JumpToTopButton from './components/JumpToTopButton';
import { useNobeliumStore } from '@themes/nobelium/providers';
import { useStyleStore } from '@/providers/styleProvider';

import { useEffect, type FC, type ReactNode } from 'react';
import type { ThemeBaseProps } from '@/types';

export interface LayoutBaseProps extends ThemeBaseProps {
  topSlot?: ReactNode;
  children: ReactNode;
}

/**
 * @returns {JSX.Element}
 * @constructor
 */
const LayoutBase: FC<LayoutBaseProps> = (props) => {
  const { children, topSlot, pageMeta } = props;

  const { updateState } = useNobeliumStore((state) => state);

  useEffect(() => {
    updateState({
      siteInfo: props.siteInfo,
      latestPosts: props.latestPosts,
      navList: props.navList,
      tags: props.tagOptions,
      category: props.categoryOptions,
    });
  }, [props]);

  const isLoading = useStyleStore((state) => state.isLoading);

  return (
    <div
      id="theme-nobelium"
      className="nobelium flex min-h-screen flex-col flex-nowrap items-stretch justify-start bg-white dark:bg-black dark:text-gray-300"
    >
      {/* SEO相关 */}
      <CommonHead pageMeta={pageMeta} />

      {/* 顶部导航栏 */}
      <Nav />

      {/* 主区 */}
      <main className="w-full max-w-2xl flex-grow self-center px-4 transition-all">
        <Transition
          show={!isLoading}
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
    </div>
  );
};

export default LayoutBase;
