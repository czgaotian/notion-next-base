import { getSiteData } from '@/lib/notion/getSiteData';
import BLOG from 'blog.config';
import { useLayout } from '@/lib/theme';
import { useTranslation } from 'next-i18next';
import { omit } from 'lodash';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useSiteStore } from '@/providers/siteProvider';
import CommonHead from '@/components/CommonHead';

import type { FC } from 'react';
import type { PageMeta, TagIndexProps } from '@/types';
import type { GetStaticProps } from 'next';


/**
 * 标签首页
 * @param {*} props
 * @returns
 */
const TagIndex: FC<TagIndexProps> = (props) => {
  const { siteInfo } = props;
  const { t } = useTranslation('common');
  const updateSiteDataState = useSiteStore(
    (state) => state.updateSiteDataState,
  );

  updateSiteDataState(props);

  // 根据页面路径加载不同Layout文件
  const Layout = useLayout();

  const pageMeta: PageMeta = {
    title: `${t('tags')} | ${siteInfo?.title}`,
    description: siteInfo?.description,
    image: siteInfo?.pageCover,
    slug: 'tag',
    type: 'website',
  };

  return (
    <>
      <CommonHead pageMeta={pageMeta} />
      <Layout />
    </>
  );
};

export const getStaticProps: GetStaticProps<TagIndexProps> = async ({
  locale,
}) => {
  const props = await getSiteData('tag-index-props');
  return {
    props: {
      ...omit(props, 'allPages'),
      ...(await serverSideTranslations(locale as string)),
    },
    revalidate: BLOG.NEXT_REVALIDATE_SECOND,
  };
};

export default TagIndex;
