import { useState } from 'react';
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
  const [registered, setRegistered] = useState(false);
  const [nickname, setNickname] = useState('');
  const [url, setUrl] = useState('');
  // const [users, setUsers] = useState([]);

  console.log(registered);

  return (
    <div className={style.wrapper}>
      <Header />
      {registered ? (
        <div className={style.homeWrapper}>
          Home입니다.
          <Sidebar />
          <div className={style.main}>
            <Feed />
          </div>
          <RightSidebar />
        </div>
      ) : (
        <div className={style.signupContainer}>
          <SignUp
            setRegistered={setRegistered}
            nickname={nickname}
            setNickname={setNickname}
            url={url}
            setUrl={setUrl}
          />
        </div>
      )}
    </div>
  );
}
