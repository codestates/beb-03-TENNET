import { useRef, useEffect } from 'react';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import { Editor } from '@toast-ui/react-editor';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import imageCompression from 'browser-image-compression';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APPID,
  measurements: process.env.FIREBASE_MEASUREMENTID,
};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

const style = {
  button_default:
    'py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700',
};

export default function WysiwygEditor() {
  const editorRef = useRef(null);

  const toolbarItems = [
    ['heading', 'bold', 'italic', 'strike'],
    ['hr', 'quote'],
    ['ul', 'ol', 'task', 'indent', 'outdent'],
    ['table', 'image', 'link'],
    ['code', 'codeblock'],
    ['scrollSync'],
  ];

  useEffect(() => {
    const editorInstance = editorRef.current.getInstance();
    editorInstance.removeHook('addImageBlobHook');
    editorInstance.addHook('addImageBlobHook', addImage);
  }, []);

  // 에디터에 이미지 추가
  const addImage = async (blob, dropImage) => {
    const img = await compressImg(blob); //이미지 압축
    const url = await uploadImage(img); //업로드된 이미지 서버 url
    dropImage(url, 'alt_text'); //에디터에 이미지 추가
  };
  // 이미지 업로드
  const uploadImage = async (blob) => {
    try {
      //firebase Storage Create Reference 파일 경로 / 파일 명 . 확장자
      const storageRef = ref(
        storage,
        `post_images/${generateName() + '.' + blob.type.substring(6, 10)}`
      );
      //firebase upload
      const snapshot = await uploadBytes(storageRef, blob);
      return await getDownloadURL(storageRef);
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  // 이미지 압축
  const compressImg = async (blob) => {
    try {
      const options = {
        maxSize: 1,
        initialQuality: 0.55, //initial 0.7
      };
      return await imageCompression(blob, options);
    } catch (e) {
      console.log(e);
    }
  };

  // 랜덤 파일명 생성
  const generateName = () => {
    const ranTxt = Math.random().toString(36).substring(2, 10);
    const date = new Date();
    const randomName =
      ranTxt +
      '_' +
      date.getFullYear() +
      '' +
      date.getMonth() +
      1 +
      '' +
      date.getDate() +
      '' +
      date.getHours() +
      '' +
      date.getMinutes() +
      '' +
      date.getMinutes() +
      '' +
      date.getSeconds();
    return randomName;
  };

  const getContent = () => {
    const editorIns = editorRef.current.getInstance();
    const contentHtml = editorIns.getHTML();
    const contentMarkdown = editorIns.getMarkdown();

    console.log(contentHtml);
    console.log(contentMarkdown);
  };

  const validationCheck = () => {
    const title = titleRef.current.value.trim();
    const content = getMarkDown();
    if (title !== '' || content !== '') {
      //- DB에 저장
    } else {
      console.error();
    }
  };

  return (
    <>
      {/* <textarea
        type='title'
        placeholder='제목을 입력하세요.'
        className='w-1/2'
      ></textarea> */}
      <Editor
        ref={editorRef}
        initialValue='<b>내용을 입력하세요. 오른쪽은 작성 결과를 보여줍니다.</b>'
        initialEditType='markdown' // wysiwyg & markdown
        hideModeSwitch={true}
        height='600px'
        theme={''} // '' & 'dark'
        usageStatistics={false}
        toolbarItems={toolbarItems}
        previewStyle='vertical'
        // placeholder={'내용을 입력하세요'}
        plugins={[colorSyntax]}
      />
      <button
        type='button'
        className={style.button_default}
        onClick={getContent}
      >
        작성하기
      </button>
    </>
  );
}
