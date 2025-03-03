import { getSiteData } from '@/utils/notion/getSiteData';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import CommonHead from '@/components/CommonHead';
import { useSiteStore } from 'providers/siteProvider';
import getSearchResult from '@/utils/notion/getSearchResult';
import { useEffect } from 'react';
import ThemeLayout from '@/components/ThemeLayout';
import { useConfigStore } from '@/providers/configProvider';

import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import type { PageMeta, SearchDetailProps } from '@/types';
import type { ParsedUrlQuery } from 'querystring';

export interface SearchDetailParams extends ParsedUrlQuery {
  keyword: string;
}

const SearchDetail = (
  props: InferGetStaticPropsType<typeof getStaticProps>,
) => {
  const { siteData, config, posts, keyword, resultCount } = props;
  const { siteInfo } = siteData || {};
  const { t } = useTranslation('nav');
  const updateSiteDataState = useSiteStore(
    (state) => state.updateSiteDataState,
  );
  const updateKeyword = useSiteStore((state) => state.updateKeyword);
  const updateRenderPosts = useSiteStore((state) => state.updateRenderPosts);
  const updateConfig = useConfigStore((state) => state.setConfig);

  useEffect(() => updateSiteDataState(siteData), [siteData]);
  useEffect(() => updateConfig(config), [config]);
  useEffect(() => updateKeyword(keyword), [keyword]);
  useEffect(
    () => updateRenderPosts(posts, 1, resultCount),
    [posts, resultCount],
  );

  const pageMeta: PageMeta = {
    title: `${keyword || ''}${keyword ? ' | ' : ''}${t('search')} | ${siteInfo?.title}`,
    description: siteInfo?.title,
    image: siteInfo?.pageCover,
    slug: 'search/' + (keyword || ''),
    type: 'website',
  };

  return (
    <>
      <CommonHead pageMeta={pageMeta} />
      <ThemeLayout />
    </>
  );
};

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

/**
 * 服务端搜索
 * @param {*} param0
 * @returns
 */
export const getStaticProps = (async ({ params, locale }) => {
  const props = await getSiteData('search-detail-page');
  const { keyword } = params as SearchDetailParams;

  const filteredPosts = await getSearchResult(props.publishedPosts, keyword);
  const posts =
    props.config.POST_LIST_STYLE === 'page'
      ? filteredPosts.slice(0, props.config.POSTS_PER_PAGE)
      : filteredPosts;

  return {
    props: {
      config: props.config,
      siteData: {
        notice: props.notice,
        siteInfo: props.siteInfo,
        tagOptions: props.tagOptions,
        categoryOptions: props.categoryOptions,
        navList: props.navList,
        latestPosts: props.latestPosts,
        totalPostsCount: props.publishedPosts.length,
      },
      resultCount: filteredPosts.length,
      keyword,
      posts,
      ...(await serverSideTranslations(locale as string)),
    },
    revalidate: props.config.NEXT_REVALIDATE_SECOND,
  };
}) satisfies GetStaticProps<SearchDetailProps, SearchDetailParams>;

export default SearchDetail;
