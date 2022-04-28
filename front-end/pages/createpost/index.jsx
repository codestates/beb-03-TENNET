import dynamic from 'next/dynamic';
import { MainLayout } from 'components';
import { useState } from 'react';

const style = {
  createPostWrapper: 'flex flex-col items-center justify-center mt-20',
  titleArea: 'w-1/2 border border-[lightgrey] rounded-md mb-4',
};

export const WysiwygEditor = dynamic(
  () => import('../../components/WysiwygEditor'),
  {
    ssr: false,
  }
);

export default function CreatePost() {
  const [postData, setPostData] = useState({});
  console.log(postData);

  return (
    <MainLayout>
      <WysiwygEditor setPostData={setPostData} />
    </MainLayout>
  );
}
