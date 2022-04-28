import Image from 'next/image';
import Link from 'next/link';
import tenetLogo from '../../public/assets/tenet-logo.png';
import klaytnLogo from '../../public/assets/klaytn-klay-logo.png';
import { AiOutlineSearch, AiFillHome } from 'react-icons/ai';
import { BsDisplay } from 'react-icons/bs';
import { RiGroup2Line } from 'react-icons/ri';
import { MdPostAdd } from 'react-icons/md';

const style = {
  wrapper: `flex items-center justify-center gap-x-36 h-[4rem] px-[2rem] py-[0.2rem] top-0 bg-white drop-shadow-sm z-20`,
  headerLeftContainer: `flex space-x-6`,
  tenetLogo: `flex items-center object-contain cursor-pointer`,
  searchContainer: `flex items-center bg-white max-w-[30rem] rounded-full py-2 px-2 text-[#0d0c22] drop-shadow-md`,
  searchInput: `border-none px-[0.6rem] bg-transparent outline-none w-[18rem] text-[#0d0c22] placeholder:text-[#b0b3b8]`,
  headerCenterContainer: `flex items-center h-full`,
  headerCenterWrapper: `flex justify-center h-full py-2  mr-40`,
  centerNavIconContainer: `flex items-center px-[1.8rem] cursor-pointer duration-[0.5s]  hover:bg-[#555657] rounded-[10px]`,
  centerNavIcon: `text-2xl text-[#666]`,
  headerRightContainer: `flex h-min gap-x-4`,
  headerRightButton: `flex justify-center items-center focus-visible:ring ring-green-300 text-white font-semibold text-center rounded-md outline-none transition duration-100 px-5 py-2`,
  userInfoContainer: `bg-[#31e3bd] hover:bg-[#438791] active:bg-[#3b4f4f]`,
  userNickname: `font-bold text-white text-center`,
  userImage: `rounded-lg object-cover`,
  balanceContainer: `bg-[#ec55bc] hover:bg-[#f081ac] active:bg-[#c41785] text-white whitespace-nowrap`,
  balanceIcon: `object-cover`,
  balanceText: `text-white text-center font-bold`,
};

export const Nav = ({ nickname, image, account }) => {
  return (
    <div className={style.wrapper}>
      <div className={style.headerLeftContainer}>
        <Link href='/'>
          <Image
            className={style.tenetLogo}
            src={tenetLogo}
            alt='tenet logo'
            height={20}
            width={140}
          />
        </Link>
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
          <Link href='/'>
            <div className={style.centerNavIconContainer}>
              <AiFillHome className={style.centerNavIcon} />
            </div>
          </Link>
          <Link href='/'>
            <div className={style.centerNavIconContainer}>
              <BsDisplay className={style.centerNavIcon} />
            </div>
          </Link>
          <Link href='/'>
            <div className={style.centerNavIconContainer}>
              <RiGroup2Line className={style.centerNavIcon} />
            </div>
          </Link>
          <Link href='/createpost'>
            <div className={style.centerNavIconContainer}>
              <MdPostAdd className={style.centerNavIcon} />
            </div>
          </Link>
        </div>
      </div>
      {nickname && image && account ? (
        <div className={style.headerRightContainer}>
          <div
            className={`${style.userInfoContainer} ${style.headerRightButton}`}
          >
            <Image
              className={style.userImage}
              src={
                image ||
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
            <div className={style.balanceText}> Klay</div>
          </div>
        </div>
      ) : (
        <div className={style.headerRightContainer}>
          <div
            className={`${style.userInfoContainer} ${style.headerRightButton}`}
          >
            <div className={style.userNickname}>SignIn</div>
          </div>
          <div
            className={`${style.balanceContainer} ${style.headerRightButton}`}
          >
            <div className={style.balanceText}>SignUp</div>
          </div>
        </div>
      )}
    </div>
  );
};
