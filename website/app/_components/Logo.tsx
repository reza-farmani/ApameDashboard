import Image from 'next/image';
import logo from "../../public/logo.png"


function Logo() {
  return (
    <div className="text-center">
      <Image src={logo} alt="Logo" width={160} height={80} />
    </div>
  );
}

export default Logo;
