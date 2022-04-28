import { PostCard } from 'components';

export const PostList = ({ posts }) => {
  return (
    <section className='body-font text-gray-600'>
      <div className='container mx-auto px-5 py-24'>
        <div className='-m-4 flex flex-wrap'>
          {posts.map(
            ({
              title,
              description,
              slug,
              image,
              category,
              publishedAt,
              readingTime,
            }) => (
              <PostCard
                key={slug}
                title={title}
                description={description}
                slug={slug}
                image={
                  image || `https://source.unsplash.com/featured/?${category}`
                }
                category={category}
                dateTime={publishedAt}
                date={publishedAt}
                readingTime={readingTime.text}
              />
            )
          )}
        </div>
      </div>
    </section>
  );
};
