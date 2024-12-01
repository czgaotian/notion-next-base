import BLOG from 'blog.config';
import { getSiteData } from '@/lib/notion/getSiteData';
import { getPostBlocks } from '@/lib/notion/getPostBlocks';
import { useLayout } from '@/lib/theme';
import { omit } from 'lodash';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import CommonHead from '@/components/CommonHead';

import type { GetStaticProps, GetStaticPaths } from 'next';
import type { PageMeta, PageIndexProps } from '@/types';
import type { FC } from 'react';
import type { ParsedUrlQuery } from 'querystring';
import { useSiteStore } from '@/providers/siteProvider';

export interface PageParams extends ParsedUrlQuery {
  page: string;
}

/**
 * 文章列表分页
 * @param {*} props
 * @returns
 */
const Page: FC<PageIndexProps> = (props) => {
  const { siteInfo } = props;
  const updateSiteDataState = useSiteStore(
    (state) => state.updateSiteDataState,
  );
  const updateRenderPosts = useSiteStore((state) => state.updateRenderPosts);

  updateSiteDataState(props);
  updateRenderPosts(props.posts, props.page, props.publishedPosts.length);

  // 根据页面路径加载不同Layout文件
  const PostList = useLayout();
  const pageMeta: PageMeta = {
    title: `${props?.page} | Page | ${siteInfo?.title}`,
    description: siteInfo?.description,
    image: siteInfo?.pageCover,
    slug: 'page/' + props.page,
    type: 'website',
  };

  return (
    <>
      <CommonHead pageMeta={pageMeta} />
      <PostList />
    </>
  );
};

export const getStaticPaths: GetStaticPaths<PageParams> = async () => {
  const from = 'page-paths';
  const { publishedPosts } = await getSiteData(from);
  const totalPages = Math.ceil(publishedPosts.length / BLOG.POSTS_PER_PAGE);
  return {
    // 生成每一页的路径
    paths: Array.from({ length: totalPages }, (_, i) => ({
      params: { page: String(i + 1) },
    })),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<
  PageIndexProps,
  PageParams
> = async ({ params, locale }) => {
  const { page } = params as PageParams;
  const pageNumber = parseInt(page, 10);
  const props = await getSiteData(`page-${pageNumber}`);

  // 处理分页
  const posts = props.publishedPosts.slice(
    BLOG.POSTS_PER_PAGE * (pageNumber - 1),
    BLOG.POSTS_PER_PAGE * pageNumber,
  );

  // 处理预览
  if (BLOG.POST_LIST_PREVIEW === 'true') {
    await Promise.all(
      posts.map(async (post) => {
        if (!post.password) {
          post.blockMap = await getPostBlocks(
            post.id,
            'slug',
            BLOG.POST_PREVIEW_LINES,
          );
        }
      }),
    );
  }

  omit(props, 'allPages');
  return {
    props: {
      ...props,
      posts,
      page: pageNumber,
      ...(await serverSideTranslations(locale as string)),
    },
    revalidate: BLOG.NEXT_REVALIDATE_SECOND,
  };
};

export default Page;
