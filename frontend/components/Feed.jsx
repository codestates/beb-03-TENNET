import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import CreatePost from './CreatePost';
import Post from './Post';

const style = {
  wrapper: `flex-1 max-w-2xl mx-4`,
};

export default function Feed({ isSignIn, nickname, url }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // console.log(posts);

  useEffect(() => {
    const interval = setInterval(async () => {
      await getAllPosts();
    }, 2000);
    getAllPosts();
    return () => clearInterval(interval);
  }, [isSignIn, getAllPosts]);

  useEffect(() => {
    if (posts && posts.length > 0) {
      toast('게시글이 새로고침 되었습니다!', {
        icon: '🔁',
        style: {
          borderRadius: '10px',
          background: '#252526',
          color: '#fffcf9',
        },
      });
    }
  }, [posts.length]);

  const getAllPosts = async () => {
    try {
      const res = await fetch(
        'https://jsonplaceholder.typicode.com/photos'
      ).then((res) => res.json());

      const postsData = res.slice(0, 20).map((it) => {
        return {
          index: it.id,
          posterName: it.title[0],
          posterUrl: it.url,
          content: it.title,
          comment: it.title.split('').reverse().join(''),
          commentCount: 1,
          like: Math.floor(Math.random() * 100),
          postTime: new Date().getTime(),
        };
      });
      setPosts(postsData);

      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const getCommentsOnPost = async (index, oldPost) => {
    try {
      return comments;
    } catch (error) {
      console.error(error);
    }
  };

  const savePost = async (text) => {
    try {
    } catch (error) {
      console.error(error);
    }
    // setPosts();
  };

  const saveComment = async (text, index, count) => {
    try {
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={style.wrapper}>
      <Toaster position='bottom-left' reverseOrder={false} />
      <div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div>
            <CreatePost
              // savePost={savePost}
              // getAllPosts={getAllPosts}
              nickname={nickname}
              url={url}
            />
            {posts?.map((it, idx) => (
              <Post
                key={idx}
                {...it}
                nickname={nickname}
                url={url}
                // post={post.account}
                // viewDetail={getCommentsOnPost}
                // createComment={saveComment}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
