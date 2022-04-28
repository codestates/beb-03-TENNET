import { Nav } from 'components';

export const MainLayout = ({
  nickname,
  setNickname,
  image,
  setImage,
  account,
  setAccount,
  setIsSignIn,
  children,
}) => {
  return (
    <>
      <Nav
        nickname={nickname}
        image={image}
        account={account}
        setIsSignIn={setIsSignIn}
      />
      {children}
    </>
  );
};
