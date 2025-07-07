import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUser,
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
        title: "محصولات پر فروش",
        to: "/products/mostsales",
      },
      {
        title: "زیرمنو بیشتر",
        to: "/products/nested",
        submenu: [
          {
            title: "محصولات پر فروش ۲",
            to: "/products/nested/nested",
          },
        ],
      },
    ],
  },
  {
    to: "/account",
    icon: HiOutlineUser,
    text: "حساب کاربری",
    submenu: [
      {
        title: "افزودن کاربر جدید",
        to: "/account/adduser",
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
