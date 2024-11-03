import React, { useState } from 'react';
import BLOG from '@/blog.config';
import LayoutBase from '../layout/LayoutBase';
import { deepClone } from '@/lib/utils';
import BlogListPage from '../components/BlogListPage';
import BlogListScroll from '../components/BlogListScroll';
import BlogListBar from '../components/BlogListBar';

import type { PageInfo } from '@/lib/notion/types';
import type { PostListProps } from '@/pages/types';
import type { FC, ReactNode } from 'react';

/**
 * 博客列表
 * @param {*} props
 * @returns
 */
const PostList: FC<
  PostListProps & {
    topSlot: ReactNode;
  }
> = (props) => {
  const { posts, postCount, page, topSlot } = props;

  // 在列表中进行实时过滤
  const [filterKey, setFilterKey] = useState('');
  let filteredBlogPosts: PageInfo[] = [];
  if (filterKey && posts) {
    filteredBlogPosts = posts.filter((post) => {
      const tagContent = post?.tags ? post?.tags.join(' ') : '';
      const searchContent = post.title + post.summary + tagContent;
      return searchContent.toLowerCase().includes(filterKey.toLowerCase());
    });
  } else {
    filteredBlogPosts = deepClone(posts);
  }
  return (
    <LayoutBase
      {...props}
      topSlot={<BlogListBar {...props} setFilterKey={setFilterKey} />}
    >
      {topSlot}
      {BLOG.POST_LIST_STYLE === 'page' ? (
        <BlogListPage
          postCount={postCount}
          page={page}
          posts={filteredBlogPosts}
        />
      ) : (
        <BlogListScroll
          postCount={postCount}
          page={page}
          posts={filteredBlogPosts}
        />
      )}
    </LayoutBase>
  );
};

export default PostList;
