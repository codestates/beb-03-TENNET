import Image from 'next/image';

const style = {
  wrapper: `py-[25px] px-[10px] w-[24rem] `,
  sidebarRow: `flex w-full mb-[20px] hover:bg-[#2a2b2c] transition-all duration-300 ease-in-out rounded-lg p-[5px] gap-[10px] cursor-pointer`,
  profileImage: `rounded-full object-cover`,
  sidebarItem: `text-white font-semibold flex items-center  flex-col justify-center text-sm `,
};

export default function Sidebar({ nickname, url }) {
  return (
    <div className={style.wrapper}>
      {nickname && url ? (
        <div className={style.sidebarRow}>
          <Image
            className={style.profileImage}
            src={url}
            height={30}
            width={30}
            alt='profile image'
          />
          <div className={style.sidebarItem}>{nickname}</div>
        </div>
      ) : (
        <div>?</div>
      )}
    </div>
  );
}
