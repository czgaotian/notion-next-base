import fs from 'fs';
import { Feed } from 'feed';
import BLOG from 'blog.config';
import ReactDOMServer from 'react-dom/server';
import { getPostBlocks } from './notion/getPostBlocks';
import NotionPage from '@/components/NotionPage';

import type { Page } from '@/types';

export async function generateRss(posts: Page[]) {
  const year = new Date().getFullYear();
  const feed = new Feed({
    id: BLOG.LINK,
    title: BLOG.TITLE,
    description: BLOG.DESCRIPTION,
    link: `${BLOG.LINK}/${BLOG.SUB_PATH}`,
    language: BLOG.LANG,
    favicon: `${BLOG.LINK}/favicon.png`,
    copyright: `All rights reserved ${year}, ${BLOG.AUTHOR}`,
    author: {
      name: BLOG.AUTHOR,
      email: BLOG.CONTACT_EMAIL,
      link: BLOG.LINK,
    },
  });
  for (const post of posts) {
    feed.addItem({
      title: post.title,
      link: `${BLOG.LINK}/${post.slug}`,
      description: post.summary,
      // content: await createFeedContent(post),
      content: '',
      date: new Date(post.date),
    });
  }

  try {
    fs.mkdirSync('./public/rss', { recursive: true });
    fs.writeFileSync('./public/rss/feed.xml', feed.rss2());
    fs.writeFileSync('./public/rss/atom.xml', feed.atom1());
    fs.writeFileSync('./public/rss/feed.json', feed.json1());
  } catch (error) {
    // 在vercel运行环境是只读的，这里会报错；
    // 但在vercel编译阶段、或VPS等其他平台这行代码会成功执行
    // RSS被高频词访问将大量消耗服务端资源，故作为静态文件
    console.log(error);
  }
}

/**
 * 生成RSS内容
 * @param {*} post
 * @returns
 */
const createFeedContent = async (post: Page) => {
  // 加密的文章内容只返回摘要
  if (post.password && post.password !== '') {
    return post.summary;
  }
  const blockMap = await getPostBlocks(post.id, 'rss-content');
  if (blockMap) {
    post.blockMap = blockMap;
    const content = ReactDOMServer.renderToString(<NotionPage post={post} />);
    const regexExp =
      /<div class="notion-collection-row"><div class="notion-collection-row-body"><div class="notion-collection-row-property"><div class="notion-collection-column-title"><svg.*?class="notion-collection-column-title-icon">.*?<\/svg><div class="notion-collection-column-title-body">.*?<\/div><\/div><div class="notion-collection-row-value">.*?<\/div><\/div><\/div><\/div>/g;
    return content.replace(regexExp, '');
  }
};
