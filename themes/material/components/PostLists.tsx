import PostCard from './PostCard';
import Stack from '@mui/material/Stack';
import { useConfigStore } from '@/providers/configProvider';
import { useSiteStore } from '@/providers/siteProvider';
import { useRouter } from 'next/router';
import { useShallow } from 'zustand/react/shallow';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import { getPagePrefix } from '@/utils';

export default function PostList() {
  const { posts, page, postCount } = useSiteStore(
    useShallow((state) => ({
      posts: state.posts,
      page: state.page,
      postCount: state.postCount,
    })),
  );
  const { POSTS_PER_PAGE, POST_LIST_STYLE } = useConfigStore(
    useShallow((state) => ({
      POSTS_PER_PAGE: state.POSTS_PER_PAGE,
      POST_LIST_STYLE: state.POST_LIST_STYLE,
    })),
  );
  const router = useRouter();

  const totalPage = Math.ceil(postCount / POSTS_PER_PAGE);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    console.log(value, router);
    const pagePrefix = getPagePrefix(router.asPath);
    router.push({
      pathname: `${pagePrefix}/page/${value}`,
    });
  };

  return (
    <Stack spacing={2}>
      <Box id="posts-wrapper">
        <Stack spacing={2}>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </Stack>
      </Box>
      {POST_LIST_STYLE === 'page' && (
        <Box display="flex" justifyContent="flex-end" width="100%">
          <Pagination
            page={page}
            count={totalPage}
            onChange={handlePageChange}
          />
        </Box>
      )}
    </Stack>
  );
}
