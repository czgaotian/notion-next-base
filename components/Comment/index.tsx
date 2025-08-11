import dynamic from 'next/dynamic';
import { isBrowser } from '@/utils';
import { useRouter } from 'next/router';
import { useSiteStore } from '@/providers/siteProvider';
import { useConfigStore } from '@/providers/configProvider';
import { useShallow } from 'zustand/react/shallow';

const Giscus = dynamic(() => import('./Giscus'), { ssr: false });

/**
 * 评论组件
 * @param {*} param0
 * @returns
 */
const Comment = ({ className = '' }: { className?: string }) => {
  const router = useRouter();
  const post = useSiteStore((state) => state.post);
  const { GISCUS_ENABLE } = useConfigStore(
    useShallow((state) => ({
      GISCUS_ENABLE: state.GISCUS_ENABLE,
    })),
  );

  if (
    isBrowser &&
    ('giscus' in router.query || router.query.target === 'comment')
  ) {
    setTimeout(() => {
      document
        ?.getElementById('comment')
        ?.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }, 1000);
  }

  console.log(GISCUS_ENABLE);

  return post ? (
    <div
      id="comment"
      className={`comment mt-5 text-gray-800 dark:text-gray-200 ${className}`}
    >
      {GISCUS_ENABLE && <Giscus />}
    </div>
  ) : null;
};

export default Comment;
