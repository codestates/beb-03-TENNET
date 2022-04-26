import Image from 'next/image';
import tenetLogo from '../public/assets/tenet-logo.png';
import klaytnLogo from '../public/assets/klaytn-klay-logo.png';
import { AiOutlineSearch, AiFillHome } from 'react-icons/ai';
import { BsDisplay } from 'react-icons/bs';
import { RiGroup2Line } from 'react-icons/ri';
import { SiFacebookgaming } from 'react-icons/si';

const style = {
  wrapper: `flex items-center w-full h-[4rem] justify-around px-[1rem] py-[0.2rem] sticky top-0 bg-white drop-shadow-sm z-20`,
  headerLeft: `flex justify-center space-x-6`,
  tenetLogo: `flex items-center`,
  searchContainer: `flex items-center bg-white max-w-[30rem] rounded-full py-2 px-2 text-[#0d0c22] drop-shadow-md`,
  searchInput: `border-none px-[0.6rem] bg-transparent outline-none w-[18rem] text-[#0d0c22] placeholder:text-[#b0b3b8]`,
  headerCenterContainer: `flex-1 flex items-center justify-center h-full`,
  headerCenterWrapper: `flex justify-center h-full py-2`,
  centerNavIconContainer: `flex items-center px-[1.8rem] cursor-pointer duration-[0.5s]  hover:bg-[#555657] rounded-[10px]`,
  centerNavIcon: `text-2xl text-[#666]`,
  headerRight: `flex h-min`,
  headerRightButton: `flex items-center h-[3rem] px-3 mx-2 rounded-[0.4rem] cursor-pointer`,
  userInfo: `bg-[#31e3bd] hover:bg-[#438791]`,
  userNickname: `font-bold ml-3 text-white`,
  userImage: `rounded-lg object-cover`,
  balanceContainer: `bg-[#ec55bc] hover:bg-[#f081ac] text-white whitespace-nowrap`,
  balanceIcon: `object-covers`,
  balanceText: `text-white font-bold ml-3`,
};

export default function Header({ nickname, url, account }) {
  return (
    <div className={style.wrapper}>
      <div className={style.headerLeft}>
        <Image
          className={style.tenetLogo}
          src={tenetLogo}
          alt='tenet logo'
          height={20}
          width={140}
        />
        <div className={style.searchContainer}>
          <AiOutlineSearch className={`w-50`} />
          <input
            type='text'
            className={style.searchInput}
            placeholder='Search Tenet'
          />
        </div>
      </div>
      <div className={style.headerCenterContainer}>
        <div className={style.headerCenterWrapper}>
          <div className={style.centerNavIconContainer}>
            <AiFillHome className={style.centerNavIcon} />
          </div>
          <div className={style.centerNavIconContainer}>
            <BsDisplay className={style.centerNavIcon} />
          </div>
          <div className={style.centerNavIconContainer}>
            <RiGroup2Line className={style.centerNavIcon} />
          </div>
          <div className={style.centerNavIconContainer}>
            <SiFacebookgaming className={style.centerNavIcon} />
          </div>
        </div>
      </div>
      {account && (
        <div className={style.headerRight}>
          <div className={`${style.userInfo} ${style.headerRightButton}`}>
            <Image
              className={style.userImage}
              src={
                url ||
                'data:image/jpeg;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='
              }
              height={20}
              width={20}
              alt='user image'
            />
            <div className={style.userNickname}>{nickname}</div>
          </div>
          <div
            className={`${style.balanceContainer} ${style.headerRightButton}`}
          >
            <Image
              className={style.balanceIcon}
              src={klaytnLogo}
              height={20}
              width={20}
              alt='klaytn logo'
            />
            <div className={style.balanceText}>'계좌잔액' Klay</div>
          </div>
        </div>
      )}
    </div>
  );
}
