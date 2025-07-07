import Logo from "./Logo";
import SideBar from "./SideBar";

function SideNav() {
  return (
    <aside className="bg-white p-8 px-6  row-span-full flex flex-col gap-8">
      <Logo />
       <SideBar />
    </aside>
  );
}

export default SideNav;