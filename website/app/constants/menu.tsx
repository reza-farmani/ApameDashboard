import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUser,
  HiOutlineUsers,
  HiPercentBadge,
  HiCalendar,
} from "react-icons/hi2";

export const sidebarMenu = [
  {
    to: "/",
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
    to: "/off",
    icon: HiPercentBadge,
    text: "تخفیف ها",
    submenu: [
      {
        title: "افزودن تخفیف جدید",
        to: "/off/newoff",
      },
    ],
  },
  {
    to: "/calendar",
    icon: HiCalendar,
    text: "تقویم",
    submenu: [
      {
        title: "همه ی ایونت ها",
        to: "/calendar/allevents",
      },
    ],
  },
  {
    to: "/settings",
    icon: HiOutlineCog6Tooth,
    text: "تنظیمات",
  },
];
