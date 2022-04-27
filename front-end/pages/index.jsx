import { allPosts } from 'contentlayer/generated';
import { NextSeo } from 'next-seo';

import { PostList, MainLayout } from 'components';
import { pick } from 'utils';

const Posts = ({ posts }) => {
  return (
    <MainLayout>
      <NextSeo
        title='Posts'
        description='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      />
      <PostList posts={posts} />
    </MainLayout>
  );
};

export default Posts;

export function getStaticProps() {
  const posts = allPosts
    .map((resource) =>
      pick(resource, [
        'slug',
        'title',
        'description',
        'publishedAt',
        'readingTime',
        'author',
        'category',
        'image',
      ])
    )
    .sort(
      (a, b) =>
        Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt))
    );

  return { props: { posts } };
}

// import { MainLayout } from 'components';

// export default function Home() {
//   return <MainLayout />;
// }
