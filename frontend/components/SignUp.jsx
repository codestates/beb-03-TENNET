import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import logoImage from '../public/assets/logoicon.png';

const style = {
  wrapper: `flex flex-col p-4 justify-center items-center h-full w-full bg-[#252526] w-min h-min rounded-2xl`,
  title: `text-[#afb3b8] font-semibold text-lg`,
  form: `flex flex-col items-center`,
  fieldContainer: `my-4 `,
  inputTitle: `flex items-center text-[#afb3b8] font-semibold mb-2 ml-3`,
  randomProfileImage: 'px-2',
  inputContainer: `flex items-center w-[20rem] bg-[#3a3b3d] rounded-full`,
  inputField: `bg-transparent flex-1 m-2 outline-none text-white px-1 w-4`,
  randomUrl: `h-full bg-[#2d2d2d] hover:bg-[#252626] text-white px-2 py-1 mx-1 hover:px-3 rounded-full cursor-pointer duration-[0.2s] ease-in-out`,
  submitButton: `bg-[#3a3b3d] text-white font-semibold px-4 py-2 hover:px-6 rounded-full cursor-pointer duration-[0.2s] ease-in-out`,
};

export default function SignUp({
  setRegistered,
  nickname,
  setNickname,
  url,
  setUrl,
}) {
  //- 닉네임 중복확인 구현 필요.

  const [account, setAccount] = useState('');
  const [randomProfileImageUrl, setRandomProfileImageUrl] = useState(
    'data:image/jpeg;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='
  );

  const generateRandomProfileImageUrl = () => {
    setRandomProfileImageUrl(
      `https://avatars.dicebear.com/api/pixel-art-neutral/${Math.floor(
        Math.random() * 100
      )}.svg`
    );
    setUrl(randomProfileImageUrl);
  };

  const createUser = async () => {
    let networkId = await window.klaytn.networkVersion;

    if (networkId == 1001) {
      const wallet = await window.klaytn.enable();
      setAccount(wallet[0]);
      setRegistered(true);
    } else {
      alert('바오밥 테스트넷으로 로그인 해주십시오');
    }
    // try {
    //   await fetch(`/api/createUser`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       userWalletAddress: account,
    //       nickname: nickname,
    //       profileImage: event.target.url.value,
    //     }),
    //   });
    // } catch (error) {
    //   console.error(error);
    // }
  };

  useEffect(() => {
    window.klaytn.on('accountsChanged', (account) => {
      setAccount(account[0]);
    });
  });

  return (
    <div className={style.wrapper}>
      <div className={style.logoContainer}>
        <Image src={logoImage} height={40} width={40} alt={'tenet logo'} />
      </div>
      <div className={style.title}>테넷을 이용하기 위해 가입해 주세요.</div>
      <form className={style.form}>
        <div className={style.fieldContainer}>
          <div className={style.inputTitle}>닉네임</div>
          <div className={style.inputContainer}>
            <input
              value={nickname}
              onChange={(event) => setNickname(event.target.value)}
              required
              className={style.inputField}
            />
          </div>
        </div>
        <div className={style.fieldContainer}>
          <div className={style.inputTitle}>
            프로필 이미지 URL
            <div className={style.randomProfileImage}>
              <Image
                src={randomProfileImageUrl}
                height={30}
                width={30}
                alt={'random image'}
              />
            </div>
          </div>
          <div className={style.inputContainer}>
            <input
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              required
              className={style.inputField}
            />
            <div
              className={style.randomUrl}
              onClick={() => {
                generateRandomProfileImageUrl();
              }}
            >
              랜덤 생성
            </div>
          </div>
        </div>
        <button
          className={style.submitButton}
          type='button'
          onClick={createUser}
        >
          가입하기
        </button>
      </form>
    </div>
  );
}
