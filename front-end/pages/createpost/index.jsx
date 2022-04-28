import dynamic from 'next/dynamic';
import { MainLayout } from 'components';

const style = {
  wysiwygEditorWrapper:
    'flex flex-col items-center justify-center space-y-6 mt-16 ',
};

export const WysiwygEditor = dynamic(
  () => import('../../components/WysiwygEditor'),
  {
    ssr: false,
  }
);

export default function CreatePost() {
  return (
    <MainLayout>
      <div className={style.wysiwygEditorWrapper}>
        <WysiwygEditor />
      </div>
    </MainLayout>
  );
}
