import Image from 'next/image';
import logoImage from '../public/assets/logo.png';

export default function Header() {
  return (
    <div>
      <Image src={logoImage} width={105} height={30} />
      Header
    </div>
  );
}
