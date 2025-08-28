import { siteConfig } from '@/types/config';

export default siteConfig({
  AUTHOR: 'Gaotian',
  KEYWORDS: 'Notion, Site, Blog',
  SINCE: 2022,
  LICENSE: 'CC BY-NC-SA 4.0',
  LICENSE_URL: 'https://creativecommons.org/licenses/by-nc-sa/4.0/deed.en',

  EMAIL: 'czgaotian1@gmail.com',
  GITHUB_URL: 'https://github.com/czgaotian',
  POST_URL_PREFIX: 'article',
  IMG_LAZY_LOAD_PLACEHOLDER:
    'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==',
  POSTS_PER_PAGE: 10,
  POST_LIST_STYLE: 'page',
  POSTS_SORT_BY: 'notion',
  POST_LIST_PREVIEW: false,
  POST_PREVIEW_LINES: 10,
  ENABLE_RSS: true,
  CAN_NOT_COPY: false,
  THEME_SWITCH: false,
  DEBUG: false,
  CUSTOM_RIGHT_CLICK_CONTEXT_MENU: false,

  POST_SHARE_BAR_ENABLE: false,
  POSTS_SHARE_SERVICES:
    'link,wechat,qq,weibo,email,facebook,twitter,telegram,line,reddit,whatsapp,linkedin',

  NEXT_REVALIDATE_SECOND: 60,

  // Facebook
  FACEBOOK_APP_ID: '',
  FACEBOOK_PAGE: '',
  FACEBOOK_PAGE_TITLE: '',

  // vercel speed insights
  VERCEL_SPEED_INSIGHTS_ENABLE: true,

  // vercel analytics
  VERCEL_ANALYTICS_ENABLE: true,

  // google analytics
  GOOGLE_ANALYTICS_ENABLE: false,
  GOOGLE_ANALYTICS_ID: '',

  // google adsense
  GOOGLE_ADSENSE_ENABLE: false,
  GOOGLE_ADSENSE_ID: '',
  GOOGLE_ADSENSE_TEST: 'off',
  GOOGLE_ADSENSE_SLOT_IN_ARTICLE: '',
  GOOGLE_ADSENSE_SLOT_FLOW: '',
  GOOGLE_ADSENSE_SLOT_NATIVE: '',
  GOOGLE_ADSENSE_SLOT_AUTO: '',

  // SEO
  SEO_GOOGLE_SITE_VERIFICATION: '',
  SEO_BAIDU_SITE_VERIFICATION: '',

  // https://giscus.app
  GISCUS_ENABLE: true,
  GISCUS_REPO: 'czgaotian/notion-next-base',
  GISCUS_REPO_ID: 'R_kgDOKBm-Cw',
  // GISCUS_CATEGORY: '',
  // GISCUS_CATEGORY_ID: '',
  GISCUS_MAPPING: 'pathname',
  // GISCUS_REACTIONS_ENABLED: '0',
  // GISCUS_EMIT_METADATA: '0',
  // GISCUS_INPUT_POSITION: 'top',
  GISCUS_LOADING: 'lazy',
});
