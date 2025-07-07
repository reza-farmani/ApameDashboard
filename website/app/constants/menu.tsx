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
        slug: "/products/mostsales",
      },
      {
        submenu: [
          {
            title: "- 2 محصولات پر فروش",
            slug: "/products/mostsales2",
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
        slug: "/account/adduser",
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
        slug: "/blogs/newblog",
      },
    ],
  },
  {
    to: "/settings",
    icon: HiOutlineCog6Tooth,
    text: "تنظیمات",
  },
];
