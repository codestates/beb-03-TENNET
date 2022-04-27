import { allPosts } from 'contentlayer/generated';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { CodePen } from 'mdx-embed';
import { NextSeo } from 'next-seo';

import { PostArticle, MainLayout } from 'components';

const mdxComponents = {
  CodePen,
};

const Post = ({ resource }) => {
  const MDXContent = useMDXComponent(resource.body.code);

  return (
    <MainLayout>
      <NextSeo title={resource.title} description={resource.seoDescription} />
      <PostArticle title={resource.title} category={resource.category}>
        <MDXContent components={mdxComponents} />
      </PostArticle>
    </MainLayout>
  );
};

export default Post;

export async function getStaticPaths() {
  return {
    paths: allPosts.map((resource) => ({
      params: { slug: resource.slug },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const resource = allPosts.find((resource) => resource.slug === params.slug);

  return { props: { resource } };
}
