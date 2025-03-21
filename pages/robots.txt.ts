import { isProduct } from '@/utils';
import { BASE_URL } from '@/constants';

import type { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const baseUrl = BASE_URL || req.headers.origin;
  if (req.method !== 'GET') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify({ error: 'method not allowed' }));
    res.end();

    return {
      props: {},
    };
  }

  // cache for up to one day
  res.setHeader('Cache-Control', 'public, max-age=86400, immutable');
  res.setHeader('Content-Type', 'text/plain');

  // only allow the site to be crawlable on the production deployment
  if (isProduct()) {
    res.write(`User-agent: *
Allow: /
Disallow: /api/get-tweet-ast/*
Disallow: /api/search-notion

Sitemap: ${baseUrl}/sitemap.xml
`);
  } else {
    res.write(`User-agent: *
Disallow: /

Sitemap: ${baseUrl}/sitemap.xml
`);
  }

  res.end();

  return {
    props: {},
  };
};

export default function noop() {
  return null;
}
