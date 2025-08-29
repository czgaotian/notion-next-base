import LayoutBase from '@/themes/nobelium/layout/LayoutBase';
import { useSiteStore } from 'providers/siteProvider';
import BlogPost from '@/themes/nobelium/components/BlogPost';

import type { FC } from 'react';
import type { Archive } from '@/types';

/**
 * 归档
 * @param {*} props
 * @returns
 */
const Archive = () => {
  const archive = useSiteStore((state) => state.archive);

  return (
    <LayoutBase>
      <div className="min-h-screen w-full">
        {Object.keys(archive).map((archiveTitle) => (
          <BlogArchiveItem
            key={archiveTitle}
            archiveTitle={archiveTitle}
            archivePosts={archive}
          />
        ))}
      </div>
    </LayoutBase>
  );
};

const BlogArchiveItem: FC<{
  archiveTitle: keyof Archive;
  archivePosts: Archive;
}> = ({ archiveTitle, archivePosts }) => {
  return (
    <div key={archiveTitle} className="mb-6 last:mb-0">
      <div id={archiveTitle} className="mb-4 text-lg dark:text-gray-300">
        {archiveTitle}
      </div>
      <div>
        {archivePosts[archiveTitle].map((post) => (
          <BlogPost key={post.id} post={post} isShowSummary={false} />
        ))}
      </div>
    </div>
  );
};

export default Archive;
