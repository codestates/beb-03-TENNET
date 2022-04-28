import { useState, useEffect } from 'react';
import { allPosts } from 'contentlayer/generated';
import { NextSeo } from 'next-seo';

import { PostList, MainLayout } from 'components';
import { pick } from 'utils';

const Posts = ({ posts }) => {
  const [postLists, setPostLists] = useState(posts);

  const getAllPosts = () => {
    setPostLists([
      {
        slug: '1',
        title: 'title',
        description: '3',
        image: '',
        publishedAt: '5',
        readingTime: '6',
        autuor: { nickname: 'ccc', type: 'autuor', image: '' },
        category: '8',
      },
      ...posts,
    ]);
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      await getAllPosts();
    }, 2000);
    getAllPosts();
    return () => clearInterval(interval);
  }, []);

  return (
    <MainLayout>
      <NextSeo
        title='Posts'
        description='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      />
      <PostList posts={postLists} />
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
