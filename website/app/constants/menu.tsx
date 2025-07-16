import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUser,
  HiOutlineUsers
} from "react-icons/hi2";

export const sidebarMenu = [
  {
    to: "/home",
    icon: HiOutlineHome,
    text: "داشبورد",
  },
  {
    to: "/products",
    icon: HiOutlineHomeModern,
    text: "محصولات",
    submenu: [
      {
        title: "همه ی محصولات",
        to: "/products/allproducts",
      },
      {
        title: "محصولات برتر",
        to: "/products/top",
        submenu: [
          {
            title: "محصولات با کیفیت",
            to: "/products/quality",
          },
        ],
      },
    ],
  },
  {
    to: "/account",
    icon: HiOutlineUser,
    text: "کاربر ها",
    submenu: [
      {
        title: "افزودن کاربر جدید",
        to: "/user/adduser",
      },
    ],
  },
    {
    to: "/customers",
    icon: HiOutlineUsers,
    text: "مشتری ها",
    submenu: [
      {
        title: "همه ی مشتری ها",
        to: "/customers/allcustomers",
      },
    ],
  },
  {
    to: "/blogs",
    icon: HiOutlineCalendarDays,
    text: "مقالات",
    submenu: [
      {
        title: "افزودن مقاله جدید",
        to: "/blogs/newblog",
      },
    ],
  },
  {
    to: "/settings",
    icon: HiOutlineCog6Tooth,
    text: "تنظیمات",
  },
];
