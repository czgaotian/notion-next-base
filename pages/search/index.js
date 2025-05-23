import { getGlobalData } from '@/lib/notion/getNotionData';
import { useRouter } from 'next/router';
import BLOG from '@/blog.config';
import { getLayoutByTheme } from '@/themes/theme';
import { useTranslation } from 'next-i18next';

/**
 * 搜索路由
 * @param {*} props
 * @returns
 */
const Search = (props) => {
  const { posts, siteInfo } = props;
  const { t } = useTranslation('nav');

  // 根据页面路径加载不同Layout文件
  const Layout = getLayoutByTheme(useRouter());

  const router = useRouter();
  const keyword = getSearchKey(router);

  let filteredPosts;
  // 静态过滤
  if (keyword) {
    filteredPosts = posts.filter((post) => {
      const tagContent = post?.tags ? post?.tags.join(' ') : '';
      const categoryContent = post.category ? post.category.join(' ') : '';
      const searchContent =
        post.title + post.summary + tagContent + categoryContent;
      return searchContent.toLowerCase().includes(keyword.toLowerCase());
    });
  } else {
    filteredPosts = [];
  }

  const meta = {
    title: `${keyword || ''}${keyword ? ' | ' : ''}${t('search')} | ${siteInfo?.title}`,
    description: siteInfo?.description,
    image: siteInfo?.pageCover,
    slug: 'search',
    type: 'website',
  };

  props = { ...props, meta, posts: filteredPosts };

  return <Layout {...props} />;
};

/**
 * 浏览器前端搜索
 */
export async function getStaticProps() {
  const props = await getGlobalData('search-props');
  const { allPages } = props;
  props.posts = allPages?.filter(
    (page) => page.type === 'Post' && page.status === 'Published',
  );
  return {
    props,
    revalidate: parseInt(BLOG.NEXT_REVALIDATE_SECOND),
  };
}

function getSearchKey(router) {
  if (router.query && router.query.s) {
    return router.query.s;
  }
  return null;
}

export default Search;
