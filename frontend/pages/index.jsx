import { useState } from 'react';
import Seo from '../components/Seo';
import Header from '../components/Header';
import SignUp from '../components/SignUp';
import Feed from '../components/Feed';
import RightSidebar from '../components/RightSidebar';
import Sidebar from '../components/Sidebar';

const style = {
  wrapper: `bg-[#f4f4f4] min-h-screen duration-[0.5s]`,
  homeWrapper: `flex`,
  center: `flex-1`,
  main: `flex-1 flex justify-center`,
  signupContainer: `flex items-center justify-center w-screen h-[70vh]`,
};

export default function Home() {
  const [isSignIn, setIsSignIn] = useState(false);
  const [nickname, setNickname] = useState('');
  const [url, setUrl] = useState('');
  const [account, setAccount] = useState('');
  // const [users, setUsers] = useState([]);
  // console.log(isSignIn);

  return (
    <div className={style.wrapper}>
      <Seo title={'Home'} />
      <Header nickname={nickname} url={url} account={account} />

      {isSignIn ? (
        <div className={style.homeWrapper}>
          <Sidebar nickname={nickname} url={url} />
          <div className={style.main}>
            <Feed isSignIn={isSignIn} nickname={nickname} url={url} />
          </div>
          <RightSidebar />
        </div>
      ) : (
        <div className={style.signupContainer}>
          <SignUp
            isSignIn={isSignIn}
            setIsSignIn={setIsSignIn}
            nickname={nickname}
            setNickname={setNickname}
            url={url}
            setUrl={setUrl}
            setAccount={setAccount}
          />
        </div>
      )}
    </div>
  );
}
