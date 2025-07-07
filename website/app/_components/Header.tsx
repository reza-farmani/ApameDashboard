import { HiOutlineLogout, HiOutlineMail, HiOutlineMoon } from 'react-icons/hi';

function Header() {
  return (
    <header className="flex items-center justify-end h-16 bg-white px-6 border-b border-gray-200">
      <div className="flex items-center gap-6">
        <button className="group relative p-1 transition-all duration-200 cursor-pointer">
          <HiOutlineMail className="w-5 h-5 text-blue-800 group-hover:text-blue-900 group-hover:scale-110" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center group-hover:bg-red-600">
            3
          </span>
        </button>

        <button className="p-1 transition-all duration-200 hover:text-blue-900 cursor-pointer">
          <HiOutlineMoon className="w-5 h-5 text-blue-800 hover:scale-110" />
        </button>

        <button className="flex items-center gap-1 p-1 transition-all duration-200 group cursor-pointer">
          <HiOutlineLogout className="w-5 h-5 text-blue-800 group-hover:text-blue-900 group-hover:scale-110" />
          <span className="text-sm text-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            خروج
          </span>
        </button>
      </div>
    </header>
  );
}

export default Header;