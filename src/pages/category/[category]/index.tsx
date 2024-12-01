import { getSiteData } from '@/lib/notion/getSiteData';
import React from 'react';
import BLOG from 'blog.config';
import { useLayout } from '@/lib/theme';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useSiteStore } from '@/providers/siteProvider';
import CommonHead from '@/components/CommonHead';
import { omit } from 'lodash';

import type { GetStaticProps, GetStaticPaths } from 'next';
import type { PageMeta, CategoryDetailProps } from '@/types';
import type { FC } from 'react';
import type { ParsedUrlQuery } from 'querystring';

export interface CategoryDetailParams extends ParsedUrlQuery {
  category: string;
}

/**
 * 分类页
 * @param {*} props
 * @returns
 */
const CategoryDetail: FC<CategoryDetailProps> = (props) => {
  const { siteInfo } = props;
  const { t } = useTranslation('common');
  const updateSiteDataState = useSiteStore(
    (state) => state.updateSiteDataState,
  );
  const updateRenderPosts = useSiteStore((state) => state.updateRenderPosts);
  const updateCategory = useSiteStore((state) => state.updateCategory);

  updateSiteDataState(props);
  updateRenderPosts(props.posts, 1, props.resultCount);
  updateCategory(props.category);

  // 根据页面路径加载不同Layout文件
  const Layout = useLayout();

  const pageMeta: PageMeta = {
    title: `${props.category} | ${t('category')} | ${siteInfo?.title || ''}`,
    description: siteInfo?.description,
    slug: 'category/' + props.category,
    image: siteInfo?.pageCover,
    type: 'website',
  };

  return (
    <>
      <CommonHead pageMeta={pageMeta} />
      <Layout />
    </>
  );
};

export const getStaticProps: GetStaticProps<
  CategoryDetailProps,
  CategoryDetailParams
> = async ({ params, locale }) => {
  const { category } = params as CategoryDetailParams;
  const props = await getSiteData('category-detail-props');

  const filteredPosts = props.publishedPosts.filter((page) =>
    page.category?.includes(category),
  );

  const posts =
    BLOG.POST_LIST_STYLE === 'page'
      ? filteredPosts.slice(0, BLOG.POSTS_PER_PAGE)
      : filteredPosts;

  return {
    props: {
      ...omit(props, 'allPages'),
      category,
      posts,
      resultCount: filteredPosts.length,
      ...(await serverSideTranslations(locale as string)),
    },
    revalidate: BLOG.NEXT_REVALIDATE_SECOND,
  };
};

export const getStaticPaths: GetStaticPaths<
  CategoryDetailParams
> = async () => {
  const from = 'category-paths';
  const { categoryOptions } = await getSiteData(from);
  return {
    paths: categoryOptions.map((category) => ({
      params: { category: category.name },
    })),
    fallback: true,
  };
};

export default CategoryDetail;
