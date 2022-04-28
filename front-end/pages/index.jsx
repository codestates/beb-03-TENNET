import { useState, useEffect } from 'react';
import { allPosts } from 'contentlayer/generated';
import { NextSeo } from 'next-seo';
import { pick } from 'utils';
import { PostList, MainLayout, SignIn } from 'components';

const style = {
  signInContainer: `flex items-center justify-center w-screen h-[70vh]`,
};

const Posts = ({ posts }) => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [nickname, setNickname] = useState('');
  const [image, setImage] = useState('');
  const [account, setAccount] = useState('');
  const [postLists, setPostLists] = useState(posts);

  // const [users, setUsers] = useState([]);
  console.log(account);
  console.log(isSignIn);
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

  // useEffect(() => {
  //   const interval = setInterval(async () => {
  //     await getAllPosts();
  //   }, 2000);
  //   getAllPosts();
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <MainLayout
      nickname={nickname}
      image={image}
      account={account}
      setIsSignIn={setIsSignIn}
    >
      <NextSeo
        title='Posts'
        description='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      />
      {isSignIn && account ? (
        <PostList posts={postLists} />
      ) : (
        <div className={style.signInContainer}>
          <SignIn
            isSignIn={isSignIn}
            setIsSignIn={setIsSignIn}
            nickname={nickname}
            setNickname={setNickname}
            image={image}
            setImage={setImage}
            account={account}
            setAccount={setAccount}
          />
        </div>
      )}
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
